import { Recognizer, RecognizerResult } from '../recognizer';
import { Date, MrzResult, ImageAnalysisResult, VizResult, BarcodeResult, ProcessingStatus, AnonymizationMode, RecognitionModeFilter, DriverLicenseDetailedInfo, RecognitionMode, ClassInfo, ImageExtensionFactors, DataMatchResult } from '../types';
/**
 * Result object for BlinkIdCombinedRecognizer.
 */
export declare class BlinkIdCombinedRecognizerResult extends RecognizerResult {
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
     * Defines possible color and moire statuses determined from scanned back image.
     */
    backImageAnalysisResult: ImageAnalysisResult;
    /**
     * Status of the last back side recognition process.
     */
    backProcessingStatus: ProcessingStatus;
    /**
     * Defines the data extracted from the back side visual inspection zone.
     */
    backVizResult: VizResult;
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
     * Digital signature of the recognition result. Available only if enabled with signResult property.
     */
    digitalSignature: string;
    /**
     * Version of the digital signature. Available only if enabled with signResult property.
     */
    digitalSignatureVersion: number;
    /**
     * The additional number of the document.
     */
    documentAdditionalNumber: string;
    /**
     * Returns DataMatchResultSuccess if data from scanned parts/sides of the document match,
         * DataMatchResultFailed otherwise. For example if date of expiry is scanned from the front and back side
         * of the document and values do not match, this method will return DataMatchResultFailed. Result will
         * be DataMatchResultSuccess only if scanned values for all fields that are compared are the same.
     */
    documentDataMatch: DataMatchResult;
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
     * Defines possible color and moire statuses determined from scanned front image.
     */
    frontImageAnalysisResult: ImageAnalysisResult;
    /**
     * Status of the last front side recognition process.
     */
    frontProcessingStatus: ProcessingStatus;
    /**
     * Defines the data extracted from the front side visual inspection zone.
     */
    frontVizResult: VizResult;
    /**
     * back side image of the document if enabled with returnFullDocumentImage property.
     */
    fullDocumentBackImage: string;
    /**
     * front side image of the document if enabled with returnFullDocumentImage property.
     */
    fullDocumentFrontImage: string;
    /**
     * The full name of the document owner.
     */
    fullName: string;
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
     * Returns true if recognizer has finished scanning first side and is now scanning back side,
         * false if it's still scanning first side.
     */
    scanningFirstSideDone: boolean;
    /**
     * The sex of the document owner.
     */
    sex: string;
    /**
     * image of the signature if enabled with returnSignatureImage property.
     */
    signatureImage: string;
    constructor(nativeResult: any);
}
/**
 * Recognizer which can scan front and back side of the United States driver license.
 */
export declare class BlinkIdCombinedRecognizer extends Recognizer {
    /**
     * Defines whether blured frames filtering is allowed
         *
         *
     */
    allowBlurFilter: boolean;
    /**
     * Proceed with scanning the back side even if the front side result is uncertain.
         * This only works for still images - video feeds will ignore this setting.
         *
         *
     */
    allowUncertainFrontSideScan: boolean;
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
     * Configure the number of characters per field that are allowed to be inconsistent in data match.
         *
         *
     */
    maxAllowedMismatchesPerField: number;
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
     * Whether or not recognition result should be signed.
         *
         *
     */
    signResult: boolean;
    /**
     * Property for setting DPI for signature images
         * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
         *
         *
     */
    signatureImageDpi: number;
    /**
     * Skip back side capture and processing step when back side of the document is not supported
         *
         *
     */
    skipUnsupportedBack: boolean;
    /**
     * Defines whether result characters validatation is performed.
         * If a result member contains invalid character, the result state cannot be valid
         *
         *
     */
    validateResultCharacters: boolean;
    constructor();
}
