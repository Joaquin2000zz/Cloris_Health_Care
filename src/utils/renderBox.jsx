import { xywh2xyxy } from './xtwh2xyxy';


const labelmap = {
    0: {name: 'Healty apple', color:'green'},
    1: {name: 'Unhealthy apple', color:'red'}
}

/**
 * renderBoxes - draws the bounding boxes for each detection above a fixed threshold
 * @canvasRef: canvas object
 * @threshold: float number representing the threshold
 * @boxes_data: array of arrays containing [x, y, w, h] of each detection
 * @scores_data: array containing floats representing the score of each detection
 * @classes_data: array containing integers representing the class of each detection
 */
export const renderBoxes = (canvasRef, threshold, boxes_data,
                            scores_data, classes_data) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = '18px sans-serif';
    ctx.font = font;
    ctx.textBaseline = 'top';

    for (const [i, score] of scores_data.entries()) {
        if (score <= threshold) continue;
        const cls = labelmap[classes_data[i]]['name'];
        let [x1, y1, x2, y2] = xywh2xyxy(boxes_data[i])

        // drawing the bounding box
        ctx.strokeStyle = labelmap[classes_data[i]]['color'];
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        // drawing the label background
        ctx.fillStyle = labelmap[classes_data[i]]['color'];
        const text = cls + ' - ' + (score * 100).toFixed(2) + '%';
        const textWidth = ctx.measureText(text).width;
        const textHeight = parseInt(font, 10);
        ctx.fillRect(x1 - 1, y1 - textHeight + 2, textWidth - 2, textHeight - 2);
        // drawing labels
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, x1 - 1, y1 - textHeight + 2);
    }
};