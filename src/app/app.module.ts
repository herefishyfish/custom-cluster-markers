import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptModule,
  NativeScriptRouterModule,
} from "@nativescript/angular";

import { AppComponent } from "./app.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule.forRoot([
      {
        path: "",
        loadComponent: () =>
          import("./custom-marker/custom-marker.component").then(
            (m) => m.CustomClusterMarkers
          ),
      },
    ]),
  ],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
