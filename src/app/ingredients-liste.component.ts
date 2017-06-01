import { Component, EventEmitter, Input , Output, OnInit } from '@angular/core';

import { Ingredient } from './Model/ingredient';
import { IngredientsService } from './Service/ingredients.service';
import {IngredientComponent} from './ingredient.component';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './Views/ingredients-list.component.html',
  styleUrls: ['./CSS/list-ingredient.css']
})

export class IngredientsListComponent implements OnInit {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[] = [];
  @Output() onSelect = new EventEmitter<Ingredient>();
  @Output() onUnselect = new EventEmitter<Ingredient>();
  showForm = false;

  constructor(private ingredientsService: IngredientsService) {}

  addNewIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredients.sort(this.compare.bind(this));
    this.hideFormAction();
  }

  showFormAction(): void {
    this.showForm = true;
  }

  hideFormAction(): void {
    this.showForm = false;
  }

  getIngredients(): void {
    this.ingredientsService.getIngredients()
      .then(ingredients => this.setIngredients(ingredients))
      .catch(err => console.error(err));
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  onSelectIngredient(component: IngredientComponent) {
    if (component.isSelected()) {
      this.addSelectedIngredient(component.getIngredient());
    } else {
      this.removeSelectedIngredient(component.getIngredient());
    }
  }

  setIngredients (ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  addSelectedIngredient(ingredient: Ingredient): void {
    this.selectedIngredients.push(ingredient);
    this.onSelect.emit(ingredient);
  }

  removeSelectedIngredient(ingredient: Ingredient): void {
    const index = this.selectedIngredients.indexOf(ingredient);

    if (index) {
      this.selectedIngredients.splice(index, 1);
      this.onUnselect.emit(ingredient);
    }
  }

  compare(ingA: Ingredient, ingb: Ingredient): number {
    if (ingA.name < ingb.name) {
      return -1;
    } else {
      return 1;
    }
  }
}
