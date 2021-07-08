import { Recognizer, RecognizerResult } from '../recognizer';
import { Date } from '../types';
/**
 * Result object for UsdlRecognizer.
 */
export class UsdlRecognizerResult extends RecognizerResult {
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
export class UsdlRecognizer extends Recognizer {
    constructor() {
        super('UsdlRecognizer');
        this.createResultFromNative = (nativeResult) => { return new UsdlRecognizerResult(nativeResult); };
        this.nullQuietZoneAllowed = true;
        this.uncertainDecoding = true;
        this.enableCompactParser = false;
    }
}
//# sourceMappingURL=usdlRecognizer.js.map