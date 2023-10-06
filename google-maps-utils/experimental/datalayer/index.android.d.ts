import { Color } from '@nativescript/core';
import { GoogleMap } from '@nativescript/google-maps';
import { IGeometryStyle, IGeoJsonLayer, IFeature, IGeometry } from '.';
export declare abstract class DataLayer<T extends com.google.maps.android.data.Layer> {
    abstract readonly native: T;
    addLayerToMap(): void;
    removeLayerFromMap(): void;
    get android(): T;
}
export declare class KmlGeometryStyle implements IGeometryStyle {
    getPolygonOptions: com.google.android.gms.maps.model.PolygonOptions;
    getPolylineOptions: com.google.android.gms.maps.model.PolylineOptions;
    kerOptions: com.google.android.gms.maps.model.MarkerOptions;
    constructor(getPolygonOptions: com.google.android.gms.maps.model.PolygonOptions, getPolylineOptions: com.google.android.gms.maps.model.PolylineOptions, kerOptions: com.google.android.gms.maps.model.MarkerOptions);
    get strokeColor(): Color;
    fillColor: Color;
    width: number;
    scale: number;
    heading: number;
    anchor: [number, number];
    iconUrl: string;
    title: string;
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
export declare class GeoJsonLayer extends DataLayer<com.google.maps.android.data.geojson.GeoJsonLayer> implements IGeoJsonLayer {
    #private;
    style: GeoJsonGeometryStyle;
    constructor(map: GoogleMap, geoJson: any, geometryStyle?: IGeometryStyle);
    static fromNative(nativeGeoJsonLayer: com.google.maps.android.data.geojson.GeoJsonLayer): GeoJsonLayer;
    get native(): com.google.maps.android.data.geojson.GeoJsonLayer;
    get features(): GeoJsonFeature[];
}
export declare class KmlLayer extends DataLayer<com.google.maps.android.data.kml.KmlLayer> {
    #private;
    constructor(mapView: com.google.android.gms.maps.GoogleMap, kml: org.json.JSONObject);
    get native(): com.google.maps.android.data.kml.KmlLayer;
    hasPlacemarks(): boolean;
    getPlacemarks(): java.lang.Iterable<com.google.maps.android.data.kml.KmlPlacemark>;
    getGroundOverlays(): java.lang.Iterable<com.google.maps.android.data.kml.KmlGroundOverlay>;
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
export declare class KMLPlacemarkFeature extends BaseFeature<com.google.maps.android.data.kml.KmlPlacemark> {
    #private;
    constructor();
    static fromNative(nativeFeature: com.google.maps.android.data.kml.KmlPlacemark): KMLPlacemarkFeature;
    get native(): com.google.maps.android.data.kml.KmlPlacemark;
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
export {};
