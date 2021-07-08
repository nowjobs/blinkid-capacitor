import { RecognizerCollection } from '../recognizer';
import { OverlaySettings } from '../overlaySettings';
export interface License {
    ios: string;
    android: string;
    showTrialLicenseWarning: boolean;
}
export declare enum ScanningStatus {
    cancelled = 0,
    succeeded = 1
}
export declare class BlinkIDPlugin implements BlinkIDPluginInterface {
    scanWithCamera(overlaySettings: OverlaySettings, recognizerCollection: RecognizerCollection, license: License): Promise<any>;
}
export interface BlinkIDPluginInterface {
    scanWithCamera(overlaySettings: OverlaySettings, recognizerCollection: RecognizerCollection, license: License): Promise<any>;
}
