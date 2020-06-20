import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import {
  tap,
  filter,
  map,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";
import {
  ofEntityOp,
  EntityAction,
  OP_SUCCESS,
  EntityOp,
  ofEntityType
} from "@ngrx/data";
import { State } from "./state";
import { of } from "rxjs";
import { EntityCacheDispatcher } from "@ngrx/data";

import {
  EntityActionFactory,
  EntityActionOptions,
  MergeStrategy
} from "@ngrx/data";

@Injectable()
export class RootEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private entityCacheDispatcher: EntityCacheDispatcher
  ) {}
}
