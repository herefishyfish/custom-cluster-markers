import { Color } from '@nativescript/core';
export var ICON_STYLE;
(function (ICON_STYLE) {
    ICON_STYLE[ICON_STYLE["STYLE_DEFAULT"] = 1] = "STYLE_DEFAULT";
    ICON_STYLE[ICON_STYLE["STYLE_WHITE"] = 2] = "STYLE_WHITE";
    ICON_STYLE[ICON_STYLE["STYLE_RED"] = 3] = "STYLE_RED";
    ICON_STYLE[ICON_STYLE["STYLE_BLUE"] = 4] = "STYLE_BLUE";
    ICON_STYLE[ICON_STYLE["STYLE_GREEN"] = 5] = "STYLE_GREEN";
    ICON_STYLE[ICON_STYLE["STYLE_ORANGE"] = 7] = "STYLE_ORANGE";
    ICON_STYLE[ICON_STYLE["STYLE_PURPLE"] = 6] = "STYLE_PURPLE";
})(ICON_STYLE || (ICON_STYLE = {}));
export class IconFactory {
    // Not provided in iOS google-maps-util library. Need to roll our own impl.
    setStyle(style) {
        console.error('Method not implemented.');
    }
    makeIcon(text) {
        console.error('Method not implemented.');
        return GMSMarker.markerImageWithColor(new Color('red').ios);
    }
    setTextAppearance(style) {
        console.error('Method not implemented.');
    }
}
//# sourceMappingURL=index.ios.js.map