import { Component } from '@angular/core';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './Views/pizza-form.component.html'
})

export class PizzaFormComponent {
  name: String;
  price: Number;
}
