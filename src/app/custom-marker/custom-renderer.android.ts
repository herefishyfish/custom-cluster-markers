import { ImageSource, Utils } from "@nativescript/core";
import { hueFromColor } from "@nativescript/google-maps/utils/index.android";
import { intoNativeColor } from "@nativescript/google-maps-utils/utils/common";

@NativeClass()
export class CustomClusterRenderer extends com.google.maps.android.clustering
  .view.DefaultClusterRenderer<any> {
  constructor(map, clusterManager) {
    super(
      Utils.android.getApplicationContext(),
      map.native,
      clusterManager.native
    );
  }

  override onBeforeClusterItemRendered(item, opts) {
    super.onBeforeClusterItemRendered(item, opts);
    if (typeof item.options?.draggable === "boolean") {
      opts.draggable(item.options.draggable);
    }
    if (
      typeof item.options?.anchorU === "number" ||
      typeof item.options?.anchorV === "number"
    ) {
      const anchorU = item.options?.anchorU ?? opts.getAnchorU();
      const anchorV = item.options?.anchorV ?? opts?.getAnchorV();
      opts.anchor(anchorU, anchorV);
    }
    if (item.options?.position) {
      opts.position(
        new com.google.android.gms.maps.model.LatLng(
          item.options.position.lat,
          item.options.position.lng
        )
      );
    }
    if (item.options?.title) {
      opts.title(item.options.title);
    }
    if (item.options?.snippet) {
      opts.snippet(item.options.snippet);
    }
    if (item.options?.icon) {
      if (item.options?.icon instanceof android.graphics.Bitmap) {
        const desc =
          com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(
            item.options.icon
          );
        opts.icon(desc);
      } else if (item.options?.icon instanceof ImageSource) {
        const desc =
          com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(
            item.options.icon.android
          );
        opts.icon(desc);
      }
    }
    const color = intoNativeColor(item?.options?.color);
    if (color !== null) {
      opts.icon(
        com.google.android.gms.maps.model.BitmapDescriptorFactory.defaultMarker(
          hueFromColor(color)
        )
      );
    }
    if (typeof item.options?.rotation === "number") {
      opts.rotation(item.options.rotation);
    }
    if (typeof item.options?.flat === "boolean") {
      opts.flat(item.options.flat);
    }
    if (typeof item.options?.zIndex === "number") {
      opts.zIndex(item.options.zIndex);
    }
  }

  customMarkerImage = ImageSource.fromFileOrResourceSync("res://logo");
  override onBeforeClusterRendered(
    clusterItem: com.google.maps.android.clustering.Cluster<any>,
    options: com.google.android.gms.maps.model.MarkerOptions
  ): void {
    super.onBeforeClusterRendered(clusterItem, options);

    if (this.customMarkerImage?.android) {
      options.icon(
        com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(
          this.customMarkerImage.android
        )
      );
    }
  }
}
