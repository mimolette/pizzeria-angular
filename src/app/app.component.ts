import {AfterViewInit, Component, ViewChild } from '@angular/core';
import {Pizza} from './Model/pizza';
import {PizzasListComponent} from './pizzas-liste.component';
import {Ingredient} from './Model/ingredient';
import {QtePizza} from './Model/qtePizza';

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
  showBasket = false;
  ingredients: Ingredient[];
  listeQtePizza: QtePizza[] = [];
  @ViewChild(PizzasListComponent)
  private pizzaListComponent: PizzasListComponent;

  ngAfterViewInit(): void {
  }

  onShowForm(): void {
    if (!this.showBasket) {
      this.pizzaToEdit = null;
      this.ingredients = [];
      this.showForm = true;
    }
  }

  hideForm(): void {
    this.showForm = false;
  }

  onEditClickAction(pizza: Pizza) {
    if (!this.showBasket) {
      this.pizzaToEdit = pizza;
      this.ingredients = pizza.ingredients.slice();
      this.showForm = true;
    }
  }

  onSubmitBasket(): void {
    this.message = `Votre commande à été passée avec success.`;
    this.className = 'success';
    this.listeQtePizza = [];
    this.showBasket = false;
  }

  onHideBasket(): void {
    this.listeQtePizza = [];
    this.showBasket = false;
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
    let qtePizza = null;
    for (const qtePizzaExistant of this.listeQtePizza) {
      if (qtePizzaExistant._id === pizza._id) {
        qtePizza = qtePizzaExistant;
      }
    }

    if (qtePizza) {
      const index = this.listeQtePizza.indexOf(qtePizza);
      this.listeQtePizza.splice(index, 1);
      if (this.listeQtePizza.length < 1) {
        this.showBasket = false;
      }
    }
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
    let ingredientToDelete = null;
    for (const ingredientSelected of this.ingredients) {
      if (ingredient._id === ingredientSelected._id) {
        ingredientToDelete = ingredientSelected;
      }
    }

    if (ingredientToDelete) {
      const index = this.ingredients.indexOf(ingredientToDelete);

      if (index !== -1) {
        this.ingredients.splice(index, 1);
      }
    }
  }

  addQtePizza(pizza: Pizza) {
    this.showForm = false;
    this.showBasket = true;
    let qtePizza = null;
    for (const qtePizzaExistant of this.listeQtePizza) {
      if (qtePizzaExistant._id === pizza._id) {
        qtePizza = qtePizzaExistant;
      }
    }

    if (qtePizza) {
      qtePizza.qte++;
    } else {
      qtePizza = {
        _id: pizza._id,
        qte: 1,
        pizza: pizza
      };
      this.listeQtePizza.push(qtePizza);
    }

    console.dir(this.listeQtePizza);
  }

  moinsQtePizza(pizza: Pizza) {
    let qtePizza = null;
    for (const qtePizzaExistant of this.listeQtePizza) {
      if (qtePizzaExistant._id === pizza._id) {
        qtePizza = qtePizzaExistant;
      }
    }

    if (qtePizza) {
      qtePizza.qte--;
      if (qtePizza.qte === 0) {
        const index = this.listeQtePizza.indexOf(qtePizza);
        this.listeQtePizza.splice(index, 1);
        if (this.listeQtePizza.length < 1) {
          this.showBasket = false;
        }
      }
    }
  }

  deleteQtePizza(qtePizza: QtePizza) {
    const index = this.listeQtePizza.indexOf(qtePizza);
    this.listeQtePizza.splice(index, 1);
    if (this.listeQtePizza.length < 1) {
      this.showBasket = false;
    }
  }
}
