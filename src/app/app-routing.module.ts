import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AllCustomerComponent } from './components/all-customer/all-customer.component';
import { CustomerTodayComponent } from './components/customer-today/customer-today.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { HomeComponent } from './components/home/home.component';
import { PersonalComponent } from './components/personal/personal.component';
import { SendComponent } from './components/send/send.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'today', component: CustomerTodayComponent},
  { path: 'add', component: AddCustomerComponent},
  { path: 'edit', component: EditCustomerComponent},
  { path: 'all', component: AllCustomerComponent},
  { path: 'search', component: AllCustomerComponent},
  { path: 'personal', component: PersonalComponent},
  { path: 'aboutus', component: AboutUsComponent},
  { path: 'send', component: SendComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
