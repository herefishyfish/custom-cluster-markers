import { Color } from '@nativescript/core';
import { GeoJSON } from 'geojson';
import { Coordinate, GoogleMap, ITileProvider, MarkerOptions } from '@nativescript/google-maps';
import { HeatmapOptions, IClusterManager, IFeature, IGeoJsonLayer, IGeometry, IGeometryStyle, IGradient, IHeatmapTileProvider } from '.';
export * from './utils';
export declare function overrideGoogleMap(): void;
export declare function installMixins(): void;
export declare class GoogleMapUtils {
    clusterManager(markers: MarkerOptions[]): ClusterManager;
    addGeoJson(geoJson: GeoJSON, styleOptions: IGeometryStyle): GeoJsonLayer;
    removeGeoJson(geoJson: GeoJsonLayer): void;
}
export declare class HeatmapTileProvider implements ITileProvider, IHeatmapTileProvider {
    #private;
    constructor(options?: HeatmapOptions);
    static fromNative(nativeHeatmap: com.google.maps.android.heatmaps.HeatmapTileProvider): HeatmapTileProvider;
    get native(): com.google.maps.android.heatmaps.HeatmapTileProvider;
    set opacity(opacity: number);
    setGradient(gradients: IGradient[]): void;
    set radius(radius: number);
    set maxIntensity(maxIntensity: number);
    setData(coordinates: Coordinate[]): void;
    getTile(x: number, y: number, z: number): com.google.android.gms.maps.model.Tile;
}
export declare class ClusterItem extends com.google.maps.android.clustering.ClusterItem {
    options: MarkerOptions;
    constructor(options: MarkerOptions);
}
export declare class ClusterRenderer extends com.google.maps.android.clustering.view.DefaultClusterRenderer<any> {
    constructor(map: GoogleMap, clusterManager: ClusterManager);
    onBeforeClusterItemRendered(item: ClusterItem, opts: com.google.android.gms.maps.model.MarkerOptions): void;
}
export declare class ClusterManager implements IClusterManager {
    #private;
    static fromNative(nativeClusterManager: com.google.maps.android.clustering.ClusterManager<any>): ClusterManager;
    private setListeners;
    get native(): com.google.maps.android.clustering.ClusterManager<com.google.maps.android.clustering.ClusterItem>;
    get android(): com.google.maps.android.clustering.ClusterManager<com.google.maps.android.clustering.ClusterItem>;
    setRenderer(renderer: ClusterRenderer): void;
    addItem(clusterItem: ClusterItem): void;
    addItems(clusterItems: ClusterItem[]): void;
    removeItem(clusterItem: ClusterItem): void;
    removeItems(clusterItems: ClusterItem[]): void;
    clearItems(): void;
    cluster(): void;
}
/**
 * EXPERIMENTAL - DO NOT USE
 */
export declare abstract class DataLayer<T extends com.google.maps.android.data.Layer> {
    abstract readonly native: T;
    addLayerToMap(): void;
    removeLayerFromMap(): void;
    get android(): T;
}
export declare class GeoJsonGeometryStyle implements Partial<IGeometryStyle> {
    private polygonStyle;
    private lineStyle;
    private pointStyle;
    constructor(polygonStyle: com.google.maps.android.data.geojson.GeoJsonPolygonStyle, lineStyle: com.google.maps.android.data.geojson.GeoJsonLineStringStyle, pointStyle: com.google.maps.android.data.geojson.GeoJsonPointStyle);
    get strokeColor(): Color;
    set strokeColor(color: Color);
    get fillColor(): Color;
    set fillColor(color: Color);
    get width(): number;
    set width(width: number);
    get title(): string;
    set title(title: string);
    get heading(): number;
    set heading(rotation: number);
}
declare abstract class BaseFeature<T extends com.google.maps.android.data.Feature> implements IFeature {
    abstract style: any;
    abstract readonly native: T;
    get android(): T;
    get geometry(): Geometry<com.google.maps.android.data.Geometry<any>>;
    get id(): string;
    get properties(): any;
    set properties(value: any);
}
export declare class GeoJsonFeature extends BaseFeature<com.google.maps.android.data.geojson.GeoJsonFeature> {
    #private;
    constructor();
    static fromNative(nativeFeature: com.google.maps.android.data.geojson.GeoJsonFeature): GeoJsonFeature;
    get native(): com.google.maps.android.data.geojson.GeoJsonFeature;
    get style(): GeoJsonGeometryStyle;
}
export declare class Geometry<T = any> implements IGeometry {
    #private;
    static fromNative(nativeGeometry: com.google.maps.android.data.Geometry<any>): Geometry<com.google.maps.android.data.Geometry<any>>;
    get native(): com.google.maps.android.data.Geometry<T>;
    get android(): com.google.maps.android.data.Geometry<T>;
    get type(): string;
    get geometries(): T;
}
export declare class GeoJsonLayer extends DataLayer<com.google.maps.android.data.geojson.GeoJsonLayer> implements IGeoJsonLayer {
    #private;
    style: GeoJsonGeometryStyle;
    static fromNative(nativeGeoJsonLayer: com.google.maps.android.data.geojson.GeoJsonLayer): GeoJsonLayer;
    get native(): com.google.maps.android.data.geojson.GeoJsonLayer;
    get features(): GeoJsonFeature[];
}
