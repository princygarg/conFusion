import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'dish-detail/:id', component: DishDetailComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];