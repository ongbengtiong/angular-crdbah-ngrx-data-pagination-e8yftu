import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { RootEffects } from "./ngrx-store/effects";
import { EntityDataModule } from "@ngrx/data";
import { appEntityMetadata } from "./app-entity-metadata";
import { EntityStoreModule } from "./ngrx-store/entity-store.module";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

import { reducer, logger } from "./ngrx-store/reducer";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: "",
   
    data: {
      title: "Home"
    },
    children: [
      {
        path: "heroes",
        loadChildren: () =>
          import("./ngrx-store/entity-store.module").then(
            m => m.EntityStoreModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    /** Following required for @ngrx/data */
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [logger]
        // runtimeChecks: {
        //   strictStateImmutability: true,
        //   strictActionImmutability: true,
        //   strictStateSerializability: true,
        //   strictActionSerializability: true
        // }
      }
    ),
    EntityDataModule.forRoot({
      // entityMetadata: appEntityMetadata
    })
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
