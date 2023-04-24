/**
 * xywh2xyxy - convert boxes from [x, y, width, height] to [x1, y1, x2, y2]
 * @X: an array with an individual box containing the x and y position
 *     along the width and height of the bbox
 * Returns: 
 * @Y: an array containing the [x1, y1, x2, y2]
 */
export const xywh2xyxy = (X) =>
(
    [X[0] - X[2] / 2,
    X[1] - X[3] / 2,
    X[0] + X[2] / 2,
    X[1] + X[3] / 2]
);