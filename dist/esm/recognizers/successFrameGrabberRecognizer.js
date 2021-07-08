import { Recognizer, RecognizerResult } from '../recognizer';
/**
 * Result object for SuccessFrameGrabberRecognizer.
 */
export class SuccessFrameGrabberRecognizerResult extends RecognizerResult {
    constructor(nativeResult, slaveRecognizerResult) {
        super(nativeResult.resultState);
        this.successFrame = nativeResult.successFrame;
        this.slaveRecognizerResult = slaveRecognizerResult;
    }
}
/**
 * SuccessFrameGrabberRecognizer can wrap any other recognizer and obtain camera
 * frame on which the other recognizer finished recognition.
 */
export class SuccessFrameGrabberRecognizer extends Recognizer {
    constructor(slaveRecognizer) {
        super('SuccessFrameGrabberRecognizer');
        this.slaveRecognizer = slaveRecognizer;
        if (this.slaveRecognizer instanceof Recognizer == false) {
            throw new Error("Slave recognizer must be Recognizer!");
        }
        this.createResultFromNative = (nativeResult) => { return new SuccessFrameGrabberRecognizerResult(nativeResult, this.slaveRecognizer.createResultFromNative(nativeResult.slaveRecognizerResult)); };
    }
}
//# sourceMappingURL=successFrameGrabberRecognizer.js.map