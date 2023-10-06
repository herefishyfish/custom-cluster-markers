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
var _HeatmapTileProvider_native, _ClusterItem_native, _ClusterRenderer_native, _ClusterManager_native, _GeometryStyle_native, _GeoJsonLayer_native, _GeoJsonFeature_native, _Geometry_native;
import { encoding } from '@nativescript/core';
import { intoNativeClusterManager, intoNativeHeatmapGradient, intoNativeHeatmapProvider } from '.';
import { intoNativeMarkerOptions } from '@nativescript/google-maps/utils';
import { applyMixins } from './utils/common';
// export * from './experimental/datalayer';
// export * from './experimental/iconfactory';
export * from './utils';
let UNIQUE_STYLE_ID = 0;
let mixinInstalled = false;
export function overrideGoogleMap() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const GMap = require('@nativescript/google-maps').GoogleMap;
    applyMixins(GMap, [GoogleMapUtils], { after: true });
}
export function installMixins() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        overrideGoogleMap();
    }
}
export class GoogleMapUtils {
    clusterManager(markers) {
        const clusterManager = ClusterManager.fromNative(intoNativeClusterManager(this));
        const clusters = markers.map((marker) => new ClusterItem(marker));
        clusterManager.addItems(clusters);
        clusterManager.cluster();
        return clusterManager;
    }
    addGeoJson(geoJson, styleOptions) {
        if (this && geoJson) {
            const style = new GeometryStyle(styleOptions);
            const jsonString = new NSString({ UTF8String: JSON.stringify(geoJson) });
            const parser = new GMUGeoJSONParser({ data: jsonString.dataUsingEncoding(encoding.UTF_8) });
            parser.parse();
            const features = parser.features;
            for (const feature of features) {
                feature.style = style.native;
            }
            const renderer = new GMUGeometryRenderer({ map: this.native, geometries: features });
            const layer = GeoJsonLayer.fromNative(renderer);
            layer.addLayerToMap();
            return layer;
        }
        return null;
    }
    removeGeoJson(geoJson) {
        if (geoJson) {
            geoJson.removeLayerFromMap();
        }
    }
}
export class HeatmapTileProvider {
    constructor(options) {
        _HeatmapTileProvider_native.set(this, void 0);
        __classPrivateFieldSet(this, _HeatmapTileProvider_native, intoNativeHeatmapProvider(options), "f");
    }
    static fromNative(nativeHeatmap) {
        if (nativeHeatmap instanceof GMUHeatmapTileLayer) {
            const heatmapTileProvider = new HeatmapTileProvider();
            __classPrivateFieldSet(heatmapTileProvider, _HeatmapTileProvider_native, nativeHeatmap, "f");
            return heatmapTileProvider;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _HeatmapTileProvider_native, "f");
    }
    set opacity(opacity) {
        this.native.opacity = opacity;
    }
    setGradient(gradients) {
        this.native.gradient = intoNativeHeatmapGradient(gradients);
    }
    set radius(radius) {
        this.native.radius = radius;
    }
    set maxIntensity(maxIntensity) {
        this.native.maximumZoomIntensity = maxIntensity;
    }
    setData(coordinates) {
        this.native.weightedData = coordinates.map((coordinate) => {
            return GMUWeightedLatLng.alloc().initWithCoordinateIntensity(CLLocationCoordinate2DMake(coordinate.lat, coordinate.lng), 1.0);
        });
    }
    getTile(x, y, z) {
        return this.native.tileForXYZoom(x, y, z);
    }
}
_HeatmapTileProvider_native = new WeakMap();
export class ClusterItem {
    constructor(options) {
        _ClusterItem_native.set(this, void 0);
        __classPrivateFieldSet(this, _ClusterItem_native, intoNativeMarkerOptions(options), "f");
    }
    get native() {
        return __classPrivateFieldGet(this, _ClusterItem_native, "f");
    }
    get ios() {
        return this.native;
    }
}
_ClusterItem_native = new WeakMap();
export class ClusterRenderer {
    constructor(map, clusterManager) {
        _ClusterRenderer_native.set(this, void 0);
        const iconGenerator = GMUDefaultClusterIconGenerator.alloc().init();
        __classPrivateFieldSet(this, _ClusterRenderer_native, GMUDefaultClusterRenderer.alloc().initWithMapViewClusterIconGenerator(map.native, iconGenerator), "f");
    }
    get native() {
        return __classPrivateFieldGet(this, _ClusterRenderer_native, "f");
    }
}
_ClusterRenderer_native = new WeakMap();
export class ClusterManager {
    constructor() {
        _ClusterManager_native.set(this, void 0);
    }
    static fromNative(nativeClusterManager) {
        if (nativeClusterManager instanceof GMUClusterManager) {
            const clusterManager = new ClusterManager();
            __classPrivateFieldSet(clusterManager, _ClusterManager_native, nativeClusterManager, "f");
            return clusterManager;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _ClusterManager_native, "f");
    }
    get ios() {
        return __classPrivateFieldGet(this, _ClusterManager_native, "f");
    }
    setRenderer(renderer) {
        // TODO;
    }
    addItem(clusterItem) {
        this.native.addItem(clusterItem.native);
    }
    addItems(clusterItems) {
        this.native.addItems(clusterItems.map((item) => item.native));
    }
    removeItem(clusterItem) {
        this.native.removeItem(clusterItem.native);
    }
    removeItems(clusterItems) {
        clusterItems.forEach((item) => {
            this.native.removeItem(item.native);
        });
    }
    clearItems() {
        this.native.clearItems();
    }
    cluster() {
        this.native.cluster();
    }
}
_ClusterManager_native = new WeakMap();
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
    constructor() {
        _GeoJsonLayer_native.set(this, void 0);
    }
    // constructor(private map: GoogleMap, private geometries: any, private styles?: Partial<IGeometryStyle>) {
    // 	this.style = new GeometryStyle(styles);
    // 	const jsonString = new NSString({ UTF8String: JSON.stringify(geometries) });
    // 	this.#parser = new GMUGeoJSONParser({ data: jsonString.dataUsingEncoding(encoding.UTF_8) });
    // 	this.#parser.parse();
    // 	const features = this.#parser.features;
    // 	for (const feature of features) {
    // 		feature.style = this.style.native;
    // 	}
    // 	this.#native = new GMUGeometryRenderer({ map: this.map.native, geometries: features });
    // }
    static fromNative(nativeGeoJsonLayer) {
        if (nativeGeoJsonLayer instanceof GMUGeometryRenderer) {
            const geoJsonLayer = new GeoJsonLayer();
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
_GeoJsonLayer_native = new WeakMap();
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