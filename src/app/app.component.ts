import {AfterViewInit, Component, ViewChild } from '@angular/core';
import {Pizza} from './Model/pizza';
import {PizzasListComponent} from './pizzas-liste.component';

@Component({
  selector: 'app-root',
  templateUrl: './Views/app.component.html',
  styleUrls: ['./CSS/app.component.css']
})
export class AppComponent implements AfterViewInit {
  lastAddPizza: Pizza = null;
  showForm = false;
  @ViewChild(PizzasListComponent)
  private pizzaListComponent: PizzasListComponent;

  ngAfterViewInit(): void {
  }

  onShowForm(): void {
    this.showForm = true;
  }

  hideForm(): void {
    this.showForm = false;
  }

  insertAction(pizza: Pizza) {
    this.lastAddPizza = pizza;
    this.pizzaListComponent.addNewPizza(pizza);
    this.showForm = false;
  }
}
