import { Component, EventEmitter, Input, Output} from '@angular/core';
import {QtePizza} from './Model/qtePizza';
import {Pizza} from './Model/pizza';

@Component({
  selector: 'app-basket',
  templateUrl: './Views/basket.component.html',
  styleUrls: ['./CSS/basket.css']
})

export class BasketComponent {
  @Input() listQtePizza: QtePizza[];
  @Output() onPlus = new EventEmitter<Pizza>();
  @Output() onMoins = new EventEmitter<Pizza>();
  @Output() onDelete = new EventEmitter<QtePizza>();
  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<boolean>();

  onPlusAction(qtePizza: QtePizza): void {
    this.onPlus.emit(qtePizza.pizza);
  }
  onMoinsAction(qtePizza: QtePizza): void {
    this.onMoins.emit(qtePizza.pizza);
  }
  onDeleteAction(qtePizza: QtePizza): void {
    this.onDelete.emit(qtePizza);
  }

  onCancelAction(): void {
    this.onCancel.emit(true);
  }

  onSubmitAction(): void {
    this.onSubmit.emit(true);
  }

  getTotalPrice(): number {
    let price = 0;
    for (const qtePizza of this.listQtePizza) {
      price += (qtePizza.qte * +qtePizza.pizza.price);
    }

    return price;
  }

  toMuchPizza(): boolean {
    return this.listQtePizza.length >= 10;
  }
}
