import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import {
  EntityDataService,
  PersistenceResultHandler,
  EntityCollectionReducerMethodsFactory,
  EntityDefinitionService
} from "@ngrx/data";
import { MockHeroDataService } from "./mock-hero-data-service";
import { RootEffects } from "./effects";

import { AdditionalPropertyPersistenceResultHandler } from "./results-handler";
import { AdditionalEntityCollectionReducerMethodsFactory } from "./collection-reducer-methods";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeroesComponent } from "./heroes.component";
import { appEntityMetadata } from "../app-entity-metadata";
const routes: Routes = [
  { path: "", pathMatch: "full", component: HeroesComponent }
];
@NgModule({
  declarations: [HeroesComponent],
  exports: [HeroesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [
    MockHeroDataService, // <-- provide the data service
    {
      provide: PersistenceResultHandler,
      useClass: AdditionalPropertyPersistenceResultHandler
    },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: AdditionalEntityCollectionReducerMethodsFactory
    }
  ]
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    entityDefinitionService: EntityDefinitionService,
    heroDataService: MockHeroDataService
  ) {
    entityDefinitionService.registerMetadataMap(appEntityMetadata);
    entityDataService.registerService("Hero", heroDataService); // <-- register it
  }
}
