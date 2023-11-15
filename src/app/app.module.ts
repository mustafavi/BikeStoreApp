import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OrderItemsComponent } from './components/order-items/order-items.component';
import { OrdersComponent } from './components/orders/orders.component';
import { StaffsComponent } from './components/staffs/staffs.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { StoresComponent } from './components/stores/stores.component';
import { CategoriesDetailsComponent } from './components/categories/categories-details.component';
import { JsonFormComponent } from './components/jsonform/json-form/json-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    CustomersComponent,
    OrderItemsComponent,
    OrdersComponent,
    StaffsComponent,
    StocksComponent,
    StoresComponent,
    CategoriesDetailsComponent,
    JsonFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'components/welcome', component: WelcomeComponent },
      { path: 'components/jsonform/json-form', component: JsonFormComponent },
      { path: 'components/brands', component: BrandsComponent },
      { path: 'components/categories', component: CategoriesComponent },

      { path: 'categories/:id', component: CategoriesDetailsComponent },
      //{path:'products/:id', canActivate:[ProductDetailGuard], component:ProductDetailComponent},
      { path: 'components/customers', component: CustomersComponent },
      { path: 'components/order-items', component: OrderItemsComponent },
      { path: 'components/orders', component: OrdersComponent },
      { path: 'components/products', component: ProductsComponent },
      { path: 'components/staffs', component: StaffsComponent },
      { path: 'components/stocks', component: StocksComponent },
      { path: 'components/stores', component: StoresComponent },

      { path: '', redirectTo: 'components/welcome', pathMatch: 'full' },
      //{path:'**', component: PageNotFoundComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
