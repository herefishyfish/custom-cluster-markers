export * from './common';
import { GoogleMap } from '@nativescript/google-maps';
import { HeatmapOptions } from '..';
export declare function intoNativeHeatmapProvider(options: HeatmapOptions): com.google.maps.android.heatmaps.HeatmapTileProvider;
export declare function intoNativeClusterManager(map: GoogleMap): com.google.maps.android.clustering.ClusterManager<unknown>;
