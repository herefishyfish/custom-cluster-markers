var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IconFactory_native;
import { Utils } from '@nativescript/core';
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
    constructor() {
        _IconFactory_native.set(this, void 0);
        __classPrivateFieldSet(this, _IconFactory_native, new com.google.maps.android.ui.IconGenerator(Utils.ad.getApplicationContext()), "f");
    }
    get native() {
        return __classPrivateFieldGet(this, _IconFactory_native, "f");
    }
    get android() {
        return this.native;
    }
    set backgroundAsset(value) {
        this.native.setBackground(value);
    }
    set color(color) {
        __classPrivateFieldGet(this, _IconFactory_native, "f").setColor(color.android);
    }
    set rotation(rotation) {
        __classPrivateFieldGet(this, _IconFactory_native, "f").setRotation(rotation);
    }
    set contentRotation(rotation) {
        __classPrivateFieldGet(this, _IconFactory_native, "f").setContentRotation(rotation);
    }
    setStyle(style) {
        __classPrivateFieldGet(this, _IconFactory_native, "f").setStyle(style);
    }
    setTextAppearance(appearance) {
        __classPrivateFieldGet(this, _IconFactory_native, "f").setTextAppearance(appearance);
    }
    makeIcon(text) {
        return __classPrivateFieldGet(this, _IconFactory_native, "f").makeIcon(text);
    }
}
_IconFactory_native = new WeakMap();
//# sourceMappingURL=index.android.js.map