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
var _GeoJsonLayer_native, _KmlLayer_native, _GeoJsonFeature_native, _GeoJsonFeature_style, _KMLPlacemarkFeature_native, _KMLPlacemarkFeature_style, _Geometry_native;
import { Color } from '@nativescript/core';
import { intoNativeColor } from '../../../google-maps-utils/utils';
export class DataLayer {
    // setMap(map: com.google.android.gms.maps.GoogleMap) {
    // 	this.native.setMap(map);
    // }
    // getDefaultPolygonStyle() {
    // 	return this.native.getDefaultPolygonStyle();
    // }
    addLayerToMap() {
        this.native.addLayerToMap();
    }
    // isLayerOnMap(): boolean {
    // 	return this.native.isLayerOnMap();
    // }
    removeLayerFromMap() {
        this.native.removeLayerFromMap();
    }
    // hasFeatures(): boolean {
    // 	return this.native.hasFeatures();
    // }
    // getFeature(feature: any) {
    // 	return this.native.getFeature(feature);
    // }
    // getFeatures(): any {
    // 	return this.native.getFeatures();
    // }
    // addFeature(feature: com.google.maps.android.data.geojson.GeoJsonFeature) {
    // 	return this.native.addFeature(feature);
    // }
    // removeFeature(feature: com.google.maps.android.data.geojson.GeoJsonFeature) {
    // 	this.native.removeFeature(feature);
    // }
    get android() {
        return this.native;
    }
}
export class KmlGeometryStyle {
    constructor(getPolygonOptions, getPolylineOptions, kerOptions) {
        this.getPolygonOptions = getPolygonOptions;
        this.getPolylineOptions = getPolylineOptions;
        this.kerOptions = kerOptions;
    }
    get strokeColor() {
        return intoNativeColor(this.getPolygonOptions.getStrokeColor().toString());
    }
}
export class GeoJsonGeometryStyle {
    constructor(polygonStyle, lineStyle, pointStyle) {
        this.polygonStyle = polygonStyle;
        this.lineStyle = lineStyle;
        this.pointStyle = pointStyle;
    }
    get strokeColor() {
        return new Color(this.polygonStyle.getStrokeColor());
    }
    set strokeColor(color) {
        this.polygonStyle.setStrokeColor(color.android);
        this.lineStyle.setColor(color.android);
    }
    get fillColor() {
        return new Color(this.polygonStyle.getFillColor());
    }
    set fillColor(color) {
        this.polygonStyle.setFillColor(color.android);
    }
    get width() {
        return this.lineStyle.getWidth();
    }
    set width(width) {
        this.lineStyle.setWidth(width);
        this.polygonStyle.setStrokeWidth(width);
    }
    get title() {
        return this.pointStyle.getTitle();
    }
    set title(title) {
        this.pointStyle.setTitle(title);
    }
    get heading() {
        return this.pointStyle.getRotation();
    }
    set heading(rotation) {
        // Marker roation or rotation???
        this.pointStyle.setRotation(rotation);
        // this.pointStyle.setMarkerRotation(rotation);
    }
}
export class GeoJsonLayer extends DataLayer {
    constructor(map, geoJson, geometryStyle) {
        super();
        _GeoJsonLayer_native.set(this, void 0);
        if (map && geoJson) {
            try {
                const geoJsonData = new org.json.JSONObject(JSON.stringify(geoJson));
                __classPrivateFieldSet(this, _GeoJsonLayer_native, new com.google.maps.android.data.geojson.GeoJsonLayer(map.native, geoJsonData), "f");
                this.style = new GeoJsonGeometryStyle(__classPrivateFieldGet(this, _GeoJsonLayer_native, "f").getDefaultPolygonStyle(), __classPrivateFieldGet(this, _GeoJsonLayer_native, "f").getDefaultLineStringStyle(), __classPrivateFieldGet(this, _GeoJsonLayer_native, "f").getDefaultPointStyle());
                if (geometryStyle) {
                    for (const key of Object.keys(geometryStyle)) {
                        if (geometryStyle?.[key]) {
                            this.style[key] = geometryStyle?.[key];
                        }
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    static fromNative(nativeGeoJsonLayer) {
        if (nativeGeoJsonLayer instanceof com.google.maps.android.data.geojson.GeoJsonLayer) {
            const geoJsonLayer = new GeoJsonLayer(null, null);
            __classPrivateFieldSet(geoJsonLayer, _GeoJsonLayer_native, nativeGeoJsonLayer, "f");
            return geoJsonLayer;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _GeoJsonLayer_native, "f");
    }
    get features() {
        const features = [];
        const nativeFeatures = this.native.getFeatures();
        const iter = nativeFeatures.iterator();
        while (iter.hasNext()) {
            const feature = iter.next();
            features.push(GeoJsonFeature.fromNative(feature));
        }
        return features;
    }
}
_GeoJsonLayer_native = new WeakMap();
export class KmlLayer extends DataLayer {
    constructor(mapView, kml) {
        super();
        _KmlLayer_native.set(this, void 0);
        if (mapView && kml) {
            __classPrivateFieldSet(this, _KmlLayer_native, new com.google.maps.android.data.kml.KmlLayer(), "f");
            __classPrivateFieldGet(this, _KmlLayer_native, "f").addLayerToMap();
            __classPrivateFieldGet(this, _KmlLayer_native, "f").addKMLToMap();
        }
    }
    get native() {
        return __classPrivateFieldGet(this, _KmlLayer_native, "f");
    }
    hasPlacemarks() {
        return this.native.hasPlacemarks();
    }
    getPlacemarks() {
        return this.native.getPlacemarks();
    }
    getGroundOverlays() {
        return this.native.getGroundOverlays();
    }
}
_KmlLayer_native = new WeakMap();
class BaseFeature {
    get android() {
        return this.native;
    }
    get geometry() {
        return Geometry.fromNative(this.native.getGeometry());
    }
    get id() {
        return this.native.getId();
    }
    get properties() {
        const props = {};
        const iter = this.native.getPropertyKeys().iterator();
        while (iter.hasNext()) {
            const key = iter.next();
            props[key] = this.native.getProperty(key);
        }
        return props;
    }
    set properties(value) {
        Object.entries(value).forEach(([key, value]) => {
            this.native.setProperty(key, value);
        });
    }
}
export class GeoJsonFeature extends BaseFeature {
    constructor() {
        super();
        _GeoJsonFeature_native.set(this, void 0);
        _GeoJsonFeature_style.set(this, void 0);
    }
    static fromNative(nativeFeature) {
        if (nativeFeature instanceof com.google.maps.android.data.geojson.GeoJsonFeature) {
            const feature = new GeoJsonFeature();
            __classPrivateFieldSet(feature, _GeoJsonFeature_native, nativeFeature, "f");
            return feature;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _GeoJsonFeature_native, "f");
    }
    get style() {
        __classPrivateFieldSet(this, _GeoJsonFeature_style, new GeoJsonGeometryStyle(this.native.getPolygonStyle(), this.native.getLineStringStyle(), this.native.getPointStyle()), "f");
        return __classPrivateFieldGet(this, _GeoJsonFeature_style, "f");
    }
}
_GeoJsonFeature_native = new WeakMap(), _GeoJsonFeature_style = new WeakMap();
export class KMLPlacemarkFeature extends BaseFeature {
    constructor() {
        super();
        _KMLPlacemarkFeature_native.set(this, void 0);
        _KMLPlacemarkFeature_style.set(this, void 0);
    }
    static fromNative(nativeFeature) {
        if (nativeFeature instanceof com.google.maps.android.data.kml.KmlPlacemark) {
            const feature = new KMLPlacemarkFeature();
            __classPrivateFieldSet(feature, _KMLPlacemarkFeature_native, nativeFeature, "f");
            return feature;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _KMLPlacemarkFeature_native, "f");
    }
    get style() {
        // this.#style = new KmlGeometryStyle(this.native.getPolygonOptions(), this.native.getPolylineOptions(), this.native.getMarkerOptions());
        return __classPrivateFieldGet(this, _KMLPlacemarkFeature_style, "f");
    }
}
_KMLPlacemarkFeature_native = new WeakMap(), _KMLPlacemarkFeature_style = new WeakMap();
export class Geometry {
    constructor() {
        _Geometry_native.set(this, void 0);
    }
    static fromNative(nativeGeometry) {
        if (nativeGeometry instanceof com.google.maps.android.data.Geometry) {
            const geometry = new Geometry();
            __classPrivateFieldSet(geometry, _Geometry_native, nativeGeometry, "f");
            return geometry;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _Geometry_native, "f");
    }
    get android() {
        return this.native;
    }
    get type() {
        return this.native.getGeometryType();
    }
    get geometries() {
        return this.native.getGeometryObject();
    }
}
_Geometry_native = new WeakMap();
//# sourceMappingURL=index.android.js.map