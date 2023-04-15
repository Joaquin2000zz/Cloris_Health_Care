/**
 * Class to handle webcam
 */
export class Webcam {
    /**
     * open - Open the webcam and steams it through video tag
     * @videoRef: video tag reference
     * @onLoaded: callback function to be called when the webcam is open
     */
    open = (videoRef, onLoaded) => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                        facingMode: 'environment'
                    }
                })
                .then((stream) => {
                    window.localStream = stream;
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        onLoaded();
                    };
                });
        } else alert('Error. Cannot open the Webcam.');
    };

    /**
     * close - close opened webcam
     * @videoRef: video tag reference
     */
    close = (videoRef) => {
        if (videoRef.current.srcObject) {
            videoRef.current.srcObject = null;
            window.localStream.getTracks().forEach((track) => {
                track.stop();
            });
        } else alert('Error. Open the webcam first.');
    };
}
