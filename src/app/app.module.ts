import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { IngredientsService } from './Service/ingredients.service';
import { PizzasService } from './Service/pizzas.service';

import { AppComponent } from './app.component';
import { IngredientsListComponent } from './ingredients-liste.component';
import { PizzasListComponent } from './pizzas-liste.component';
import { IngredientComponent } from './ingredient.component';
import { PizzaComponent } from './pizza.component';
import { PizzaAddComponent } from './pizza-add.component';
import { IngredientAddComponent } from './ingredient-add.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsListComponent,
    PizzasListComponent,
    IngredientComponent,
    PizzaComponent,
    PizzaAddComponent,
    IngredientAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    IngredientsService,
    PizzasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
