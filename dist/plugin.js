var capacitorPlugin = (function (exports, core) {
    'use strict';

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const { BlinkIDCapacitorPlugin } = core.Plugins;
    (function (ScanningStatus) {
        ScanningStatus[ScanningStatus["cancelled"] = 0] = "cancelled";
        ScanningStatus[ScanningStatus["succeeded"] = 1] = "succeeded";
    })(exports.ScanningStatus || (exports.ScanningStatus = {}));
    class BlinkIDPlugin {
        scanWithCamera(overlaySettings, recognizerCollection, license) {
            return __awaiter(this, void 0, void 0, function* () {
                let functions = [];
                for (let recognizer of recognizerCollection.recognizerArray) {
                    let recognizerFunction = recognizer.createResultFromNative;
                    functions.push(recognizerFunction);
                    delete recognizer.createResultFromNative;
                }
                const response = yield BlinkIDCapacitorPlugin.scanWithCamera({ 'overlaySettings': overlaySettings, 'recognizerCollection': recognizerCollection, 'license': license });
                const results = response.resultList;
                const isCancelled = response.cancelled;
                let resultsFromNative = [];
                if (!isCancelled && results) {
                    for (let i = 0; i < results.length; ++i) {
                        recognizerCollection.recognizerArray[i].createResultFromNative = functions[i];
                        let result = recognizerCollection.recognizerArray[i].createResultFromNative(results[i]);
                        if (result.resultState != 1 /* empty */) {
                            resultsFromNative.push(result);
                        }
                    }
                }
                return resultsFromNative;
            });
        }
    }

    /**
     * Base class for all recognizers.
     * Recognizer is object that performs recognition of image
     * and updates its result with data extracted from the image.
     */
    class Recognizer {
        constructor(recognizerType) {
            this.recognizerType = recognizerType;
        }
    }
    /**
     * Base class for all recognizer's result objects.
     * Recoginzer result contains data extracted from the image.
     */
    class RecognizerResult {
        constructor(resultState) {
            this.resultState = resultState;
        }
    }
    /**
     * Represents a collection of recognizer objects.
     * @param recognizerArray Array of recognizer objects that will be used for recognition. Must not be empty!
     */
    class RecognizerCollection {
        constructor(recognizerArray) {
            this.recognizerArray = recognizerArray;
            this.allowMultipleResults = false;
            this.milisecondsBeforeTimeout = 10000;
        }
    }

    /**
     * Represents a date extracted from image.
     */
    class Date {
        constructor(nativeDate) {
            this.day = nativeDate.day;
            this.month = nativeDate.month;
            this.year = nativeDate.year;
        }
    }
    /**
     * Represents a point in image
     */
    class Point {
        constructor(nativePoint) {
            this.x = nativePoint.x;
            this.y = nativePoint.y;
        }
    }
    /**
     * Represents a quadrilateral location in the image
     */
    class Quadrilateral {
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
    class DriverLicenseDetailedInfo {
        constructor(nativeDriverLicenseDetailedInfo) {
            this.restrictions = nativeDriverLicenseDetailedInfo.restrictions;
            this.endorsements = nativeDriverLicenseDetailedInfo.endorsements;
            this.vehicleClass = nativeDriverLicenseDetailedInfo.vehicleClass;
            this.conditions = nativeDriverLicenseDetailedInfo.conditions;
        }
    }
    /** Represents the classification information. **/
    class ClassInfo {
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
    class ImageAnalysisResult {
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
    class BarcodeResult {
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
    class BarcodeElements {
        constructor(nativeBarcodeElements) {
            this.empty = nativeBarcodeElements.empty;
            this.values = nativeBarcodeElements.values;
        }
    }
    /** Defines the data extracted from the visual inspection zone */
    class VizResult {
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
    class MrzResult {
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
    class RecognitionModeFilter {
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
    class ImageExtensionFactors {
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

    /** Base class for all overlay settings objects */
    class OverlaySettings {
        constructor(overlaySettingsType) {
            this.overlaySettingsType = overlaySettingsType;
            this.useFrontCamera = false;
            this.enableBeep = false;
            this.language = null;
            this.country = null;
        }
    }

    /**
     * Class for setting up document overlay.
     * Document overlay is best suited for recognizers that perform ID document scanning.
     */
    class DocumentOverlaySettings extends OverlaySettings {
        constructor() {
            super('DocumentOverlaySettings');
        }
    }
    /**
     * Class for setting up BlinkId overlay.
     * BlinkId overlay is best suited for recognizers that perform ID document scanning.
     */
    class BlinkIdOverlaySettings extends OverlaySettings {
        constructor() {
            super('BlinkIdOverlaySettings');
            /**
            * String: message that is shown while scanning first side of the document.
            * If null, default value will be used.
            */
            this.firstSideInstructionsText = null;
            /**
            * String: instructions to flip document, shown when scanning of the first side is done, before scanning the second
            * side of the document.
            * If null, default value will be used.
            */
            this.flipInstructions = null;
            /**
            * String: instructions for the user to move the document closer.
            * If null, default value will be used.
            */
            this.errorMoveCloser = null;
            /**
            * String: instructions for the user to move the document farther.
            * If null, default value will be used.
            */
            this.errorMoveFarther = null;
            /**
            * String: title of the dialog, which is shown when scanned document sides are not from the same document.
            * If null, default value will be used.
            */
            this.sidesNotMatchingTitle = null;
            /**
            * String: message inside dialog, which is shown when scanned document sides are not from the same document.
            * If null, default value will be used.
            */
            this.sidesNotMatchingMessage = null;
            /**
            * String: title of the dialog, which is shown when unsupported document is scanned.
            * If null, default value will be used.
            */
            this.unsupportedDocumentTitle = null;
            /**
            * String: message inside dialog, which is shown when unsupported document is scanned.
            * If null, default value will be used.
            */
            this.unsupportedDocumentMessage = null;
            /**
            * String: title of the dialog, which is shown on timeout when scanning is stuck on the back document side.
            * If null, default value will be used.
            */
            this.recognitionTimeoutTitle = null;
            /**
            * String: message inside dialog, which is shown on timeout when scanning is stuck on the back document side.
            * If null, default value will be used.
            */
            this.recognitionTimeoutMessage = null;
            /**
            * String: text of the "retry" button inside dialog, which is shown on timeout when scanning is stuck on the back
            * document side.
            */
            this.retryButtonText = null;
            /**
             * If true, BlinkIdCombinedRecognizer will check if sides do match when scanning is finished
             * Default: true
             */
            this.requireDocumentSidesDataMatch = true;
            /**
             * Defines whether Document Not Supported dialog will be displayed in UI.
             *
             * Default: true
            */
            this.showNotSupportedDialog = true;
            /**
             * Defines whether glare warning will be displayed when user turn on a flashlight
             *
             * Default: true
            */
            this.showFlashlightWarning = true;
            /**
             * Option to configure back side scanning timeout.
             *
             * Default: 17000
            */
            this.backSideScanningTimeoutMilliseconds = 17000;
            /**
             * Message that is shown while scanning the barcode.
             * If null, default value will be used.
            */
            this.scanBarcodeText = null;
            /**
             * Instructions for the user to move the document from the edge.
             * If null, default value will be used.
            */
            this.errorDocumentTooCloseToEdge = null;
        }
    }
    /**
     * Class for setting up document verification overlay.
     * Document verification overlay is best suited for combined recognizers - recognizer that perform scanning of both sides of ID documents.
     */
    class DocumentVerificationOverlaySettings extends OverlaySettings {
        constructor() {
            super('DocumentVerificationOverlaySettings');
            /**
             * String: splash message that is shown before scanning the first side of the document, while starting camera.
             * If null, default value will be used.
             */
            this.firstSideSplashMessage = null;
            /**
             * String: splash message that is shown before scanning the second side of the document, while starting camera.
             * If null, default value will be used.
             */
            this.secondSideSplashMessage = null;
            /**
            * String: splash message that is shown after scanning the document.
            * If null, default value will be used.
            */
            this.scanningDoneSplashMessage = null;
            /**
             * String: user instructions that are shown above camera preview while the first side of the
             * document is being scanned.
             * If null, default value will be used.
             */
            this.firstSideInstructions = null;
            /**
             * String: user instructions that are shown above camera preview while the second side of the
             * document is being scanned.
             * If null, default value will be used.
             */
            this.secondSideInstructions = null;
            /**
             * String: glare message that is shown if glare was detected while scanning document.
             * If null, default value will be used.
             */
            this.glareMessage = null;
        }
    }

    /**
     * Result object for SuccessFrameGrabberRecognizer.
     */
    class SuccessFrameGrabberRecognizerResult extends RecognizerResult {
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
    class SuccessFrameGrabberRecognizer extends Recognizer {
        constructor(slaveRecognizer) {
            super('SuccessFrameGrabberRecognizer');
            this.slaveRecognizer = slaveRecognizer;
            if (this.slaveRecognizer instanceof Recognizer == false) {
                throw new Error("Slave recognizer must be Recognizer!");
            }
            this.createResultFromNative = (nativeResult) => { return new SuccessFrameGrabberRecognizerResult(nativeResult, this.slaveRecognizer.createResultFromNative(nativeResult.slaveRecognizerResult)); };
        }
    }

    /* tslint:disable:no-unused-variable */
    /**
     * Result object for BlinkIdCombinedRecognizer.
     */
    class BlinkIdCombinedRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * The additional address information of the document owner.
             */
            this.additionalAddressInformation = nativeResult.additionalAddressInformation;
            /**
             * The additional name information of the document owner.
             */
            this.additionalNameInformation = nativeResult.additionalNameInformation;
            /**
             * The address of the document owner.
             */
            this.address = nativeResult.address;
            /**
             * The current age of the document owner in years. It is calculated difference
             * between now and date of birth. Now is current time on the device.
             * @return current age of the document owner in years or -1 if date of birth is unknown.
             */
            this.age = nativeResult.age;
            /**
             * Defines possible color and moire statuses determined from scanned back image.
             */
            this.backImageAnalysisResult = nativeResult.backImageAnalysisResult;
            /**
             * Status of the last back side recognition process.
             */
            this.backProcessingStatus = nativeResult.backProcessingStatus;
            /**
             * Defines the data extracted from the back side visual inspection zone.
             */
            this.backVizResult = nativeResult.backVizResult;
            /**
             * Defines the data extracted from the barcode.
             */
            this.barcodeResult = nativeResult.barcodeResult;
            /**
             * The classification information.
             */
            this.classInfo = nativeResult.classInfo;
            /**
             * The date of birth of the document owner.
             */
            this.dateOfBirth = nativeResult.dateOfBirth != null ? new Date(nativeResult.dateOfBirth) : null;
            /**
             * The date of expiry of the document.
             */
            this.dateOfExpiry = nativeResult.dateOfExpiry != null ? new Date(nativeResult.dateOfExpiry) : null;
            /**
             * Determines if date of expiry is permanent.
             */
            this.dateOfExpiryPermanent = nativeResult.dateOfExpiryPermanent;
            /**
             * The date of issue of the document.
             */
            this.dateOfIssue = nativeResult.dateOfIssue != null ? new Date(nativeResult.dateOfIssue) : null;
            /**
             * Digital signature of the recognition result. Available only if enabled with signResult property.
             */
            this.digitalSignature = nativeResult.digitalSignature;
            /**
             * Version of the digital signature. Available only if enabled with signResult property.
             */
            this.digitalSignatureVersion = nativeResult.digitalSignatureVersion;
            /**
             * The additional number of the document.
             */
            this.documentAdditionalNumber = nativeResult.documentAdditionalNumber;
            /**
             * Returns DataMatchResultSuccess if data from scanned parts/sides of the document match,
             * DataMatchResultFailed otherwise. For example if date of expiry is scanned from the front and back side
             * of the document and values do not match, this method will return DataMatchResultFailed. Result will
             * be DataMatchResultSuccess only if scanned values for all fields that are compared are the same.
             */
            this.documentDataMatch = nativeResult.documentDataMatch;
            /**
             * The document number.
             */
            this.documentNumber = nativeResult.documentNumber;
            /**
             * The one more additional number of the document.
             */
            this.documentOptionalAdditionalNumber = nativeResult.documentOptionalAdditionalNumber;
            /**
             * The driver license detailed info.
             */
            this.driverLicenseDetailedInfo = nativeResult.driverLicenseDetailedInfo;
            /**
             * The employer of the document owner.
             */
            this.employer = nativeResult.employer;
            /**
             * Checks whether the document has expired or not by comparing the current
             * time on the device with the date of expiry.
             *
             * @return true if the document has expired, false in following cases:
             * document does not expire (date of expiry is permanent)
             * date of expiry has passed
             * date of expiry is unknown and it is not permanent
             */
            this.expired = nativeResult.expired;
            /**
             * face image from the document if enabled with returnFaceImage property.
             */
            this.faceImage = nativeResult.faceImage;
            /**
             * The first name of the document owner.
             */
            this.firstName = nativeResult.firstName;
            /**
             * Defines possible color and moire statuses determined from scanned front image.
             */
            this.frontImageAnalysisResult = nativeResult.frontImageAnalysisResult;
            /**
             * Status of the last front side recognition process.
             */
            this.frontProcessingStatus = nativeResult.frontProcessingStatus;
            /**
             * Defines the data extracted from the front side visual inspection zone.
             */
            this.frontVizResult = nativeResult.frontVizResult;
            /**
             * back side image of the document if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentBackImage = nativeResult.fullDocumentBackImage;
            /**
             * front side image of the document if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentFrontImage = nativeResult.fullDocumentFrontImage;
            /**
             * The full name of the document owner.
             */
            this.fullName = nativeResult.fullName;
            /**
             * The issuing authority of the document.
             */
            this.issuingAuthority = nativeResult.issuingAuthority;
            /**
             * The last name of the document owner.
             */
            this.lastName = nativeResult.lastName;
            /**
             * The localized name of the document owner.
             */
            this.localizedName = nativeResult.localizedName;
            /**
             * The marital status of the document owner.
             */
            this.maritalStatus = nativeResult.maritalStatus;
            /**
             * The data extracted from the machine readable zone
             */
            this.mrzResult = nativeResult.mrzResult != null ? new MrzResult(nativeResult.mrzResult) : null;
            /**
             * The nationality of the documet owner.
             */
            this.nationality = nativeResult.nationality;
            /**
             * The personal identification number.
             */
            this.personalIdNumber = nativeResult.personalIdNumber;
            /**
             * The place of birth of the document owner.
             */
            this.placeOfBirth = nativeResult.placeOfBirth;
            /**
             * Defines status of the last recognition process.
             */
            this.processingStatus = nativeResult.processingStatus;
            /**
             * The profession of the document owner.
             */
            this.profession = nativeResult.profession;
            /**
             * The race of the document owner.
             */
            this.race = nativeResult.race;
            /**
             * Recognition mode used to scan current document.
             */
            this.recognitionMode = nativeResult.recognitionMode;
            /**
             * The religion of the document owner.
             */
            this.religion = nativeResult.religion;
            /**
             * The residential stauts of the document owner.
             */
            this.residentialStatus = nativeResult.residentialStatus;
            /**
             * Returns true if recognizer has finished scanning first side and is now scanning back side,
             * false if it's still scanning first side.
             */
            this.scanningFirstSideDone = nativeResult.scanningFirstSideDone;
            /**
             * The sex of the document owner.
             */
            this.sex = nativeResult.sex;
            /**
             * image of the signature if enabled with returnSignatureImage property.
             */
            this.signatureImage = nativeResult.signatureImage;
        }
    }
    /**
     * Recognizer which can scan front and back side of the United States driver license.
     */
    class BlinkIdCombinedRecognizer extends Recognizer {
        constructor() {
            super('BlinkIdCombinedRecognizer');
            /**
             * Defines whether blured frames filtering is allowed
             *
             *
             */
            this.allowBlurFilter = true;
            /**
             * Proceed with scanning the back side even if the front side result is uncertain.
             * This only works for still images - video feeds will ignore this setting.
             *
             *
             */
            this.allowUncertainFrontSideScan = false;
            /**
             * Defines whether returning of unparsed MRZ (Machine Readable Zone) results is allowed
             *
             *
             */
            this.allowUnparsedMrzResults = false;
            /**
             * Defines whether returning unverified MRZ (Machine Readable Zone) results is allowed
             * Unverified MRZ is parsed, but check digits are incorrect
             *
             *
             */
            this.allowUnverifiedMrzResults = true;
            /**
             * Defines whether sensitive data should be removed from images, result fields or both.
             * The setting only applies to certain documents
             *
             *
             */
            this.anonymizationMode = 4 /* FullResult */;
            /**
             * Property for setting DPI for face images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.faceImageDpi = 250;
            /**
             * Property for setting DPI for full document images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.fullDocumentImageDpi = 250;
            /**
             * Image extension factors for full document image.
             *
             * @see ImageExtensionFactors
             *
             */
            this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
            /**
             * Configure the number of characters per field that are allowed to be inconsistent in data match.
             *
             *
             */
            this.maxAllowedMismatchesPerField = 0;
            /**
             * Pading is a minimum distance from the edge of the frame and is defined as a percentage of the frame width. Default value is 0.0f and in that case
             * padding edge and image edge are the same.
             * Recommended value is 0.02f.
             *
             *
             */
            this.paddingEdge = 0.0;
            /**
             * Enable or disable recognition of specific document groups supported by the current license.
             *
             *
             */
            this.recognitionModeFilter = new RecognitionModeFilter();
            /**
             * Sets whether face image from ID card should be extracted
             *
             *
             */
            this.returnFaceImage = false;
            /**
             * Sets whether full document image of ID card should be extracted.
             *
             *
             */
            this.returnFullDocumentImage = false;
            /**
             * Sets whether signature image from ID card should be extracted.
             *
             *
             */
            this.returnSignatureImage = false;
            /**
             * Configure the recognizer to only work on already cropped and dewarped images.
             * This only works for still images - video feeds will ignore this setting.
             *
             *
             */
            this.scanCroppedDocumentImage = false;
            /**
             * Whether or not recognition result should be signed.
             *
             *
             */
            this.signResult = false;
            /**
             * Property for setting DPI for signature images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.signatureImageDpi = 250;
            /**
             * Skip back side capture and processing step when back side of the document is not supported
             *
             *
             */
            this.skipUnsupportedBack = false;
            /**
             * Defines whether result characters validatation is performed.
             * If a result member contains invalid character, the result state cannot be valid
             *
             *
             */
            this.validateResultCharacters = true;
            this.createResultFromNative = (nativeResult) => { return new BlinkIdCombinedRecognizerResult(nativeResult); };
        }
    }

    /* tslint:disable:no-unused-variable */
    /**
     * Result object for BlinkIdRecognizer.
     */
    class BlinkIdRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * The additional address information of the document owner.
             */
            this.additionalAddressInformation = nativeResult.additionalAddressInformation;
            /**
             * The additional name information of the document owner.
             */
            this.additionalNameInformation = nativeResult.additionalNameInformation;
            /**
             * The address of the document owner.
             */
            this.address = nativeResult.address;
            /**
             * The current age of the document owner in years. It is calculated difference
             * between now and date of birth. Now is current time on the device.
             * @return current age of the document owner in years or -1 if date of birth is unknown.
             */
            this.age = nativeResult.age;
            /**
             * Defines the data extracted from the barcode.
             */
            this.barcodeResult = nativeResult.barcodeResult;
            /**
             * The classification information.
             */
            this.classInfo = nativeResult.classInfo;
            /**
             * The date of birth of the document owner.
             */
            this.dateOfBirth = nativeResult.dateOfBirth != null ? new Date(nativeResult.dateOfBirth) : null;
            /**
             * The date of expiry of the document.
             */
            this.dateOfExpiry = nativeResult.dateOfExpiry != null ? new Date(nativeResult.dateOfExpiry) : null;
            /**
             * Determines if date of expiry is permanent.
             */
            this.dateOfExpiryPermanent = nativeResult.dateOfExpiryPermanent;
            /**
             * The date of issue of the document.
             */
            this.dateOfIssue = nativeResult.dateOfIssue != null ? new Date(nativeResult.dateOfIssue) : null;
            /**
             * The additional number of the document.
             */
            this.documentAdditionalNumber = nativeResult.documentAdditionalNumber;
            /**
             * The document number.
             */
            this.documentNumber = nativeResult.documentNumber;
            /**
             * The one more additional number of the document.
             */
            this.documentOptionalAdditionalNumber = nativeResult.documentOptionalAdditionalNumber;
            /**
             * The driver license detailed info.
             */
            this.driverLicenseDetailedInfo = nativeResult.driverLicenseDetailedInfo;
            /**
             * The employer of the document owner.
             */
            this.employer = nativeResult.employer;
            /**
             * Checks whether the document has expired or not by comparing the current
             * time on the device with the date of expiry.
             *
             * @return true if the document has expired, false in following cases:
             * document does not expire (date of expiry is permanent)
             * date of expiry has passed
             * date of expiry is unknown and it is not permanent
             */
            this.expired = nativeResult.expired;
            /**
             * face image from the document if enabled with returnFaceImage property.
             */
            this.faceImage = nativeResult.faceImage;
            /**
             * The first name of the document owner.
             */
            this.firstName = nativeResult.firstName;
            /**
             * full document image if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentImage = nativeResult.fullDocumentImage;
            /**
             * The full name of the document owner.
             */
            this.fullName = nativeResult.fullName;
            /**
             * Defines possible color and moire statuses determined from scanned image.
             */
            this.imageAnalysisResult = nativeResult.imageAnalysisResult;
            /**
             * The issuing authority of the document.
             */
            this.issuingAuthority = nativeResult.issuingAuthority;
            /**
             * The last name of the document owner.
             */
            this.lastName = nativeResult.lastName;
            /**
             * The localized name of the document owner.
             */
            this.localizedName = nativeResult.localizedName;
            /**
             * The marital status of the document owner.
             */
            this.maritalStatus = nativeResult.maritalStatus;
            /**
             * The data extracted from the machine readable zone
             */
            this.mrzResult = nativeResult.mrzResult != null ? new MrzResult(nativeResult.mrzResult) : null;
            /**
             * The nationality of the documet owner.
             */
            this.nationality = nativeResult.nationality;
            /**
             * The personal identification number.
             */
            this.personalIdNumber = nativeResult.personalIdNumber;
            /**
             * The place of birth of the document owner.
             */
            this.placeOfBirth = nativeResult.placeOfBirth;
            /**
             * Defines status of the last recognition process.
             */
            this.processingStatus = nativeResult.processingStatus;
            /**
             * The profession of the document owner.
             */
            this.profession = nativeResult.profession;
            /**
             * The race of the document owner.
             */
            this.race = nativeResult.race;
            /**
             * Recognition mode used to scan current document.
             */
            this.recognitionMode = nativeResult.recognitionMode;
            /**
             * The religion of the document owner.
             */
            this.religion = nativeResult.religion;
            /**
             * The residential stauts of the document owner.
             */
            this.residentialStatus = nativeResult.residentialStatus;
            /**
             * The sex of the document owner.
             */
            this.sex = nativeResult.sex;
            /**
             * image of the signature if enabled with returnSignatureImage property.
             */
            this.signatureImage = nativeResult.signatureImage;
            /**
             * Defines the data extracted from the visual inspection zone
             */
            this.vizResult = nativeResult.vizResult;
        }
    }
    /**
     * The Blink ID Recognizer is used for scanning Blink ID.
     */
    class BlinkIdRecognizer extends Recognizer {
        constructor() {
            super('BlinkIdRecognizer');
            /**
             * Defines whether blured frames filtering is allowed
             *
             *
             */
            this.allowBlurFilter = true;
            /**
             * Defines whether returning of unparsed MRZ (Machine Readable Zone) results is allowed
             *
             *
             */
            this.allowUnparsedMrzResults = false;
            /**
             * Defines whether returning unverified MRZ (Machine Readable Zone) results is allowed
             * Unverified MRZ is parsed, but check digits are incorrect
             *
             *
             */
            this.allowUnverifiedMrzResults = true;
            /**
             * Defines whether sensitive data should be removed from images, result fields or both.
             * The setting only applies to certain documents
             *
             *
             */
            this.anonymizationMode = 4 /* FullResult */;
            /**
             * Property for setting DPI for face images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.faceImageDpi = 250;
            /**
             * Property for setting DPI for full document images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.fullDocumentImageDpi = 250;
            /**
             * Image extension factors for full document image.
             *
             * @see ImageExtensionFactors
             *
             */
            this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
            /**
             * Pading is a minimum distance from the edge of the frame and is defined as a percentage of the frame width. Default value is 0.0f and in that case
             * padding edge and image edge are the same.
             * Recommended value is 0.02f.
             *
             *
             */
            this.paddingEdge = 0.0;
            /**
             * Enable or disable recognition of specific document groups supported by the current license.
             *
             *
             */
            this.recognitionModeFilter = new RecognitionModeFilter();
            /**
             * Sets whether face image from ID card should be extracted
             *
             *
             */
            this.returnFaceImage = false;
            /**
             * Sets whether full document image of ID card should be extracted.
             *
             *
             */
            this.returnFullDocumentImage = false;
            /**
             * Sets whether signature image from ID card should be extracted.
             *
             *
             */
            this.returnSignatureImage = false;
            /**
             * Configure the recognizer to only work on already cropped and dewarped images.
             * This only works for still images - video feeds will ignore this setting.
             *
             *
             */
            this.scanCroppedDocumentImage = false;
            /**
             * Property for setting DPI for signature images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.signatureImageDpi = 250;
            /**
             * Defines whether result characters validatation is performed.
             * If a result member contains invalid character, the result state cannot be valid
             *
             *
             */
            this.validateResultCharacters = true;
            this.createResultFromNative = (nativeResult) => { return new BlinkIdRecognizerResult(nativeResult); };
        }
    }

    /* tslint:disable:no-unused-variable */
    /**
     * Result object for DocumentFaceRecognizer.
     */
    class DocumentFaceRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * Quadrangle represeting corner points of the document within the input image.
             */
            this.documentLocation = nativeResult.documentLocation != null ? new Quadrilateral(nativeResult.documentLocation) : null;
            /**
             * face image from the document if enabled with returnFaceImage property.
             */
            this.faceImage = nativeResult.faceImage;
            /**
             * Quadrangle represeting corner points of the face image within the input image.
             */
            this.faceLocation = nativeResult.faceLocation != null ? new Quadrilateral(nativeResult.faceLocation) : null;
            /**
             * full document image if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentImage = nativeResult.fullDocumentImage;
        }
    }
    /**
     * Class for configuring Document Face Recognizer Recognizer.
     *
     * Document Face Recognizer recognizer is used for scanning documents containing face images.
     */
    class DocumentFaceRecognizer extends Recognizer {
        constructor() {
            super('DocumentFaceRecognizer');
            /**
             * Type of docment this recognizer will scan.
             *
             *
             */
            this.detectorType = 1 /* TD1 */;
            /**
             * Property for setting DPI for face images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.faceImageDpi = 250;
            /**
             * Property for setting DPI for full document images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.fullDocumentImageDpi = 250;
            /**
             * Image extension factors for full document image.
             *
             * @see ImageExtensionFactors
             *
             */
            this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
            /**
             * Defines how many times the same document should be detected before the detector
             * returns this document as a result of the deteciton
             *
             * Higher number means more reliable detection, but slower processing
             *
             *
             */
            this.numStableDetectionsThreshold = 6;
            /**
             * Sets whether face image from ID card should be extracted
             *
             *
             */
            this.returnFaceImage = false;
            /**
             * Sets whether full document image of ID card should be extracted.
             *
             *
             */
            this.returnFullDocumentImage = false;
            this.createResultFromNative = (nativeResult) => { return new DocumentFaceRecognizerResult(nativeResult); };
        }
    }

    /* tslint:disable:no-unused-variable */
    /**
     * Result object for IdBarcodeRecognizer.
     */
    class IdBarcodeRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * The additional name information of the document owner.
             */
            this.additionalNameInformation = nativeResult.additionalNameInformation;
            /**
             * The address of the document owner.
             */
            this.address = nativeResult.address;
            /**
             * The current age of the document owner in years. It is calculated difference
             * between now and date of birth. Now is current time on the device.
             * @return current age of the document owner in years or -1 if date of birth is unknown.
             */
            this.age = nativeResult.age;
            /**
             * Type of the barcode scanned
             *
             *  @return Type of the barcode
             */
            this.barcodeType = nativeResult.barcodeType;
            /**
             * The city address portion of the document owner.
             */
            this.city = nativeResult.city;
            /**
             * The date of birth of the document owner.
             */
            this.dateOfBirth = nativeResult.dateOfBirth != null ? new Date(nativeResult.dateOfBirth) : null;
            /**
             * The date of expiry of the document.
             */
            this.dateOfExpiry = nativeResult.dateOfExpiry != null ? new Date(nativeResult.dateOfExpiry) : null;
            /**
             * The date of issue of the document.
             */
            this.dateOfIssue = nativeResult.dateOfIssue != null ? new Date(nativeResult.dateOfIssue) : null;
            /**
             * The additional number of the document.
             */
            this.documentAdditionalNumber = nativeResult.documentAdditionalNumber;
            /**
             * The document number.
             */
            this.documentNumber = nativeResult.documentNumber;
            /**
             * The document type deduced from the recognized barcode
             *
             *  @return Type of the document
             */
            this.documentType = nativeResult.documentType;
            /**
             * The employer of the document owner.
             */
            this.employer = nativeResult.employer;
            /**
             * The additional privileges granted to the driver license owner.
             */
            this.endorsements = nativeResult.endorsements;
            /**
             * Checks whether the document has expired or not by comparing the current
             * time on the device with the date of expiry.
             *
             * @return true if the document has expired, false in following cases:
             * document does not expire (date of expiry is permanent)
             * date of expiry has passed
             * date of expiry is unknown and it is not permanent
             */
            this.expired = nativeResult.expired;
            /**
             * Document specific extended elements that contain all barcode fields in their original form.
             *
             * Currently this is only filled for AAMVACompliant documents.
             */
            this.extendedElements = nativeResult.extendedElements;
            /**
             * The first name of the document owner.
             */
            this.firstName = nativeResult.firstName;
            /**
             * The full name of the document owner.
             */
            this.fullName = nativeResult.fullName;
            /**
             * The issuing authority of the document.
             */
            this.issuingAuthority = nativeResult.issuingAuthority;
            /**
             * The jurisdiction code address portion of the document owner.
             */
            this.jurisdiction = nativeResult.jurisdiction;
            /**
             * The last name of the document owner.
             */
            this.lastName = nativeResult.lastName;
            /**
             * The marital status of the document owner.
             */
            this.maritalStatus = nativeResult.maritalStatus;
            /**
             * The middle name of the document owner.
             */
            this.middleName = nativeResult.middleName;
            /**
             * The nationality of the documet owner.
             */
            this.nationality = nativeResult.nationality;
            /**
             * The personal identification number.
             */
            this.personalIdNumber = nativeResult.personalIdNumber;
            /**
             * The place of birth of the document owner.
             */
            this.placeOfBirth = nativeResult.placeOfBirth;
            /**
             * The postal code address portion of the document owner.
             */
            this.postalCode = nativeResult.postalCode;
            /**
             * The profession of the document owner.
             */
            this.profession = nativeResult.profession;
            /**
             * The race of the document owner.
             */
            this.race = nativeResult.race;
            /**
             * Byte array with result of the scan
             */
            this.rawData = nativeResult.rawData;
            /**
             * The religion of the document owner.
             */
            this.religion = nativeResult.religion;
            /**
             * The residential stauts of the document owner.
             */
            this.residentialStatus = nativeResult.residentialStatus;
            /**
             * The restrictions to driving privileges for the driver license owner.
             */
            this.restrictions = nativeResult.restrictions;
            /**
             * The sex of the document owner.
             */
            this.sex = nativeResult.sex;
            /**
             * The street address portion of the document owner.
             */
            this.street = nativeResult.street;
            /**
             * Retrieves string content of scanned data
             */
            this.stringData = nativeResult.stringData;
            /**
             * Flag indicating uncertain scanning data
             * E.g obtained from damaged barcode.
             */
            this.uncertain = nativeResult.uncertain;
            /**
             * The type of vehicle the driver license owner has privilege to drive.
             */
            this.vehicleClass = nativeResult.vehicleClass;
        }
    }
    /**
     * The ID Barcode Recognizer is used for scanning ID Barcode.
     */
    class IdBarcodeRecognizer extends Recognizer {
        constructor() {
            super('IdBarcodeRecognizer');
            this.createResultFromNative = (nativeResult) => { return new IdBarcodeRecognizerResult(nativeResult); };
        }
    }

    /* tslint:disable:no-unused-variable */
    /**
     * Result object for MrtdCombinedRecognizer.
     */
    class MrtdCombinedRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * Digital signature of the recognition result. Available only if enabled with signResult property.
             */
            this.digitalSignature = nativeResult.digitalSignature;
            /**
             * Version of the digital signature. Available only if enabled with signResult property.
             */
            this.digitalSignatureVersion = nativeResult.digitalSignatureVersion;
            /**
             * Returns DataMatchResultSuccess if data from scanned parts/sides of the document match,
             * DataMatchResultFailed otherwise. For example if date of expiry is scanned from the front and back side
             * of the document and values do not match, this method will return DataMatchResultFailed. Result will
             * be DataMatchResultSuccess only if scanned values for all fields that are compared are the same.
             */
            this.documentDataMatch = nativeResult.documentDataMatch;
            /**
             * face image from the document if enabled with returnFaceImage property.
             */
            this.faceImage = nativeResult.faceImage;
            /**
             * back side image of the document if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentBackImage = nativeResult.fullDocumentBackImage;
            /**
             * front side image of the document if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentFrontImage = nativeResult.fullDocumentFrontImage;
            /**
             * Returns the Data extracted from the machine readable zone.
             */
            this.mrzResult = nativeResult.mrzResult != null ? new MrzResult(nativeResult.mrzResult) : null;
            /**
             * Returns true if recognizer has finished scanning first side and is now scanning back side,
             * false if it's still scanning first side.
             */
            this.scanningFirstSideDone = nativeResult.scanningFirstSideDone;
        }
    }
    /**
     * MRTD Combined recognizer
     *
     * MRTD Combined recognizer is used for scanning both front and back side of generic IDs.
     */
    class MrtdCombinedRecognizer extends Recognizer {
        constructor() {
            super('MrtdCombinedRecognizer');
            /**
             * Whether special characters are allowed
             *
             *
             */
            this.allowSpecialCharacters = false;
            /**
             * Whether returning of unparsed results is allowed
             *
             *
             */
            this.allowUnparsedResults = false;
            /**
             * Whether returning of unverified results is allowed
             * Unverified result is result that is parsed, but check digits are incorrect.
             *
             *
             */
            this.allowUnverifiedResults = false;
            /**
             * Type of document this recognizer will scan.
             *
             *
             */
            this.detectorType = 1 /* TD1 */;
            /**
             * Property for setting DPI for face images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.faceImageDpi = 250;
            /**
             * Property for setting DPI for full document images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.fullDocumentImageDpi = 250;
            /**
             * Image extension factors for full document image.
             *
             * @see ImageExtensionFactors
             *
             */
            this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
            /**
             * Defines how many times the same document should be detected before the detector
             * returns this document as a result of the deteciton
             *
             * Higher number means more reliable detection, but slower processing
             *
             *
             */
            this.numStableDetectionsThreshold = 6;
            /**
             * Sets whether face image from ID card should be extracted
             *
             *
             */
            this.returnFaceImage = false;
            /**
             * Sets whether full document image of ID card should be extracted.
             *
             *
             */
            this.returnFullDocumentImage = false;
            /**
             * Whether or not recognition result should be signed.
             *
             *
             */
            this.signResult = false;
            this.createResultFromNative = (nativeResult) => { return new MrtdCombinedRecognizerResult(nativeResult); };
        }
    }

    /* tslint:disable:no-unused-variable */
    /**
     * Result object for MrtdRecognizer.
     */
    class MrtdRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * full document image if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentImage = nativeResult.fullDocumentImage;
            /**
             * Returns the Data extracted from the machine readable zone.
             */
            this.mrzResult = nativeResult.mrzResult != null ? new MrzResult(nativeResult.mrzResult) : null;
        }
    }
    /**
     * Recognizer that can recognizer Machine Readable Zone (MRZ) of the Machine Readable Travel Document (MRTD)
     */
    class MrtdRecognizer extends Recognizer {
        constructor() {
            super('MrtdRecognizer');
            /**
             * Whether special characters are allowed
             *
             *
             */
            this.allowSpecialCharacters = false;
            /**
             * Whether returning of unparsed results is allowed
             *
             *
             */
            this.allowUnparsedResults = false;
            /**
             * Whether returning of unverified results is allowed
             * Unverified result is result that is parsed, but check digits are incorrect.
             *
             *
             */
            this.allowUnverifiedResults = false;
            /**
             * Defines if glare detection should be turned on/off.
             *
             *
             */
            this.detectGlare = true;
            /**
             * Property for setting DPI for full document images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.fullDocumentImageDpi = 250;
            /**
             * Image extension factors for full document image.
             *
             * @see ImageExtensionFactors
             *
             */
            this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
            /**
             * Sets whether full document image of ID card should be extracted.
             *
             *
             */
            this.returnFullDocumentImage = false;
            this.createResultFromNative = (nativeResult) => { return new MrtdRecognizerResult(nativeResult); };
        }
    }

    /* tslint:disable:no-unused-variable */
    /**
     * Result object for PassportRecognizer.
     */
    class PassportRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * Digital signature of the recognition result. Available only if enabled with signResult property.
             */
            this.digitalSignature = nativeResult.digitalSignature;
            /**
             * Version of the digital signature. Available only if enabled with signResult property.
             */
            this.digitalSignatureVersion = nativeResult.digitalSignatureVersion;
            /**
             * face image from the document if enabled with returnFaceImage property.
             */
            this.faceImage = nativeResult.faceImage;
            /**
             * full document image if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentImage = nativeResult.fullDocumentImage;
            /**
             * The data extracted from the machine readable zone.
             */
            this.mrzResult = nativeResult.mrzResult != null ? new MrzResult(nativeResult.mrzResult) : null;
        }
    }
    /**
     * Recognizer which can scan all passports with MRZ.
     */
    class PassportRecognizer extends Recognizer {
        constructor() {
            super('PassportRecognizer');
            /**
             * Defines whether to anonymize Netherlands MRZ
             *
             *
             */
            this.anonymizeNetherlandsMrz = true;
            /**
             * Defines if glare detection should be turned on/off.
             *
             *
             */
            this.detectGlare = true;
            /**
             * Property for setting DPI for face images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.faceImageDpi = 250;
            /**
             * Property for setting DPI for full document images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.fullDocumentImageDpi = 250;
            /**
             * Image extension factors for full document image.
             *
             * @see ImageExtensionFactors
             *
             */
            this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
            /**
             * Sets whether face image from ID card should be extracted
             *
             *
             */
            this.returnFaceImage = false;
            /**
             * Sets whether full document image of ID card should be extracted.
             *
             *
             */
            this.returnFullDocumentImage = false;
            /**
             * Whether or not recognition result should be signed.
             *
             *
             */
            this.signResult = false;
            this.createResultFromNative = (nativeResult) => { return new PassportRecognizerResult(nativeResult); };
        }
    }

    /* tslint:disable:no-unused-variable */
    /**
     * Result object for VisaRecognizer.
     */
    class VisaRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * face image from the document if enabled with returnFaceImage property.
             */
            this.faceImage = nativeResult.faceImage;
            /**
             * full document image if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentImage = nativeResult.fullDocumentImage;
            /**
             * The data extracted from the machine readable zone.
             */
            this.mrzResult = nativeResult.mrzResult != null ? new MrzResult(nativeResult.mrzResult) : null;
        }
    }
    /**
     * Recognizer which can scan all visas with MRZ.
     */
    class VisaRecognizer extends Recognizer {
        constructor() {
            super('VisaRecognizer');
            /**
             * Defines if glare detection should be turned on/off.
             *
             *
             */
            this.detectGlare = true;
            /**
             * Property for setting DPI for face images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.faceImageDpi = 250;
            /**
             * Property for setting DPI for full document images
             * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
             *
             *
             */
            this.fullDocumentImageDpi = 250;
            /**
             * Image extension factors for full document image.
             *
             * @see ImageExtensionFactors
             *
             */
            this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
            /**
             * Sets whether face image from ID card should be extracted
             *
             *
             */
            this.returnFaceImage = false;
            /**
             * Sets whether full document image of ID card should be extracted.
             *
             *
             */
            this.returnFullDocumentImage = false;
            this.createResultFromNative = (nativeResult) => { return new VisaRecognizerResult(nativeResult); };
        }
    }

    /**
     * Result object for UsdlRecognizer.
     */
    class UsdlRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            this.optionalElements = nativeResult.optionalElements;
            this.rawData = nativeResult.rawData;
            this.rawStringData = nativeResult.rawStringData;
            this.uncertain = nativeResult.uncertain;
            this.fields = nativeResult.fields;
            this.firstName = nativeResult.firstName;
            this.middleName = nativeResult.middleName;
            this.lastName = nativeResult.lastName;
            this.fullName = nativeResult.fullName;
            this.nameSuffix = nativeResult.nameSuffix;
            this.address = nativeResult.address;
            this.documentNumber = nativeResult.documentNumber;
            this.sex = nativeResult.sex;
            this.restrictions = nativeResult.restrictions;
            this.endorsements = nativeResult.endorsements;
            this.vehicleClass = nativeResult.vehicleClass;
            this.dateOfBirth = nativeResult.dateOfBirth != null ? new Date(nativeResult.dateOfBirth) : null;
            this.dateOfIssue = nativeResult.dateOfIssue != null ? new Date(nativeResult.dateOfIssue) : null;
            this.dateOfExpiry = nativeResult.dateOfExpiry != null ? new Date(nativeResult.dateOfExpiry) : null;
            this.age = nativeResult.age;
            this.street = nativeResult.street;
            this.postalCode = nativeResult.postalCode;
            this.city = nativeResult.city;
            this.jurisdiction = nativeResult.jurisdiction;
        }
    }
    /**
     * Recognizer that scan 2D barcodes from United States Driver License.
     */
    class UsdlRecognizer extends Recognizer {
        constructor() {
            super('UsdlRecognizer');
            this.createResultFromNative = (nativeResult) => { return new UsdlRecognizerResult(nativeResult); };
            this.nullQuietZoneAllowed = true;
            this.uncertainDecoding = true;
            this.enableCompactParser = false;
        }
    }

    /**
     * Result object for UsdlCombinedRecognizer.
     */
    class UsdlCombinedRecognizerResult extends RecognizerResult {
        constructor(nativeResult) {
            super(nativeResult.resultState);
            /**
             * Digital signature of the recognition result. Available only if enabled with signResult property.
             */
            this.digitalSignature = nativeResult.digitalSignature;
            /**
             * Version of the digital signature. Available only if enabled with signResult property.
             */
            this.digitalSignatureVersion = nativeResult.digitalSignatureVersion;
            /**
             * Returns true if data from scanned parts/sides of the document match,
             * false otherwise. For example if date of expiry is scanned from the front and back side
             * of the document and values do not match, this method will return false. Result will
             * be true only if scanned values for all fields that are compared are the same.
             */
            this.documentDataMatch = nativeResult.documentDataMatch;
            /**
             * face image from the document if enabled with returnFaceImage property.
             */
            this.faceImage = nativeResult.faceImage;
            /**
             * full document image if enabled with returnFullDocumentImage property.
             */
            this.fullDocumentImage = nativeResult.fullDocumentImage;
            /**
             * Returns true if recognizer has finished scanning first side and is now scanning back side,
             * false if it's still scanning first side.
             */
            this.scanningFirstSideDone = nativeResult.scanningFirstSideDone;
            /** Array of elements that are not part of AAMVA standard and are specific to each US state. */
            this.optionalElements = nativeResult.optionalElements;
            /** The raw bytes contained inside 2D barcode. */
            this.rawData = nativeResult.rawData;
            /** Raw string inside 2D barcode. */
            this.rawStringData = nativeResult.rawStringData;
            /** True if returned result is uncertain, i.e. if scanned barcode was incomplete (i.e. */
            this.uncertain = nativeResult.uncertain;
            /** Fields inside US Driver's licence. Available Keys are listed in UsdlKeys enum. */
            this.fields = nativeResult.fields;
            /** The first name of the United States driver license owner. */
            this.firstName = nativeResult.firstName;
            /** The middle name of the United States driver license owner. */
            this.middleName = nativeResult.middleName;
            /** The last name of the United States driver license owner. */
            this.lastName = nativeResult.lastName;
            /** The full name of the United States driver license owner. */
            this.fullName = nativeResult.fullName;
            /** The name suffix of the United States driver license owner. */
            this.nameSuffix = nativeResult.nameSuffix;
            /** The full address of the United States driver license owner. */
            this.address = nativeResult.address;
            /** The document number of the United States driver license. */
            this.documentNumber = nativeResult.documentNumber;
            /** The sex of the United States driver license owner. */
            this.sex = nativeResult.sex;
            /** The restrictions to driving privileges for the United States driver license owner. */
            this.restrictions = nativeResult.restrictions;
            /** The additional privileges granted to the United States driver license owner. */
            this.endorsements = nativeResult.endorsements;
            /** The type of vehicle the driver license owner has privilege to drive. */
            this.vehicleClass = nativeResult.vehicleClass;
            /** The date of birth of the United States driver license owner. */
            this.dateOfBirth = nativeResult.dateOfBirth != null ? new Date(nativeResult.dateOfBirth) : null;
            /** The date of issue of the United States driver license. */
            this.dateOfIssue = nativeResult.dateOfIssue != null ? new Date(nativeResult.dateOfIssue) : null;
            /** The date of expiry of the United States driver license. */
            this.dateOfExpiry = nativeResult.dateOfExpiry != null ? new Date(nativeResult.dateOfExpiry) : null;
            /**
             * The current age of the document owner in years. It is calculated difference
             * between now and date of birth. Now is current time on the device.
             * @return current age of the document owner in years or -1 if date of birth is unknown.
            */
            this.age = nativeResult.age;
        }
    }
    /**
     * USDL Combined Recognizer.
     *
     * USDL Combined recognizer is used for scanning both front and back side of US Driver's License.
     */
    class UsdlCombinedRecognizer extends Recognizer {
        constructor() {
            super('UsdlCombinedRecognizer');
            this.createResultFromNative = (nativeResult) => { return new UsdlCombinedRecognizerResult(nativeResult); };
            this.faceImageDpi = 250;
            this.fullDocumentImageDpi = 250;
            this.returnFaceImage = false;
            this.returnFullDocumentImage = false;
            this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
            this.numStableDetectionsThreshold = 6;
            this.signResult = false;
        }
    }

    exports.BarcodeElements = BarcodeElements;
    exports.BarcodeResult = BarcodeResult;
    exports.BlinkIDPlugin = BlinkIDPlugin;
    exports.BlinkIdCombinedRecognizer = BlinkIdCombinedRecognizer;
    exports.BlinkIdCombinedRecognizerResult = BlinkIdCombinedRecognizerResult;
    exports.BlinkIdOverlaySettings = BlinkIdOverlaySettings;
    exports.BlinkIdRecognizer = BlinkIdRecognizer;
    exports.BlinkIdRecognizerResult = BlinkIdRecognizerResult;
    exports.ClassInfo = ClassInfo;
    exports.Date = Date;
    exports.DocumentFaceRecognizer = DocumentFaceRecognizer;
    exports.DocumentFaceRecognizerResult = DocumentFaceRecognizerResult;
    exports.DocumentOverlaySettings = DocumentOverlaySettings;
    exports.DocumentVerificationOverlaySettings = DocumentVerificationOverlaySettings;
    exports.DriverLicenseDetailedInfo = DriverLicenseDetailedInfo;
    exports.IdBarcodeRecognizer = IdBarcodeRecognizer;
    exports.IdBarcodeRecognizerResult = IdBarcodeRecognizerResult;
    exports.ImageAnalysisResult = ImageAnalysisResult;
    exports.ImageExtensionFactors = ImageExtensionFactors;
    exports.MrtdCombinedRecognizer = MrtdCombinedRecognizer;
    exports.MrtdCombinedRecognizerResult = MrtdCombinedRecognizerResult;
    exports.MrtdRecognizer = MrtdRecognizer;
    exports.MrtdRecognizerResult = MrtdRecognizerResult;
    exports.MrzResult = MrzResult;
    exports.OverlaySettings = OverlaySettings;
    exports.PassportRecognizer = PassportRecognizer;
    exports.PassportRecognizerResult = PassportRecognizerResult;
    exports.Point = Point;
    exports.Quadrilateral = Quadrilateral;
    exports.RecognitionModeFilter = RecognitionModeFilter;
    exports.Recognizer = Recognizer;
    exports.RecognizerCollection = RecognizerCollection;
    exports.RecognizerResult = RecognizerResult;
    exports.SuccessFrameGrabberRecognizer = SuccessFrameGrabberRecognizer;
    exports.SuccessFrameGrabberRecognizerResult = SuccessFrameGrabberRecognizerResult;
    exports.UsdlCombinedRecognizer = UsdlCombinedRecognizer;
    exports.UsdlCombinedRecognizerResult = UsdlCombinedRecognizerResult;
    exports.UsdlRecognizer = UsdlRecognizer;
    exports.UsdlRecognizerResult = UsdlRecognizerResult;
    exports.VisaRecognizer = VisaRecognizer;
    exports.VisaRecognizerResult = VisaRecognizerResult;
    exports.VizResult = VizResult;

    return exports;

}({}, capacitorExports));
//# sourceMappingURL=plugin.js.map
