import { xywh2xyxy } from "./xtwh2xyxy";


/**
 * non_max_suppression - computes the non maximum suppression
 * @results: an array with the raw bounding boxes
 * @conf_thresh: threshold determining the minimum acceptable score
 * @iou_thresh: threshold determining the minimum iou acceptable score
 * Returns:
 * @selected_detections: an array containing the selected detections
 */
export function non_max_suppression(results, conf_thresh=.5, iou_thresh=.2) {
    const selected_detections = [];

    for (const res of results) {

        if (res[4] < conf_thresh) continue;

        var box = res.slice(0, 4);
        const cls_detections = res.slice(5);
        var cls = cls_detections.reduce(
            (imax, x, i, arr) => x > arr[imax] ? i : imax, 0);
        const score = res[cls + 5];

        let object = xywh2xyxy(box);
        let addBox = true;

        // checking for overlap with previously selected boxes
        for (const selected_xywh of selected_detections) {
            let selectedBox = xywh2xyxy(selected_xywh);

            // computing the intersection and union of both boxes
            let intersectionXmin = Math.max(object[0],
                                            selectedBox[0]);
            let intersectionYmin = Math.max(object[1],
                                            selectedBox[1]);
            let intersectionXmax = Math.min(object[2],
                                            selectedBox[2]);
            let intersectionYmax = Math.min(object[3],
                                            selectedBox[3]);
            let intersectionWidth = Math.max(0,
                                             intersectionXmax - intersectionXmin);
            let intersectionHeight = Math.max(0,
                                              intersectionYmax - intersectionYmin);
            let intersectionArea = intersectionWidth * intersectionHeight;
            let boxArea = (object[2] - object[0]) * (object[3] - object[1]);
            let selectedBoxArea = (selectedBox[2] - selectedBox[0]) * (selectedBox[3] - selectedBox[1]);
            let unionArea = boxArea + selectedBoxArea - intersectionArea;

            // computing IoU and check if the boxes oberlap
            let iou = intersectionArea / unionArea;
            if (iou >= iou_thresh) {
                addBox = false;
                break;
            }
        }
        // adding the box to the selected boxes
        if (addBox)
        {
            const row = box.concat(score, cls);
            selected_detections.push(row);
        }
    }
    return selected_detections;
}