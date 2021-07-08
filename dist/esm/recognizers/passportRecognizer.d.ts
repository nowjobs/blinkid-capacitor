import { Recognizer, RecognizerResult } from '../recognizer';
import { MrzResult, ImageExtensionFactors } from '../types';
/**
 * Result object for PassportRecognizer.
 */
export declare class PassportRecognizerResult extends RecognizerResult {
    /**
     * Digital signature of the recognition result. Available only if enabled with signResult property.
     */
    digitalSignature: string;
    /**
     * Version of the digital signature. Available only if enabled with signResult property.
     */
    digitalSignatureVersion: number;
    /**
     * face image from the document if enabled with returnFaceImage property.
     */
    faceImage: string;
    /**
     * full document image if enabled with returnFullDocumentImage property.
     */
    fullDocumentImage: string;
    /**
     * The data extracted from the machine readable zone.
     */
    mrzResult: MrzResult;
    constructor(nativeResult: any);
}
/**
 * Recognizer which can scan all passports with MRZ.
 */
export declare class PassportRecognizer extends Recognizer {
    /**
     * Defines whether to anonymize Netherlands MRZ
         *
         *
     */
    anonymizeNetherlandsMrz: boolean;
    /**
     * Defines if glare detection should be turned on/off.
         *
         *
     */
    detectGlare: boolean;
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
    /**
     * Whether or not recognition result should be signed.
         *
         *
     */
    signResult: boolean;
    constructor();
}
