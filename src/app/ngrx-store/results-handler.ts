import { Injectable } from '@angular/core'
import { Action } from "@ngrx/store";
import { DefaultPersistenceResultHandler, EntityAction } from "@ngrx/data";

@Injectable()
export class AdditionalPropertyPersistenceResultHandler extends DefaultPersistenceResultHandler {
  handleSuccess(originalAction: EntityAction): (data: any) => Action {
    const actionHandler = super.handleSuccess(originalAction);
    // return a factory to get a data handler to
    // parse data from DataService and save to action.payload
    return function(data: any) {
      const action = actionHandler.call(this, data);
      if (action && data && data.totalNumberOfEntities) {
        // save the data.totalNumberOfEntities to action.payload.totalNumberOfEntities
        (action as any).payload.totalNumberOfEntities =
          data.totalNumberOfEntities;
      }
      if (action && data && data.entities) {
        // save the data.entities to action.payload.data
        (action as any).payload.data = data.entities;
      }
      console.log(
        `AdditionalPropertyPersistenceResultHandler::${JSON.stringify(action)}`
      );
      return action;
    };
  }
}
