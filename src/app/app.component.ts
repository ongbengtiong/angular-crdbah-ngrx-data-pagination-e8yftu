import { Component, OnInit } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";  
import { MergeStrategy } from "@ngrx/data";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html" 
})
export class AppComponent {
  name = "Angular";

  

  constructor( ) {
   
  }

  ngOnInit() {
     
  }
 

  
}
