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
var _HeatmapTileProvider_native, _ClusterManager_native, _GeoJsonFeature_native, _GeoJsonFeature_style, _Geometry_native, _GeoJsonLayer_native;
import { Color, ImageSource, Utils } from '@nativescript/core';
import { hueFromColor } from '@nativescript/google-maps/utils';
import { applyMixins } from './utils/common';
import { intoNativeClusterManager, intoNativeColor, intoNativeHeatmapGradient, intoNativeHeatmapProvider } from './utils';
// export * from './experimental/datalayer';
// export * from './experimental/iconfactory';
export * from './utils';
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
        const GMap = this;
        const clusterManager = ClusterManager.fromNative(intoNativeClusterManager(GMap));
        const renderer = new ClusterRenderer(GMap, clusterManager);
        clusterManager.setRenderer(renderer);
        const clusters = markers.map((marker) => new ClusterItem(marker));
        clusterManager.addItems(clusters);
        clusterManager.cluster();
        return clusterManager;
    }
    addGeoJson(geoJson, styleOptions) {
        if (this && geoJson) {
            const geoJsonData = new org.json.JSONObject(JSON.stringify(geoJson));
            const native = new com.google.maps.android.data.geojson.GeoJsonLayer(this.native, geoJsonData);
            const style = new GeoJsonGeometryStyle(native.getDefaultPolygonStyle(), native.getDefaultLineStringStyle(), native.getDefaultPointStyle());
            if (styleOptions) {
                for (const key of Object.keys(styleOptions)) {
                    if (styleOptions?.[key]) {
                        style[key] = styleOptions?.[key];
                    }
                }
            }
            native.addLayerToMap();
            return GeoJsonLayer.fromNative(native);
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
        if (options) {
            __classPrivateFieldSet(this, _HeatmapTileProvider_native, intoNativeHeatmapProvider(options), "f");
        }
    }
    static fromNative(nativeHeatmap) {
        if (nativeHeatmap instanceof com.google.maps.android.heatmaps.HeatmapTileProvider) {
            const heatmap = new HeatmapTileProvider();
            __classPrivateFieldSet(heatmap, _HeatmapTileProvider_native, nativeHeatmap, "f");
            return heatmap;
        }
        return null;
    }
    get native() {
        return __classPrivateFieldGet(this, _HeatmapTileProvider_native, "f");
    }
    set opacity(opacity) {
        this.native.setOpacity(opacity);
    }
    setGradient(gradients) {
        this.native.setGradient(intoNativeHeatmapGradient(gradients));
    }
    set radius(radius) {
        this.native.setRadius(radius);
    }
    set maxIntensity(maxIntensity) {
        this.native.setMaxIntensity(maxIntensity);
    }
    setData(coordinates) {
        const data = new java.util.ArrayList();
        coordinates.forEach((coordinate) => {
            data.add(new com.google.android.gms.maps.model.LatLng(coordinate.lat, coordinate.lng));
        });
        this.native.setData(data);
    }
    getTile(x, y, z) {
        return this.native.getTile(x, y, z);
    }
}
_HeatmapTileProvider_native = new WeakMap();
export class ClusterItem extends com.google.maps.android.clustering.ClusterItem {
    constructor(options) {
        super({
            getPosition: () => {
                return new com.google.android.gms.maps.model.LatLng(options?.position?.lat ?? 0, options?.position?.lng ?? 0);
            },
            getSnippet: () => {
                return this.options?.snippet ?? '';
            },
            getTitle: () => {
                return this.options?.title ?? '';
            },
            getZIndex: () => {
                return java.lang.Float.valueOf(this.options?.zIndex ?? 0);
            }
        });
        this.options = options;
    }
}
export class ClusterRenderer extends com.google.maps.android.clustering.view.DefaultClusterRenderer {
    constructor(map, clusterManager) {
        super(Utils.ad.getApplicationContext(), map.native, clusterManager.native);
    }
    onBeforeClusterItemRendered(item, opts) {
        super.onBeforeClusterItemRendered(item, opts);
        if (typeof item.options?.draggable === 'boolean') {
            opts.draggable(item.options.draggable);
        }
        if (typeof item.options?.anchorU === 'number' || typeof item.options?.anchorV === 'number') {
            const anchorU = item.options?.anchorU ?? opts.getAnchorU();
            const anchorV = item.options?.anchorV ?? opts?.getAnchorV();
            opts.anchor(anchorU, anchorV);
        }
        if (item.options?.position) {
            opts.position(new com.google.android.gms.maps.model.LatLng(item.options.position.lat, item.options.position.lng));
        }
        if (item.options?.title) {
            opts.title(item.options.title);
        }
        if (item.options?.snippet) {
            opts.snippet(item.options.snippet);
        }
        if (item.options?.icon) {
            if (item.options?.icon instanceof android.graphics.Bitmap) {
                const desc = com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(item.options.icon);
                opts.icon(desc);
            }
            else if (item.options?.icon instanceof ImageSource) {
                const desc = com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(item.options.icon.android);
                opts.icon(desc);
            }
        }
        const color = intoNativeColor(item.options.color);
        if (color !== null) {
            opts.icon(com.google.android.gms.maps.model.BitmapDescriptorFactory.defaultMarker(hueFromColor(color)));
        }
        if (typeof item.options?.rotation === 'number') {
            opts.rotation(item.options.rotation);
        }
        if (typeof item.options?.flat === 'boolean') {
            opts.flat(item.options.flat);
        }
        if (typeof item.options?.zIndex === 'number') {
            opts.zIndex(item.options.zIndex);
        }
    }
}
export class ClusterManager {
    constructor() {
        _ClusterManager_native.set(this, void 0);
    }
    static fromNative(nativeClusterManager) {
        if (nativeClusterManager instanceof com.google.maps.android.clustering.ClusterManager) {
            const clusterManager = new ClusterManager();
            __classPrivateFieldSet(clusterManager, _ClusterManager_native, nativeClusterManager, "f");
            return clusterManager;
        }
        return null;
    }
    setListeners() {
        __classPrivateFieldGet(this, _ClusterManager_native, "f").setOnClusterClickListener(new com.google.maps.android.clustering.ClusterManager.OnClusterClickListener({
            onClusterClick: (cluster) => {
                return false;
            },
        }));
    }
    get native() {
        return __classPrivateFieldGet(this, _ClusterManager_native, "f");
    }
    get android() {
        return this.native;
    }
    setRenderer(renderer) {
        this.native.setRenderer(renderer);
    }
    addItem(clusterItem) {
        this.native.addItem(clusterItem);
    }
    addItems(clusterItems) {
        const clusterItemArray = new java.util.ArrayList();
        for (const clusterItem of clusterItems) {
            clusterItemArray.add(clusterItem);
        }
        this.native.addItems(clusterItemArray);
    }
    removeItem(clusterItem) {
        this.native.removeItem(clusterItem);
    }
    removeItems(clusterItems) {
        this.native.removeItems(clusterItems);
    }
    clearItems() {
        this.native.clearItems();
    }
    cluster() {
        this.native.cluster();
    }
}
_ClusterManager_native = new WeakMap();
/**
 * EXPERIMENTAL - DO NOT USE
 */
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
export class GeoJsonLayer extends DataLayer {
    constructor() {
        super(...arguments);
        _GeoJsonLayer_native.set(this, void 0);
        // get bounds(): CoordinateBounds {
        // 	const bounds = this.#native.getBoundingBox();
        // 	if (bounds) {
        // 		return {
        // 			southwest: {
        // 				lat: bounds?.southwest?.latitude,
        // 				lng: bounds?.southwest?.longitude,
        // 			},
        // 			northeast: {
        // 				lat: bounds?.northeast?.latitude,
        // 				lng: bounds?.northeast?.longitude,
        // 			},
        // 		};
        // 	}
        // }
        // toString() {
        // 	return this.native.toString();
        // }
    }
    static fromNative(nativeGeoJsonLayer) {
        if (nativeGeoJsonLayer instanceof com.google.maps.android.data.geojson.GeoJsonLayer) {
            const geoJsonLayer = new GeoJsonLayer();
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
//# sourceMappingURL=index.android.js.map