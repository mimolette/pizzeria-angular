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
  @Input() selectedIngredients: Ingredient[];
  @Output() onSelect = new EventEmitter<Ingredient>();
  @Output() onUnselect = new EventEmitter<Ingredient>();
  @Output() onError = new EventEmitter<String>();
  showForm = false;
  @Input() ingredientsValid = true;

  constructor(private ingredientsService: IngredientsService) {}

  addNewIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredients.sort(this.compare.bind(this));
    this.onSelect.emit(ingredient);
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

  isIngredientSelected(ingredient: Ingredient): boolean {
    for (const ingredientSelected of this.selectedIngredients) {
      if (ingredient._id === ingredientSelected._id) {
        return true;
      }
    }

    return false;
  }

  onSelectIngredient(component: IngredientComponent) {
    this.onSelect.emit(component.getIngredient());
  }

  onErrorMessage(error: String): void {
    this.onError.emit(error);
  }

  setIngredients (ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  compare(ingA: Ingredient, ingb: Ingredient): number {
    if (ingA.name < ingb.name) {
      return -1;
    } else {
      return 1;
    }
  }
}
