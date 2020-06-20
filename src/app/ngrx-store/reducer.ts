import { InjectionToken } from "@angular/core";
import { ActionReducerMap, Action, ActionReducer } from "@ngrx/store";
import { State } from "./state";

export function reducer(state: State | undefined, action: Action) {
  return state;
}

export function logger(
  // tslint:disable-next-line: no-shadowed-variable
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    if (action.type.startsWith("[")) {
      console.groupCollapsed(action.type);
      console.log("prev state", JSON.stringify(state));
      console.log("action", action);
      console.log("next state", JSON.stringify(result));
      console.groupEnd();
    }

    return result;
  };
}
