import { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'; // set backend to webgl
import { Button, Loader } from './index';
import { non_max_suppression, renderBoxes, shortenedCol, Webcam } from './model_functions'
import styles from '../style';


export const Model = () => {

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
            if (!videoRef.current) return;
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

    console.warn = () => { };

    const [isShown, setIsShown] = useState(false);
    const handleClick = () => {
        setIsShown(current => !current);
        if (isShown) {
            webcam.close(videoRef);
            return;
        };
    };
    useEffect(() => {
        if (!isShown) return;
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

                    setLoading({ loading: false, progress: 1 });
                    webcam.open(videoRef, () => detectFrame(yolov7));
                });
            });
    }, [isShown]);

    return (
        <section id='camera' className={`${styles.flexCenter} ${styles.marginY}
        ${styles.padding} flex-col bg-black-gradient-2
        rounded-[20px] box-shadow`}>
            <div className={`${styles.flexCenter} sm:ml-10 ml-0
            sm:mt-0 mt-10`}>
                <Button text={`${!isShown ? 'Use Model' : 'Hide Model'}`}
                onClick={handleClick}/>
            </div >
            {isShown && (<div className='Model'>
                {loading.loading && (
                    <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
                )}
                <div className='content'>
                    <video autoPlay playsInline muted ref={videoRef} id='frame'></video>
                    <canvas width={640} height={640} ref={canvasRef} />
                </div>
            </div>)}
        </section>
    )
}

export default Model;
