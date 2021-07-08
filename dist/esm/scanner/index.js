var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Plugins } from '@capacitor/core';
const { BlinkIDCapacitorPlugin } = Plugins;
export var ScanningStatus;
(function (ScanningStatus) {
    ScanningStatus[ScanningStatus["cancelled"] = 0] = "cancelled";
    ScanningStatus[ScanningStatus["succeeded"] = 1] = "succeeded";
})(ScanningStatus || (ScanningStatus = {}));
export class BlinkIDPlugin {
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
//# sourceMappingURL=index.js.map