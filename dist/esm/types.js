/**
 * Represents a date extracted from image.
 */
export class Date {
    constructor(nativeDate) {
        this.day = nativeDate.day;
        this.month = nativeDate.month;
        this.year = nativeDate.year;
    }
}
/**
 * Represents a point in image
 */
export class Point {
    constructor(nativePoint) {
        this.x = nativePoint.x;
        this.y = nativePoint.y;
    }
}
/**
 * Represents a quadrilateral location in the image
 */
export class Quadrilateral {
    constructor(nativeQuad) {
        this.upperLeft = new Point(nativeQuad.upperLeft);
        this.upperRight = new Point(nativeQuad.upperRight);
        this.lowerLeft = new Point(nativeQuad.lowerLeft);
        this.lowerRight = new Point(nativeQuad.lowerRight);
    }
}
/**
 * Represents data extracted from the Driver's license.
 */
export class DriverLicenseDetailedInfo {
    constructor(nativeDriverLicenseDetailedInfo) {
        this.restrictions = nativeDriverLicenseDetailedInfo.restrictions;
        this.endorsements = nativeDriverLicenseDetailedInfo.endorsements;
        this.vehicleClass = nativeDriverLicenseDetailedInfo.vehicleClass;
        this.conditions = nativeDriverLicenseDetailedInfo.conditions;
    }
}
/** Represents the classification information. **/
export class ClassInfo {
    constructor(nativeClassInfo) {
        this.country = nativeClassInfo.country;
        this.region = nativeClassInfo.region;
        this.type = nativeClassInfo.type;
        this.empty = nativeClassInfo.empty;
        this.countryName = nativeClassInfo.countryName;
        this.isoNumericCountryCode = nativeClassInfo.isoNumericCountryCode;
        this.isoAlpha2CountryCode = nativeClassInfo.isoAlpha2CountryCode;
        this.isoAlpha3CountryCode = nativeClassInfo.isoAlpha3CountryCode;
    }
}
/**
 * Defines possible color and moire statuses determined from scanned image.
 */
export class ImageAnalysisResult {
    constructor(nativeImageAnalysisResult) {
        this.blurred = nativeImageAnalysisResult.blurred;
        this.documentImageColorStatus = nativeImageAnalysisResult.documentImageColorStatus;
        this.documentImageMoireStatus = nativeImageAnalysisResult.documentImageMoireStatus;
        this.faceDetectionStatus = nativeImageAnalysisResult.faceDetectionStatus;
        this.mrzDetectionStatus = nativeImageAnalysisResult.mrzDetectionStatus;
        this.barcodeDetectionStatus = nativeImageAnalysisResult.barcodeDetectionStatus;
    }
}
/** Defines the data extracted from the barcode. */
export class BarcodeResult {
    constructor(nativeBarcodeResult) {
        /** Type of the barcode scanned */
        this.barcodeType = nativeBarcodeResult.barcodeType;
        /** Byte array with result of the scan */
        this.rawData = nativeBarcodeResult.rawData;
        /** Retrieves content of scanned data */
        this.stringData = nativeBarcodeResult.stringData;
        /** Flag indicating uncertain scanning data */
        this.uncertain = nativeBarcodeResult.uncertain;
        /** The first name of the document owner. */
        this.firstName = nativeBarcodeResult.firstName;
        /** The middle name of the document owner. */
        this.middleName = nativeBarcodeResult.middleName;
        /** The last name of the document owner. */
        this.lastName = nativeBarcodeResult.lastName;
        /** The full name of the document owner. */
        this.fullName = nativeBarcodeResult.fullName;
        /** The additional name information of the document owner. */
        this.additionalNameInformation = nativeBarcodeResult.additionalNameInformation;
        /** The address of the document owner. */
        this.address = nativeBarcodeResult.address;
        /** The place of birth of the document owner. */
        this.placeOfBirth = nativeBarcodeResult.placeOfBirth;
        /** The nationality of the documet owner. */
        this.nationality = nativeBarcodeResult.nationality;
        /** The race of the document owner. */
        this.race = nativeBarcodeResult.race;
        /** The religion of the document owner. */
        this.religion = nativeBarcodeResult.religion;
        /** The profession of the document owner. */
        this.profession = nativeBarcodeResult.profession;
        /** The marital status of the document owner. */
        this.maritalStatus = nativeBarcodeResult.maritalStatus;
        /** The residential stauts of the document owner. */
        this.residentialStatus = nativeBarcodeResult.residentialStatus;
        /** The employer of the document owner. */
        this.employer = nativeBarcodeResult.employer;
        /** The sex of the document owner. */
        this.sex = nativeBarcodeResult.sex;
        /** The date of birth of the document owner. */
        this.dateOfBirth = nativeBarcodeResult.dateOfBirth != null ? new Date(nativeBarcodeResult.dateOfBirth) : null;
        /** The date of issue of the document. */
        this.dateOfIssue = nativeBarcodeResult.dateOfIssue.Date != null ? new Date(nativeBarcodeResult.dateOfIssue) : null;
        /** The date of expiry of the document. */
        this.dateOfExpiry = nativeBarcodeResult.dateOfExpiry.Date != null ? new Date(nativeBarcodeResult.dateOfExpiry) : null;
        /** The document number. */
        this.documentNumber = nativeBarcodeResult.documentNumber;
        /**  The personal identification number. */
        this.personalIdNumber = nativeBarcodeResult.personalIdNumber;
        /** The additional number of the document. */
        this.documentAdditionalNumber = nativeBarcodeResult.documentAdditionalNumber;
        /** The issuing authority of the document. */
        this.issuingAuthority = nativeBarcodeResult.issuingAuthority;
        /** The street address portion of the document owner. */
        this.street = nativeBarcodeResult.street;
        /** The postal code address portion of the document owner. */
        this.postalCode = nativeBarcodeResult.postalCode;
        /** The city address portion of the document owner. */
        this.city = nativeBarcodeResult.city;
        /** The jurisdiction code address portion of the document owner. */
        this.jurisdiction = nativeBarcodeResult.jurisdiction;
        /** The driver license detailed info. */
        this.driverLicenseDetailedInfo = nativeBarcodeResult.driverLicenseDetailedInfo != null ? new DriverLicenseDetailedInfo(nativeBarcodeResult.driverLicenseDetailedInfo) : null;
        /** Flag that indicates if barcode result is empty */
        this.empty = nativeBarcodeResult.empty;
        /** Document specific extended elements that contain all barcode fields in their original form. Currently this is only filled for AAMVACompliant documents. */
        this.extendedElements = nativeBarcodeResult.extendedElements != null ? new BarcodeElements(nativeBarcodeResult.extendedElements) : null;
    }
}
export class BarcodeElements {
    constructor(nativeBarcodeElements) {
        this.empty = nativeBarcodeElements.empty;
        this.values = nativeBarcodeElements.values;
    }
}
/** Defines the data extracted from the visual inspection zone */
export class VizResult {
    constructor(nativeVizResult) {
        /** The first name of the document owner. */
        this.firstName = nativeVizResult.firstName;
        /** The last name of the document owner. */
        this.lastName = nativeVizResult.lastName;
        /** The full name of the document owner. */
        this.fullName = nativeVizResult.fullName;
        /** The additional name information of the document owner. */
        this.additionalNameInformation = nativeVizResult.additionalNameInformation;
        /** The localized name of the document owner. */
        this.localizedName = nativeVizResult.localizedName;
        /** The address of the document owner. */
        this.address = nativeVizResult.address;
        /** The additional address information of the document owner. */
        this.additionalAddressInformation = nativeVizResult.additionalAddressInformation;
        /** The place of birth of the document owner. */
        this.placeOfBirth = nativeVizResult.placeOfBirth;
        /** The nationality of the documet owner. */
        this.nationality = nativeVizResult.nationality;
        /** The race of the document owner. */
        this.race = nativeVizResult.race;
        /** The religion of the document owner. */
        this.religion = nativeVizResult.religion;
        /** The profession of the document owner. */
        this.profession = nativeVizResult.profession;
        /** The marital status of the document owner. */
        this.maritalStatus = nativeVizResult.maritalStatus;
        /** The residential stauts of the document owner. */
        this.residentialStatus = nativeVizResult.residentialStatus;
        /** The employer of the document owner. */
        this.employer = nativeVizResult.employer;
        /** The sex of the document owner. */
        this.sex = nativeVizResult.sex;
        /** The date of birth of the document owner. */
        this.dateOfBirth = nativeVizResult.dateOfBirth.Date != null ? new Date(nativeVizResult.dateOfBirth) : null;
        /** The date of issue of the document. */
        this.dateOfIssue = nativeVizResult.dateOfIssue.Date != null ? new Date(nativeVizResult.dateOfIssue) : null;
        /** The date of expiry of the document. */
        this.dateOfExpiry = nativeVizResult.dateOfExpiry.Date != null ? new Date(nativeVizResult.dateOfExpiry) : null;
        /** The document number. */
        this.documentNumber = nativeVizResult.documentNumber;
        /** The personal identification number. */
        this.personalIdNumber = nativeVizResult.personalIdNumber;
        /** The additional number of the document. */
        this.documentAdditionalNumber = nativeVizResult.documentAdditionalNumber;
        /** The additional personal identification number. */
        this.additionalPersonalIdNumber = nativeVizResult.additionalPersonalIdNumber;
        /** The issuing authority of the document. */
        this.issuingAuthority = nativeVizResult.issuingAuthority;
        /** The driver license detailed info. */
        this.driverLicenseDetailedInfo = nativeVizResult.driverLicenseDetailedInfo != null ? new DriverLicenseDetailedInfo(nativeVizResult.driverLicenseDetailedInfo) : null;
        /** Flag that indicates if barcode result is empty */
        this.empty = nativeVizResult.empty;
        this.documentOptionalAdditionalNumber = nativeVizResult.documentOptionalAdditionalNumber;
    }
}
/**
 * Represents data extracted from MRZ (Machine Readable Zone) of Machine Readable Travel Document (MRTD).
 */
export class MrzResult {
    constructor(nativeMRZResult) {
        /**
         * Type of recognized document. It is always one of the values represented by BlinkIDScanner.MRTDDocumentType
         */
        this.documentType = nativeMRZResult.documentType;
        /** The primary indentifier. If there is more than one component, they are separated with space. */
        this.primaryId = nativeMRZResult.primaryId;
        /** The secondary identifier. If there is more than one component, they are separated with space. */
        this.secondaryId = nativeMRZResult.secondaryId;
        /**
         * Three-letter or two-letter code which indicate the issuing State. Three-letter codes are based
         * on Aplha-3 codes for entities specified in ISO 3166-1, with extensions for certain States. Two-letter
         * codes are based on Alpha-2 codes for entities specified in ISO 3166-1, with extensions for certain States.
         */
        this.issuer = nativeMRZResult.issuer;
        /** Holder's date of birth */
        this.dateOfBirth = nativeMRZResult.dateOfBirth != null ? new Date(nativeMRZResult.dateOfBirth) : null;
        /**
         * The document number. Document number contains up to 9 characters.
         * Element does not exist on US Green Card. To see which document was scanned use documentType property.
         */
        this.documentNumber = nativeMRZResult.documentNumber;
        /**
         * The nationality of the holder represented by a three-letter or two-letter code. Three-letter
         * codes are based on Alpha-3 codes for entities specified in ISO 3166-1, with extensions for certain
         * States. Two-letter codes are based on Aplha-2 codes for entities specified in ISO 3166-1, with
         * extensions for certain States.
         */
        this.nationality = nativeMRZResult.nationality;
        /**
         * The gender of the card holder. Gender is specified by use of the single initial, capital letter F for female,
         * M for male or <code>&lt;</code> for unspecified.
         */
        this.gender = nativeMRZResult.gender;
        /**
         * The document code. Document code contains two characters. For MRTD the first character shall
         * be A, C or I. The second character shall be discretion of the issuing State or organization except
         * that V shall not be used, and `C` shall not be used after `A` except in the crew member certificate.
         * On machine-readable passports (MRP) first character shall be `P` to designate an MRP. One additional
         * letter may be used, at the discretion of the issuing State or organization, to designate a particular
         * MRP. If the second character position is not used for this purpose, it shall be filled by the filter
         * character <code>&lt;</code>.
         */
        this.documentCode = nativeMRZResult.documentCode;
        /** The date of expiry */
        this.dateOfExpiry = nativeMRZResult.dateOfExpiry != null ? new Date(nativeMRZResult.dateOfExpiry) : null;
        /**
         * The first optional data. Contains empty if not available.
         * Element does not exist on US Green Card. To see which document was scanned use the documentType property.
         */
        this.opt1 = nativeMRZResult.opt1;
        /**
         * The second optional data. Contains empty if not available.
         * Element does not exist on Passports and Visas. To see which document was scanned use the documentType property.
         */
        this.opt2 = nativeMRZResult.opt2;
        /**
         * The alien number. Contains empty if not available.
         * Exists only on US Green Cards. To see which document was scanned use the documentType property.
         */
        this.alienNumber = nativeMRZResult.alienNumber;
        /**
         * The application receipt number. Contains empty if not available.
         * Exists only on US Green Cards. To see which document was scanned use the documentType property.
         */
        this.applicationReceiptNumber = nativeMRZResult.applicationReceiptNumber;
        /**
         * The immigrant case number. Contains empty if not available.
         * Exists only on US Green Cards. To see which document was scanned use the documentType property.
         */
        this.immigrantCaseNumber = nativeMRZResult.immigrantCaseNumber;
        /**
         * The entire Machine Readable Zone text from ID. This text is usually used for parsing
         * other elements.
         * NOTE: This is available only if OCR result was parsed successfully.
         */
        this.mrzText = nativeMRZResult.mrzText;
        /** true if Machine Readable Zone has been parsed, false otherwise. */
        this.mrzParsed = nativeMRZResult.mrzParsed;
        /** true if all check digits inside MRZ are correct, false otherwise. */
        this.mrzVerified = nativeMRZResult.mrzVerified;
        /**
        * Sanitized field opt1
        */
        this.sanitizedOpt1 = nativeMRZResult.sanitizedOpt1;
        /**
        * Sanitized field opt2
        */
        this.sanitizedOpt2 = nativeMRZResult.sanitizedOpt2;
        /**
        * Sanitized field nationality
        */
        this.sanitizedNationality = nativeMRZResult.sanitizedNationality;
        /**
        * Sanitized field issuer
        */
        this.sanitizedIssuer = nativeMRZResult.sanitizedIssuer;
        /**
        * Sanitized document code
        */
        this.sanitizedDocumentCode = nativeMRZResult.sanitizedDocumentCode;
        /**
        * Sanitized document number
        */
        this.sanitizedDocumentNumber = nativeMRZResult.sanitizedDocumentNumber;
        /**
         * The current age of the document owner in years. It is calculated difference
         * between now and date of birth. Now is current time on the device.
         * @return current age of the document owner in years or -1 if date of birth is unknown.
        */
        this.age = nativeMRZResult.age;
    }
}
/**
 * RecognitionModeFilter is used to enable/disable recognition of specific document groups.
 * Setting is taken into account only if the right for that document is purchased.
 */
export class RecognitionModeFilter {
    constructor() {
        /** Enable scanning of MRZ IDs. Setting is taken into account only if the mrz_id right is purchased. */
        this.enableMrzId = true;
        /** Enable scanning of visa MRZ. Setting is taken into account only if the visa right is purchased. */
        this.enableMrzVisa = true;
        /** Enable scanning of Passport MRZ. Setting is taken into account only if the passport right is purchased. */
        this.enableMrzPassport = true;
        /** Enable scanning of Photo ID. Setting is taken into account only if the photo_id right is purchased. */
        this.enablePhotoId = true;
        /** Enable scanning of barcode IDs. Setting is taken into account only if the barcode right to scan that barcode is purchased. */
        this.enableBarcodeId = true;
        /** Enable full document recognition. Setting is taken into account only if the document right to scan that document is purchased. */
        this.enableFullDocumentRecognition = true;
    }
}
/**
 * Extension factors relative to corresponding dimension of the full image. For example,
 * upFactor and downFactor define extensions relative to image height, e.g.
 * when upFactor is 0.5, upper image boundary will be extended for half of image's full
 * height.
 */
export class ImageExtensionFactors {
    constructor() {
        /** image extension factor relative to full image height in UP direction. */
        this.upFactor = 0.0;
        /** image extension factor relative to full image height in RIGHT direction. */
        this.rightFactor = 0.0;
        /** image extension factor relative to full image height in DOWN direction. */
        this.downFactor = 0.0;
        /** image extension factor relative to full image height in LEFT direction. */
        this.leftFactor = 0.0;
    }
}
//# sourceMappingURL=types.js.map