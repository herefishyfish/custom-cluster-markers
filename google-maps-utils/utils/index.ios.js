import { ClusterRenderer } from '..';
import { intoNativeHeatmapGradient } from './common';
export function intoNativeHeatmapProvider(options) {
    if (!options.coordinates) {
        return;
    }
    const heatmap = GMUHeatmapTileLayer.alloc().init();
    const defaultGradient = [
        { color: 'green', stop: 0.1 },
        { color: 'red', stop: 0.15 },
    ];
    heatmap.gradient = intoNativeHeatmapGradient(options?.gradient ?? defaultGradient);
    heatmap.opacity = options?.opacity ?? 0.7;
    heatmap.radius = options?.radius ?? 80;
    heatmap.weightedData = options?.coordinates.map((coordinate) => {
        return GMUWeightedLatLng.alloc().initWithCoordinateIntensity(CLLocationCoordinate2DMake(coordinate.lat, coordinate.lng), 1.0);
    });
    return heatmap;
}
// TODO:
// setMapDelegate
export function intoNativeClusterManager(map) {
    const algorithm = GMUNonHierarchicalDistanceBasedAlgorithm.alloc().init();
    const renderer = new ClusterRenderer(map, null);
    return GMUClusterManager.alloc().initWithMapAlgorithmRenderer(map.native, algorithm, renderer.native);
}
//# sourceMappingURL=index.ios.js.map