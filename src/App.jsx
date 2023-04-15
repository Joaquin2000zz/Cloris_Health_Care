import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'; // set backend to webgl
import Loader from './components/loader';
import { Webcam } from './utils/webcam';
import { renderBoxes } from './utils/renderBox';
import { non_max_suppression } from './utils/nonMaxSupression';
import './style/App.css';

/**
 * shortenedCol - getter function
 * @arrayOfArray: array of arrays containing info of each detection 
 * @indexList: index of items to take 
 * @returns: items taken
 */
function shortenedCol (arrayOfArray, indexList) {
    return arrayOfArray.map(function (array) {
        return indexList.map(function (idx) {
            return array[idx];
        });
    });
}

const App = () => {
    const [loading, setLoading] = useState({
        loading: true,
        progress: 0
    });
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const webcam = new Webcam();
    const modelName = "cloris";
    const threshold = .8;

    /**
     * detectFrame - performs detections in the current frame with the given model
     * @model: model which performs the detections 
     */
    const detectFrame = async (model) => {
        const model_dim = [640, 640];
        tf.engine().startScope();
        const input = tf.tidy(() => {
            const img = tf.image
                        .resizeBilinear(tf.browser.fromPixels(videoRef.current), model_dim) // resizes the phrame at the model's supported image size
                        .div(255.0) // normalizes the image's values
                        .transpose([2, 0, 1]) // the image is [w, h, c] but the model needs [c, w, h] tensors
                        .expandDims(0); // and of course, the image needs to be nested in a vector [1, c, w, h]
            return img;
        });

        await model.executeAsync(input).then((res) => {
            res = res.arraySync()[0];
            var detections = non_max_suppression(res);
            const boxes = shortenedCol(detections, [0, 1, 2, 3]);
            const scores = shortenedCol(detections, [4]);
            const classes = shortenedCol(detections, [5]);

            renderBoxes(canvasRef, threshold, boxes, scores, classes);
            tf.dispose(res)
        });

        requestAnimationFrame(() => detectFrame(model)); // get another frame
        tf.engine().endScope();
    };

    useEffect(() => {
        tf.loadGraphModel(`${window.location.origin}/${modelName}_web_model/model.json`,
        {
            onProgress: (fractions) => {
                setLoading({ loading: true, progress: fractions });
            }
        }).then(async (yolov7) => {
            // warmup the model before using real data
            const dummyInput = tf.ones(yolov7.inputs[0].shape);
            await yolov7.executeAsync(dummyInput).then((warmupResult) => {
                tf.dispose(warmupResult);
                tf.dispose(dummyInput);

                setLoading({ loading: false, progress: 1});
                webcam.open(videoRef, () => detectFrame(yolov7));
            });
        });
    }, []);
    console.warn = () => {};

    return (
        <div className='App'>
            <h2> Cloris Health Care </h2>
            { loading.loading ? (
                <Loader>Loading model... { (loading.progress * 100).toFixed(2) }%</Loader>
            ) : (
                <p></p>
            )}
            <div className='content'>
                <video autoPlay playsInline muted ref={ videoRef } id='frame'></video>
                <canvas width={640} height={640} ref={canvasRef} />
            </div>
        </div>
    );
};

export default App;
