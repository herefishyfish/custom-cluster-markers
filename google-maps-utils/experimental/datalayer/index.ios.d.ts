import { Color } from '@nativescript/core';
import { GoogleMap } from '@nativescript/google-maps';
import { IGeometryStyle, IGeoJsonLayer, IFeature, IGeometry } from '.';
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
    private map;
    private geometries;
    private styles?;
    style: GeometryStyle;
    constructor(map: GoogleMap, geometries: any, styles?: Partial<IGeometryStyle>);
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
