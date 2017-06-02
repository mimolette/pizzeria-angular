import {AfterViewInit, Component, ViewChild } from '@angular/core';
import {Pizza} from './Model/pizza';
import {PizzasListComponent} from './pizzas-liste.component';
import {Ingredient} from './Model/ingredient';

@Component({
  selector: 'app-root',
  templateUrl: './Views/app.component.html',
  styleUrls: ['./CSS/app.component.css']
})
export class AppComponent implements AfterViewInit {
  message: String = null;
  className: String = 'success';
  pizzaToEdit: Pizza = null;
  showForm = false;
  ingredients: Ingredient[];
  @ViewChild(PizzasListComponent)
  private pizzaListComponent: PizzasListComponent;

  ngAfterViewInit(): void {
  }

  onShowForm(): void {
    this.pizzaToEdit = null;
    this.ingredients = [];
    this.showForm = true;
  }

  hideForm(): void {
    this.showForm = false;
  }

  onEditClickAction(pizza: Pizza) {
    this.pizzaToEdit = pizza;
    this.ingredients = pizza.ingredients.slice();
    this.showForm = true;
  }

  onErrorMessage(error: String): void {
    this.message = error;
    this.className = 'error';
  }

  editAction(pizza: Pizza) {
    this.message = `La pizza ${pizza.name} à bien été modifiée.`;
    this.className = 'success';
    this.pizzaListComponent.updatePizza(pizza);
    this.showForm = false;
  }

  insertAction(pizza: Pizza) {
    this.message = `La pizza ${pizza.name} à bien été ajoutée.`;
    this.className = 'success';
    this.pizzaListComponent.addNewPizza(pizza);
    this.showForm = false;
  }

  deleteAction(pizza: Pizza) {
    this.message = `La pizza ${pizza.name} à bien été supprimée.`;
    this.className = 'success';
  }

  getTitle(): String {
    return this.pizzaToEdit ? `Modification de la pizza ${this.pizzaToEdit.name}` : 'Ajout d\'une nouvelle pizza';
  }

  getId(): String {
    return this.pizzaToEdit ? this.pizzaToEdit._id : null;
  }

  getAction(): String {
    return this.pizzaToEdit ? 'put' : 'post';
  }

  getName(): String {
    return this.pizzaToEdit ? this.pizzaToEdit.name : null;
  }

  getPrice(): Number {
    return this.pizzaToEdit ? this.pizzaToEdit.price : null;
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  onSelectIngredient(ingredient: Ingredient) {
    if (!this.isIngredientSelected(ingredient)) {
      this.ingredients.push(ingredient);
    } else {
      this.onUnselectIngredient(ingredient);
    }
  }

  isIngredientSelected(ingredient: Ingredient): boolean {
    for (const ingredientSelected of this.ingredients) {
      if (ingredient._id === ingredientSelected._id) {
        return true;
      }
    }

    return false;
  }

  onUnselectIngredient(ingredient: Ingredient) {
    const index = this.ingredients.indexOf(ingredient);

    if (index !== -1) {
      this.ingredients.splice(index, 1);
    }
  }
}
