import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Pizza } from './Model/pizza';
import { PizzasService } from './Service/pizzas.service';
import { PizzaComponent } from './pizza.component';

@Component({
  selector: 'app-pizzas-list',
  templateUrl: './Views/pizzas-list.component.html',
  styleUrls: ['./CSS/list-pizza.css']
})

export class PizzasListComponent implements OnInit {
  pizzas: Pizza[] = [];
  selectedPizzas: Pizza[] = [];
  @Output() onDeleted = new EventEmitter<Pizza>();
  @Output() onEdit = new EventEmitter<Pizza>();

  constructor(private pizzaService: PizzasService) {}

  getPizzas(): void {
    this.pizzaService.getPizzas()
      .then(pizzas => this.setPizzas(pizzas))
      .catch(function (err) {
        console.error(err);
      });
  }

  ngOnInit(): void {
    this.getPizzas();
  }

  onSelectPizza(component: PizzaComponent) {
    // if (component.isSelected()) {
    //   this.addSelectedPizza(component.getPizza());
    // } else {
    //   this.removeSelectedPizza(component.getPizza());
    // }
    //
    // console.log(this.selectedPizzas);
  }

  setPizzas (pizzas: Pizza[]) {
    this.pizzas = pizzas;
  }

  addNewPizza (pizza: Pizza) {
    this.pizzas.push(pizza);
    this.pizzas.sort(this.compare.bind(this));
  }

  updatePizza (pizza: Pizza) {
    for (const pizzaOfList of this.pizzas) {
      if (pizza._id === pizzaOfList._id) {
        pizzaOfList.name = pizza.name;
        pizzaOfList.price = pizza.price;
        pizzaOfList.ingredients = pizza.ingredients;
        this.pizzas.sort(this.compare.bind(this));
      }
    }
  }

  removePizza (pizza: Pizza) {
    const index = this.pizzas.indexOf(pizza);

    if (index !== -1) {
      this.pizzas.splice(index, 1);
      this.onDeleted.emit(pizza);
    }
  }

  deletePizzaAction(pizza: Pizza): void {
    this.removePizza(pizza);
  }

  onEditClickAction(pizza: Pizza): void {
    this.onEdit.emit(pizza);
  }

  addSelectedPizza(ingredient: Pizza): void {
    this.selectedPizzas.push(ingredient);
  }

  removeSelectedPizza(pizza: Pizza): void {
    const index = this.selectedPizzas.indexOf(pizza);

    if (index === -1) {
      this.selectedPizzas.splice(index, 1);
    }
  }

  compare(pizzaA: Pizza, pizzab: Pizza): number {
    if (pizzaA.price < pizzab.price) {
      return -1;
    } else {
      return 1;
    }
  }
}
