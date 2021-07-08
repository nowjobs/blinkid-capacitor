import { Recognizer, RecognizerResult } from '../recognizer';
import { Date, MrzResult, ImageAnalysisResult, VizResult, BarcodeResult, ProcessingStatus, AnonymizationMode, RecognitionModeFilter, DriverLicenseDetailedInfo, RecognitionMode, ClassInfo, ImageExtensionFactors } from '../types';
/**
 * Result object for BlinkIdRecognizer.
 */
export declare class BlinkIdRecognizerResult extends RecognizerResult {
    /**
     * The additional address information of the document owner.
     */
    additionalAddressInformation: string;
    /**
     * The additional name information of the document owner.
     */
    additionalNameInformation: string;
    /**
     * The address of the document owner.
     */
    address: string;
    /**
     * The current age of the document owner in years. It is calculated difference
         * between now and date of birth. Now is current time on the device.
         * @return current age of the document owner in years or -1 if date of birth is unknown.
     */
    age: number;
    /**
     * Defines the data extracted from the barcode.
     */
    barcodeResult: BarcodeResult;
    /**
     * The classification information.
     */
    classInfo: ClassInfo;
    /**
     * The date of birth of the document owner.
     */
    dateOfBirth: Date;
    /**
     * The date of expiry of the document.
     */
    dateOfExpiry: Date;
    /**
     * Determines if date of expiry is permanent.
     */
    dateOfExpiryPermanent: boolean;
    /**
     * The date of issue of the document.
     */
    dateOfIssue: Date;
    /**
     * The additional number of the document.
     */
    documentAdditionalNumber: string;
    /**
     * The document number.
     */
    documentNumber: string;
    /**
     * The one more additional number of the document.
     */
    documentOptionalAdditionalNumber: string;
    /**
     * The driver license detailed info.
     */
    driverLicenseDetailedInfo: DriverLicenseDetailedInfo;
    /**
     * The employer of the document owner.
     */
    employer: string;
    /**
     * Checks whether the document has expired or not by comparing the current
         * time on the device with the date of expiry.
         *
         * @return true if the document has expired, false in following cases:
         * document does not expire (date of expiry is permanent)
         * date of expiry has passed
         * date of expiry is unknown and it is not permanent
     */
    expired: boolean;
    /**
     * face image from the document if enabled with returnFaceImage property.
     */
    faceImage: string;
    /**
     * The first name of the document owner.
     */
    firstName: string;
    /**
     * full document image if enabled with returnFullDocumentImage property.
     */
    fullDocumentImage: string;
    /**
     * The full name of the document owner.
     */
    fullName: string;
    /**
     * Defines possible color and moire statuses determined from scanned image.
     */
    imageAnalysisResult: ImageAnalysisResult;
    /**
     * The issuing authority of the document.
     */
    issuingAuthority: string;
    /**
     * The last name of the document owner.
     */
    lastName: string;
    /**
     * The localized name of the document owner.
     */
    localizedName: string;
    /**
     * The marital status of the document owner.
     */
    maritalStatus: string;
    /**
     * The data extracted from the machine readable zone
     */
    mrzResult: MrzResult;
    /**
     * The nationality of the documet owner.
     */
    nationality: string;
    /**
     * The personal identification number.
     */
    personalIdNumber: string;
    /**
     * The place of birth of the document owner.
     */
    placeOfBirth: string;
    /**
     * Defines status of the last recognition process.
     */
    processingStatus: ProcessingStatus;
    /**
     * The profession of the document owner.
     */
    profession: string;
    /**
     * The race of the document owner.
     */
    race: string;
    /**
     * Recognition mode used to scan current document.
     */
    recognitionMode: RecognitionMode;
    /**
     * The religion of the document owner.
     */
    religion: string;
    /**
     * The residential stauts of the document owner.
     */
    residentialStatus: string;
    /**
     * The sex of the document owner.
     */
    sex: string;
    /**
     * image of the signature if enabled with returnSignatureImage property.
     */
    signatureImage: string;
    /**
     * Defines the data extracted from the visual inspection zone
     */
    vizResult: VizResult;
    constructor(nativeResult: any);
}
/**
 * The Blink ID Recognizer is used for scanning Blink ID.
 */
export declare class BlinkIdRecognizer extends Recognizer {
    /**
     * Defines whether blured frames filtering is allowed
         *
         *
     */
    allowBlurFilter: boolean;
    /**
     * Defines whether returning of unparsed MRZ (Machine Readable Zone) results is allowed
         *
         *
     */
    allowUnparsedMrzResults: boolean;
    /**
     * Defines whether returning unverified MRZ (Machine Readable Zone) results is allowed
         * Unverified MRZ is parsed, but check digits are incorrect
         *
         *
     */
    allowUnverifiedMrzResults: boolean;
    /**
     * Defines whether sensitive data should be removed from images, result fields or both.
         * The setting only applies to certain documents
         *
         *
     */
    anonymizationMode: AnonymizationMode;
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
     * Pading is a minimum distance from the edge of the frame and is defined as a percentage of the frame width. Default value is 0.0f and in that case
         * padding edge and image edge are the same.
         * Recommended value is 0.02f.
         *
         *
     */
    paddingEdge: number;
    /**
     * Enable or disable recognition of specific document groups supported by the current license.
         *
         *
     */
    recognitionModeFilter: RecognitionModeFilter;
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
     * Sets whether signature image from ID card should be extracted.
         *
         *
     */
    returnSignatureImage: boolean;
    /**
     * Configure the recognizer to only work on already cropped and dewarped images.
         * This only works for still images - video feeds will ignore this setting.
         *
         *
     */
    scanCroppedDocumentImage: boolean;
    /**
     * Property for setting DPI for signature images
         * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
         *
         *
     */
    signatureImageDpi: number;
    /**
     * Defines whether result characters validatation is performed.
         * If a result member contains invalid character, the result state cannot be valid
         *
         *
     */
    validateResultCharacters: boolean;
    constructor();
}
