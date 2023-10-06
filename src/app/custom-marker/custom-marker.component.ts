import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { GoogleMapsModule } from "@nativescript/google-maps/angular";
import {
  GoogleMap,
  CameraUpdate,
  MapType,
  MarkerOptions,
} from "@nativescript/google-maps";
import {
  ClusterItem,
  ClusterManager,
  ClusterRenderer,
} from "@nativescript/google-maps-utils";
// TODO: Fix this import
import { intoNativeClusterManager } from "@nativescript/google-maps-utils/utils/index.android";
import { CustomClusterRenderer } from "./custom-renderer";
import { Color } from "@nativescript/core";

@Component({
  selector: "custom-marker",
  template: `
    <GridLayout>
      <MapView (ready)="onReady($event)"> </MapView>
    </GridLayout>
  `,
  standalone: true,
  imports: [GoogleMapsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CustomClusterMarkers {
  map: GoogleMap;

  onReady(event) {
    console.log("Map Ready");
    this.map = event.map as GoogleMap;
    this.map.mapType = MapType.Satellite;

    setTimeout(() => {
      this.map.animateCamera(
        CameraUpdate.fromCoordinate(
          {
            lat: this.map.cameraPosition.target.lat,
            lng: this.map.cameraPosition.target.lng,
          },
          12
        )
      );
    }, 0);
    console.log("adding markers");
    const markers = [];
    const color = new Color('green');
    for (let i = 0; i < 300; i++) {
      markers.push({
        position: this.createRandomLatLng(),
        title: "Marker " + i,
        snippet: "This is a cool snippet",
        userData: { index: i, truthy: Math.random() > 0.5 },
        color
      });
    }
    this.createCustomClusterManager(markers);
    console.log("added markers");
  }

  createRandomLatLng() {
    return {
      lat: Math.random() * 0.2 - 0.1 + this.map.cameraPosition.target.lat,
      lng: Math.random() * 0.2 - 0.1 + this.map.cameraPosition.target.lng,
    };
  }

  // This function has been modified from the original to use the custom renderer
  createCustomClusterManager(markers: MarkerOptions[]) {
    const clusterManager = ClusterManager.fromNative(
      intoNativeClusterManager(this.map)
    );
    // You'd replace ClusterRenderer with your extended version here:
    const renderer = new CustomClusterRenderer(this.map, clusterManager);
    clusterManager.setRenderer(renderer as ClusterRenderer);

    const clusters = markers.map((marker) => new ClusterItem(marker));
    clusterManager.addItems(clusters);

    clusterManager.cluster();

    return clusterManager;
  }
}
