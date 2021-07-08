import { Recognizer, RecognizerResult } from '../recognizer';
import { ImageExtensionFactors, Date, DataMatchResult } from '../types';
/**
 * Result object for UsdlCombinedRecognizer.
 */
export declare class UsdlCombinedRecognizerResult extends RecognizerResult {
    /**
     * Digital signature of the recognition result. Available only if enabled with signResult property.
     */
    digitalSignature: string;
    /**
     * Version of the digital signature. Available only if enabled with signResult property.
     */
    digitalSignatureVersion: number;
    /**
     * Returns true if data from scanned parts/sides of the document match,
     * false otherwise. For example if date of expiry is scanned from the front and back side
     * of the document and values do not match, this method will return false. Result will
     * be true only if scanned values for all fields that are compared are the same.
     */
    documentDataMatch: DataMatchResult;
    /**
     * face image from the document if enabled with returnFaceImage property.
     */
    faceImage: string;
    /**
     * full document image if enabled with returnFullDocumentImage property.
     */
    fullDocumentImage: string;
    /**
     * Returns true if recognizer has finished scanning first side and is now scanning back side,
     * false if it's still scanning first side.
     */
    scanningFirstSideDone: boolean;
    /** Array of elements that are not part of AAMVA standard and are specific to each US state. */
    optionalElements: string[];
    /** The raw bytes contained inside 2D barcode. */
    rawData: string;
    /** Raw string inside 2D barcode. */
    rawStringData: string;
    /** True if returned result is uncertain, i.e. if scanned barcode was incomplete (i.e. */
    uncertain: boolean;
    /** Fields inside US Driver's licence. Available Keys are listed in UsdlKeys enum. */
    fields: string[];
    /** The first name of the United States driver license owner. */
    firstName: string;
    /** The middle name of the United States driver license owner. */
    middleName: string;
    /** The last name of the United States driver license owner. */
    lastName: string;
    /** The full name of the United States driver license owner. */
    fullName: string;
    /** The name suffix of the United States driver license owner. */
    nameSuffix: string;
    /** The full address of the United States driver license owner. */
    address: string;
    /** The document number of the United States driver license. */
    documentNumber: string;
    /** The sex of the United States driver license owner. */
    sex: string;
    /** The restrictions to driving privileges for the United States driver license owner. */
    restrictions: string;
    /** The additional privileges granted to the United States driver license owner. */
    endorsements: string;
    /** The type of vehicle the driver license owner has privilege to drive. */
    vehicleClass: string;
    /** The date of birth of the United States driver license owner. */
    dateOfBirth: Date;
    /** The date of issue of the United States driver license. */
    dateOfIssue: Date;
    /** The date of expiry of the United States driver license. */
    dateOfExpiry: Date;
    /**
     * The current age of the document owner in years. It is calculated difference
     * between now and date of birth. Now is current time on the device.
     * @return current age of the document owner in years or -1 if date of birth is unknown.
    */
    age: number;
    constructor(nativeResult: any);
}
/**
 * USDL Combined Recognizer.
 *
 * USDL Combined recognizer is used for scanning both front and back side of US Driver's License.
 */
export declare class UsdlCombinedRecognizer extends Recognizer {
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
     * The extension factors for full document image.
     */
    fullDocumentImageExtensionFactors: ImageExtensionFactors;
    /**
     * Minimum number of stable detections required for detection to be successful.
     */
    numStableDetectionsThreshold: number;
    /**
     * Whether or not recognition result should be signed.
     *
     *
     */
    signResult: boolean;
    constructor();
    createResultFromNative: (nativeResult: any) => UsdlCombinedRecognizerResult;
}
