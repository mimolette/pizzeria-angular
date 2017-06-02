import { Component, EventEmitter, Input , Output } from '@angular/core';
import {Ingredient} from './Model/ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './Views/ingredient.component.html',
  styleUrls: ['./CSS/ingredient.css']
})

export class IngredientComponent {
  @Input() ingredient: Ingredient;
  @Output() onSelected = new EventEmitter<IngredientComponent>();
  @Input() selected = false;

  onClick(): void {
    this.selected = !this.selected;
    this.onSelected.emit(this);
  }

  isSelected(): boolean {
    return this.selected;
  }

  getIngredient(): Ingredient {
    return this.ingredient;
  }
}
