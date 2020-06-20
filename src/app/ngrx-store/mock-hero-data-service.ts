import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams
} from "@ngrx/data";

import { Observable, of, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Hero } from "../hero.model";

import { EntityCacheDispatcher } from "@ngrx/data";

export const DATA = [
  { id: 1, name: "Spiderman", power: 1 },
  { id: 2, name: "Thor", power: 5 },
  { id: 3, name: "Hulk", power: 6 },
  { id: 4, name: "Ant-Man", power: 7 },
  { id: 5, name: "Iron Man", power: 9 },
  { id: 6, name: "Thanos", power: 10 }
];

function PAGINATED_DATA(page, pageSize) {
  const startAt = 1 + pageSize * (page - 1);
  const endAt = startAt + pageSize;
  return {
    totalNumberOfEntities: DATA.length,
    entities: DATA.slice(startAt, endAt)
  };
}

@Injectable()
export class MockHeroDataService extends DefaultDataService<Hero> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger
  ) {
    super("Hero", http, httpUrlGenerator);
    logger.log("Created custom Hero EntityDataService");
  }

  getAll(): Observable<Hero[]> {
    return of(DATA);
  }

  getWithQuery(params: QueryParams): any {
    console.log(params);
    const page = +params.page;
    const pageSize = +params.pageSize;
    return of(PAGINATED_DATA(page, pageSize)).pipe(
      // map(paginatedData => paginatedData.entities),
      // tap(x => console.log(`getWithQuery::${JSON.stringify(x)}`))
    );
  }
}
