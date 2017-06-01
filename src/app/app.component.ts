import {AfterViewInit, Component, ViewChild } from '@angular/core';
import {Pizza} from './Model/pizza';
import {PizzasListComponent} from './pizzas-liste.component';

@Component({
  selector: 'app-root',
  templateUrl: './Views/app.component.html',
  styleUrls: ['./CSS/app.component.css']
})
export class AppComponent implements AfterViewInit {
  message: String = null;
  className: String = 'success';
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
    this.message = `La pizza ${pizza.name} à bien été ajoutée.`;
    this.pizzaListComponent.addNewPizza(pizza);
    this.showForm = false;
  }

  deleteAction(pizza: Pizza) {
    this.message = `La pizza ${pizza.name} à bien été supprimée.`;
  }
}
