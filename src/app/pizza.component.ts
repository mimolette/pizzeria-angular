import { Component, EventEmitter, Input , Output } from '@angular/core';
import { Pizza } from './Model/pizza';
import {PizzasService} from './Service/pizzas.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './Views/pizza.component.html',
  styleUrls: ['./CSS/pizza.css']
})

export class PizzaComponent {
  @Input() pizza: Pizza;
  @Output() onDeleted = new EventEmitter<Pizza>();
  @Output() onEdit = new EventEmitter<Pizza>();
  @Output() onSelect = new EventEmitter<Pizza>();

  constructor(private pizzaService: PizzasService) {}

  onDeleteAction(): void {
    this.pizzaService.deletePizza(this.pizza)
      .then(function () {
        this.onDeleted.emit(this.pizza);
      }.bind(this))
      .catch(function (err) {
        console.error(err);
      });
  }

  onSelectAction(): void {
    this.onSelect.emit(this.pizza);
  }

  onEditAction(): void {
    this.onEdit.emit(this.pizza);
  }
}
