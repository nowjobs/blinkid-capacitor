import { Recognizer, RecognizerResult } from '../recognizer';
import { Quadrilateral, DocumentFaceDetectorType, ImageExtensionFactors } from '../types';
/**
 * Result object for DocumentFaceRecognizer.
 */
export declare class DocumentFaceRecognizerResult extends RecognizerResult {
    /**
     * Quadrangle represeting corner points of the document within the input image.
     */
    documentLocation: Quadrilateral;
    /**
     * face image from the document if enabled with returnFaceImage property.
     */
    faceImage: string;
    /**
     * Quadrangle represeting corner points of the face image within the input image.
     */
    faceLocation: Quadrilateral;
    /**
     * full document image if enabled with returnFullDocumentImage property.
     */
    fullDocumentImage: string;
    constructor(nativeResult: any);
}
/**
 * Class for configuring Document Face Recognizer Recognizer.
 *
 * Document Face Recognizer recognizer is used for scanning documents containing face images.
 */
export declare class DocumentFaceRecognizer extends Recognizer {
    /**
     * Type of docment this recognizer will scan.
         *
         *
     */
    detectorType: DocumentFaceDetectorType;
    /**
     * Property for setting DPI for face images
         * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
         *
         *
     */
    faceImageDpi: number;
    /**
     * Property for setting DPI for full document images
         * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
         *
         *
     */
    fullDocumentImageDpi: number;
    /**
     * Image extension factors for full document image.
         *
         * @see ImageExtensionFactors
         *
     */
    fullDocumentImageExtensionFactors: ImageExtensionFactors;
    /**
     * Defines how many times the same document should be detected before the detector
         * returns this document as a result of the deteciton
         *
         * Higher number means more reliable detection, but slower processing
         *
         *
     */
    numStableDetectionsThreshold: number;
    /**
     * Sets whether face image from ID card should be extracted
         *
         *
     */
    returnFaceImage: boolean;
    /**
     * Sets whether full document image of ID card should be extracted.
         *
         *
     */
    returnFullDocumentImage: boolean;
    constructor();
}
