import { Component, EventEmitter, Input , Output } from '@angular/core';
import {QtePizza} from './Model/qtePizza';

@Component({
  selector: 'app-pizza-basket',
  templateUrl: './Views/pizza-basket.component.html',
  styleUrls: ['./CSS/pizza-basket.css']
})

export class PizzaBasketComponent {
  @Input() qtePizza: QtePizza;
  @Output() onPlus = new EventEmitter<QtePizza>();
  @Output() onMoins = new EventEmitter<QtePizza>();
  @Output() onDelete = new EventEmitter<QtePizza>();

  onPlusAction(): void {
    this.onPlus.emit(this.qtePizza);
  }
  onMoinsAction(): void {
    this.onMoins.emit(this.qtePizza);
  }
  onDeleteAction(): void {
    this.onDelete.emit(this.qtePizza);
  }
}
