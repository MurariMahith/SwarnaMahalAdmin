import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomerTodayComponent } from './components/customer-today/customer-today.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { AllCustomerComponent } from './components/all-customer/all-customer.component';
import { PersonalComponent } from './components/personal/personal.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ErrorComponent } from './components/error/error.component';
import { SendComponent } from './components/send/send.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment.prod';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AvailOfferComponent } from './components/avail-offer/avail-offer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CustomerTodayComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    AllCustomerComponent,
    PersonalComponent,
    AboutUsComponent,
    ErrorComponent,
    SendComponent,
    AvailOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
