import { Component, EventEmitter, Input , Output } from '@angular/core';
import {Ingredient} from'./Model/ingredient';
import {IngredientsService} from './Service/ingredients.service';

@Component({
  selector: 'app-ingredient-add',
  templateUrl: './Views/ingredient-add.component.html',
  styleUrls: ['./CSS/ingredient-add.css']
})

export class IngredientAddComponent {
  @Input() name: String;
  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onInsert = new EventEmitter<Ingredient>();

  constructor(private ingredientService: IngredientsService) {}

  onSubmitAction(): void {
    if (this.name && this.name !== '') {
      const ingredientObj = {
        _id: null,
        name: this.name,
      };

      this.ingredientService.addIngredient(ingredientObj)
        .then(function (data) {
          this.onInsert.emit(data);
        }.bind(this))
        .catch(function (err) {
        console.error(err);
      }.bind(this));
    }
  }

  onCancelAction(): void {
    this.onCancel.emit(true);
  }
}
