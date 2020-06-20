import { Component, OnInit } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators"; 
import { MergeStrategy } from "@ngrx/data";
import { HeroService } from "./hero-collection.service";
import { Hero } from "../hero.model";

@Component({
  selector: "my-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  name = "Angular";

  loading$: Observable<boolean>;
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = heroService.entities$;
    this.loading$ = heroService.loading$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  deleteHero(hero: Hero) {
    this.heroService.delete(hero.id);
  }

  page = 1;

  getHeroes() {
    this.heroService.getWithQuery({
      page: this.page.toString(),
      pageSize: "2"
    });
  }

  nextPage() {
    this.page++;
    this.getHeroes();
  }
}
