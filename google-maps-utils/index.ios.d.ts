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
    static fromNative(nativeHeatmap: GMUHeatmapTileLayer): HeatmapTileProvider;
    get native(): GMUHeatmapTileLayer;
    set opacity(opacity: number);
    setGradient(gradients: IGradient[]): void;
    set radius(radius: number);
    set maxIntensity(maxIntensity: number);
    setData(coordinates: Coordinate[]): void;
    getTile(x: number, y: number, z: number): UIImage;
}
export declare class ClusterItem {
    #private;
    constructor(options: MarkerOptions);
    get native(): GMSMarker;
    get ios(): GMSMarker;
}
export declare class ClusterRenderer {
    #private;
    constructor(map: GoogleMap, clusterManager: ClusterManager);
    get native(): GMUClusterRenderer;
}
export declare class ClusterManager implements Partial<IClusterManager> {
    #private;
    static fromNative(nativeClusterManager: GMUClusterManager): ClusterManager;
    get native(): GMUClusterManager;
    get ios(): GMUClusterManager;
    setRenderer(renderer: any): void;
    addItem(clusterItem: ClusterItem): void;
    addItems(clusterItems: ClusterItem[]): void;
    removeItem(clusterItem: ClusterItem): void;
    removeItems(clusterItems: ClusterItem[]): void;
    clearItems(): void;
    cluster(): void;
}
export declare class GeometryStyle implements IGeometryStyle {
    #private;
    geometryStyles: Partial<IGeometryStyle>;
    constructor(geometryStyles: Partial<IGeometryStyle>);
    strokeColor: Color;
    fillColor: Color;
    width: number;
    scale: number;
    heading: number;
    anchor: [number, number];
    iconUrl: string;
    title: string;
    get native(): GMUStyle;
}
export declare class GeoJsonLayer implements IGeoJsonLayer {
    #private;
    style: GeometryStyle;
    static fromNative(nativeGeoJsonLayer: GMUGeometryRenderer): GeoJsonLayer;
    get native(): GMUGeometryRenderer;
    get ios(): GMUGeometryRenderer;
    get features(): any;
    addLayerToMap(): void;
    removeLayerFromMap(): void;
}
export declare class GeoJsonFeature implements IFeature {
    #private;
    static fromNative(nativeGeometryContainer: GMUGeometryCollection): GeoJsonFeature;
    get native(): GMUGeometryCollection;
    get ios(): GMUGeometryCollection;
    get geometry(): any[];
    get properties(): void;
    get id(): string;
}
export declare class Geometry implements IGeometry {
    #private;
    static fromNative(nativeGeometry: GMUGeometry): Geometry;
    get native(): GMUGeometry;
    get ios(): GMUGeometry;
    get type(): string;
    get geometries(): GMUGeometry;
}
