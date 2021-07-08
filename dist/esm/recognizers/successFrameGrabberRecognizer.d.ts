import { Recognizer, RecognizerResult } from '../recognizer';
/**
 * Result object for SuccessFrameGrabberRecognizer.
 */
export declare class SuccessFrameGrabberRecognizerResult extends RecognizerResult {
    /** Camera frame at the time slave recognizer finished recognition */
    successFrame: string;
    /** RecognizerResult of the slave recognizer */
    slaveRecognizerResult: RecognizerResult;
    constructor(nativeResult: any, slaveRecognizerResult: RecognizerResult);
}
/**
 * SuccessFrameGrabberRecognizer can wrap any other recognizer and obtain camera
 * frame on which the other recognizer finished recognition.
 */
export declare class SuccessFrameGrabberRecognizer extends Recognizer {
    /** Slave recognizer that SuccessFrameGrabberRecognizer will watch */
    slaveRecognizer: Recognizer;
    constructor(slaveRecognizer: Recognizer);
}
