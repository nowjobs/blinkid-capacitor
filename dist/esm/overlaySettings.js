/** Base class for all overlay settings objects */
export class OverlaySettings {
    constructor(overlaySettingsType) {
        this.overlaySettingsType = overlaySettingsType;
        this.useFrontCamera = false;
        this.enableBeep = false;
        this.language = null;
        this.country = null;
    }
}
//# sourceMappingURL=overlaySettings.js.map