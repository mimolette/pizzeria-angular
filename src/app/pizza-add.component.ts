import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PizzasService} from './Service/pizzas.service';
import {Ingredient} from'./Model/ingredient';
import {Pizza} from './Model/pizza';

@Component({
  selector: 'app-pizza-add',
  templateUrl: './Views/pizza-add.component.html',
  styleUrls: ['./CSS/pizza-add.css']
})

export class PizzaAddComponent {
  @Input() _id: String;
  @Input() name: String;
  @Input() price: Number;
  @Input() title: String;
  @Input() action: String;
  @Input() ingredients: Ingredient[];
  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onInsert = new EventEmitter<Pizza>();
  @Output() onEdit = new EventEmitter<Pizza>();
  @Output() onError = new EventEmitter<String>();
  @Output() onSelect = new EventEmitter<Ingredient>();
  nameValid = true;
  priceValid = true;
  ingredientsValid = true;

  constructor(private pizzaService: PizzasService) {}

  onSubmitAction(): void {
    const pizzaObj = {
      _id: this._id,
      name: this.name,
      price: this.price,
      ingredients: this.ingredients
    };

    if (this.isPizzaValid(pizzaObj)) {
      if (this.action === 'post') {
        this.pizzaService.addPizza(pizzaObj)
          .then(function (data) {
            this.onInsert.emit(data);
          }.bind(this))
          .catch(function (err) {
            this.onErrorMessage(err.json().error);
        }.bind(this));
      }

      if (this.action === 'put') {
        this.pizzaService.editPizza(pizzaObj)
          .then(function (data) {
            this.onEdit.emit(data);
          }.bind(this))
          .catch(function (err) {
            this.onErrorMessage(err.json().error);
          }.bind(this));
      }
    }
  }

  isPizzaValid(pizza: Pizza): boolean {
    this.nameValid = pizza.name && pizza.name !== '';
    this.priceValid = !isNaN(+pizza.price) && +pizza.price > 0;
    this.ingredientsValid =  pizza.ingredients.length > 0;

    return this.nameValid && this.priceValid && this.ingredientsValid;
  }

  onErrorMessage(error: String): void {
    this.onError.emit(error);
  }

  onSelectIngredient(ingredient: Ingredient) {
    this.onSelect.emit(ingredient);
  }

  onCancelAction(): void {
    this.onCancel.emit(true);
  }
}
