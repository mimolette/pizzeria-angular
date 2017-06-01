import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IngredientsListComponent } from './ingredients-liste.component';
import { PizzasListComponent } from './pizzas-liste.component';

const routes: Routes = [
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
  { path: 'ingredients',  component: IngredientsListComponent },
  { path: 'pizzas',  component: PizzasListComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
