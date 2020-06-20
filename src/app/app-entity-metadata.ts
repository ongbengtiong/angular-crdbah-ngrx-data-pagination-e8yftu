import { EntityMetadataMap } from "@ngrx/data";
import { Hero } from './hero.model'

export function sortByPower(h1: Hero, h2: Hero) {
  return h1.power > h2.power ? 1: -1
}


export const appEntityMetadata: EntityMetadataMap = {
  Hero: {
    sortComparer: sortByPower
  }
};
