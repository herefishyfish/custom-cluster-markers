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
var _GeometryStyle_native, _GeoJsonLayer_native, _GeoJsonLayer_parser, _GeoJsonFeature_native, _Geometry_native;
import { encoding } from '@nativescript/core';
let UNIQUE_STYLE_ID = 0;
export class GeometryStyle {
    constructor(geometryStyles) {
        this.geometryStyles = geometryStyles;
        _GeometryStyle_native.set(this, void 0);
        Object.assign(this, geometryStyles);
        __classPrivateFieldSet(this, _GeometryStyle_native, new GMUStyle({
            styleID: `google-maps-utils-style-${UNIQUE_STYLE_ID++}`,
            strokeColor: this.strokeColor?.ios ?? null,
            fillColor: this.fillColor?.ios ?? null,
            width: this.width ?? 1,
            scale: this.scale ?? 0,
            heading: this.heading ?? 0,
            anchor: CGPointMake(this.anchor?.[0] ?? 0, this.anchor?.[1] ?? 0),
            iconUrl: this.iconUrl ?? null,
            title: this.title ?? null,
            hasFill: !!this.fillColor,
            hasStroke: !!this.strokeColor,
        }), "f");
    }
    get native() {
        return __classPrivateFieldGet(this, _GeometryStyle_native, "f");
    }
}
_GeometryStyle_native = new WeakMap();
export class GeoJsonLayer {
    constructor(map, geometries, styles) {
        this.map = map;
        this.geometries = geometries;
        this.styles = styles;
        _GeoJsonLayer_native.set(this, void 0);
        _GeoJsonLayer_parser.set(this, void 0);
        this.style = new GeometryStyle(styles);
        const jsonString = new NSString({ UTF8String: JSON.stringify(geometries) });
        __classPrivateFieldSet(this, _GeoJsonLayer_parser, new GMUGeoJSONParser({ data: jsonString.dataUsingEncoding(encoding.UTF_8) }), "f");
        __classPrivateFieldGet(this, _GeoJsonLayer_parser, "f").parse();
        const features = __classPrivateFieldGet(this, _GeoJsonLayer_parser, "f").features;
        for (const feature of features) {
            feature.style = this.style.native;
        }
        __classPrivateFieldSet(this, _GeoJsonLayer_native, new GMUGeometryRenderer({ map: this.map.native, geometries: features }), "f");
    }
    static fromNative(nativeGeoJsonLayer) {
        if (nativeGeoJsonLayer instanceof GMUGeometryRenderer) {
            const geoJsonLayer = new GeoJsonLayer(null, null, null);
            __classPrivateFieldSet(geoJsonLayer, _GeoJsonLayer_native, nativeGeoJsonLayer, "f");
            return geoJsonLayer;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _GeoJsonLayer_native, "f");
    }
    get ios() {
        return this.native;
    }
    get features() {
        // const features = [];
        // for (const feature of this.#parser.features) {
        // 	const f = feature as GMUGeometryContainer;
        // 	GeoJsonFeature.fromNative(f);
        // 	f.geometry;
        // 	f.style;
        // }
        return null;
    }
    addLayerToMap() {
        this.native.render();
    }
    removeLayerFromMap() {
        this.native.clear();
    }
}
_GeoJsonLayer_native = new WeakMap(), _GeoJsonLayer_parser = new WeakMap();
export class GeoJsonFeature {
    constructor() {
        _GeoJsonFeature_native.set(this, void 0);
    }
    static fromNative(nativeGeometryContainer) {
        if (nativeGeometryContainer instanceof GMUGeometryCollection) {
            const geoJsonFeature = new GeoJsonFeature();
            __classPrivateFieldSet(geoJsonFeature, _GeoJsonFeature_native, nativeGeometryContainer, "f");
            return geoJsonFeature;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _GeoJsonFeature_native, "f");
    }
    get ios() {
        return __classPrivateFieldGet(this, _GeoJsonFeature_native, "f");
    }
    get geometry() {
        const geometries = [];
        for (const geometry of this.native.geometries) {
            geometries.push(Geometry.fromNative(geometry));
        }
        return geometries;
    }
    get properties() {
        return;
    }
    get id() {
        return this.native.description;
    }
}
_GeoJsonFeature_native = new WeakMap();
export class Geometry {
    constructor() {
        _Geometry_native.set(this, void 0);
    }
    static fromNative(nativeGeometry) {
        if (nativeGeometry) {
            console.log(nativeGeometry.class().name);
            const geometry = new Geometry();
            __classPrivateFieldSet(geometry, _Geometry_native, nativeGeometry, "f");
            return geometry;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _Geometry_native, "f");
    }
    get ios() {
        return __classPrivateFieldGet(this, _Geometry_native, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _Geometry_native, "f").type;
    }
    get geometries() {
        return this.native;
    }
}
_Geometry_native = new WeakMap();
//# sourceMappingURL=index.ios.js.map