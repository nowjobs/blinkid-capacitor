import { Recognizer, RecognizerResult } from '../recognizer';
import { Date, BarcodeType, IdBarcodeDocumentType, BarcodeElements } from '../types';
/**
 * Result object for IdBarcodeRecognizer.
 */
export declare class IdBarcodeRecognizerResult extends RecognizerResult {
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
     * Type of the barcode scanned
         *
         *  @return Type of the barcode
     */
    barcodeType: BarcodeType;
    /**
     * The city address portion of the document owner.
     */
    city: string;
    /**
     * The date of birth of the document owner.
     */
    dateOfBirth: Date;
    /**
     * The date of expiry of the document.
     */
    dateOfExpiry: Date;
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
     * The document type deduced from the recognized barcode
         *
         *  @return Type of the document
     */
    documentType: IdBarcodeDocumentType;
    /**
     * The employer of the document owner.
     */
    employer: string;
    /**
     * The additional privileges granted to the driver license owner.
     */
    endorsements: string;
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
     * Document specific extended elements that contain all barcode fields in their original form.
         *
         * Currently this is only filled for AAMVACompliant documents.
     */
    extendedElements: BarcodeElements;
    /**
     * The first name of the document owner.
     */
    firstName: string;
    /**
     * The full name of the document owner.
     */
    fullName: string;
    /**
     * The issuing authority of the document.
     */
    issuingAuthority: string;
    /**
     * The jurisdiction code address portion of the document owner.
     */
    jurisdiction: string;
    /**
     * The last name of the document owner.
     */
    lastName: string;
    /**
     * The marital status of the document owner.
     */
    maritalStatus: string;
    /**
     * The middle name of the document owner.
     */
    middleName: string;
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
     * The postal code address portion of the document owner.
     */
    postalCode: string;
    /**
     * The profession of the document owner.
     */
    profession: string;
    /**
     * The race of the document owner.
     */
    race: string;
    /**
     * Byte array with result of the scan
     */
    rawData: string;
    /**
     * The religion of the document owner.
     */
    religion: string;
    /**
     * The residential stauts of the document owner.
     */
    residentialStatus: string;
    /**
     * The restrictions to driving privileges for the driver license owner.
     */
    restrictions: string;
    /**
     * The sex of the document owner.
     */
    sex: string;
    /**
     * The street address portion of the document owner.
     */
    street: string;
    /**
     * Retrieves string content of scanned data
     */
    stringData: string;
    /**
     * Flag indicating uncertain scanning data
         * E.g obtained from damaged barcode.
     */
    uncertain: boolean;
    /**
     * The type of vehicle the driver license owner has privilege to drive.
     */
    vehicleClass: string;
    constructor(nativeResult: any);
}
/**
 * The ID Barcode Recognizer is used for scanning ID Barcode.
 */
export declare class IdBarcodeRecognizer extends Recognizer {
    constructor();
}
