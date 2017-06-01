import { Component, Input } from '@angular/core';
import { Pizza } from './Model/pizza';

@Component({
  selector: 'app-pizza',
  templateUrl: './Views/pizza.component.html',
  styleUrls: ['./CSS/pizza.css']
})

export class PizzaComponent {
  @Input() pizza: Pizza;
}
