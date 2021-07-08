/**
 * Base class for all recognizers.
 * Recognizer is object that performs recognition of image
 * and updates its result with data extracted from the image.
 */
export class Recognizer {
    constructor(recognizerType) {
        this.recognizerType = recognizerType;
    }
}
/**
 * Base class for all recognizer's result objects.
 * Recoginzer result contains data extracted from the image.
 */
export class RecognizerResult {
    constructor(resultState) {
        this.resultState = resultState;
    }
}
/**
 * Represents a collection of recognizer objects.
 * @param recognizerArray Array of recognizer objects that will be used for recognition. Must not be empty!
 */
export class RecognizerCollection {
    constructor(recognizerArray) {
        this.recognizerArray = recognizerArray;
        this.allowMultipleResults = false;
        this.milisecondsBeforeTimeout = 10000;
    }
}
//# sourceMappingURL=recognizer.js.map