/**
 * shortenedCol - getter function
 * @arrayOfArray: array of arrays containing info of each detection 
 * @indexList: index of items to take 
 * @returns: items taken from each sub array in specifyed position
 */
export function shortenedCol (arrayOfArray, indexList) {
    return arrayOfArray.map(function (array) {
        return indexList.map(function (idx) {
            return array[idx];
        });
    });
}
