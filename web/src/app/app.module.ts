import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NewExhibitComponent } from './components/exhibit/new-exhibit/new-exhibit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExhibitsComponent } from './components/exhibit/exhibits/exhibits.component';
import { CatalogsComponent } from './components/catalog/catalogs/catalogs.component';
import { ExhibitComponent } from './components/exhibit/exhibit.component';
import { EditExhibitComponent } from './components/exhibit/edit-exhibit/edit-exhibit.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { ExhibitService } from './services/exhibit.service';
import { AuthService } from './services/auth.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CategoryService } from './services/category.service';
import { CatalogService } from './services/catalog.service';
import { SettingsComponent } from './components/setting/settings/settings.component';
import { VendorsComponent } from './components/vendor/vendors/vendors.component';
import { NewVendorComponent } from './components/vendor/new-vendor/new-vendor.component';
import { EditVendorComponent } from './components/vendor/edit-vendor/edit-vendor.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { OrdersComponent } from './components/order/orders/orders.component';
import { OrderService } from './services/order.service';
import { OrderComponent } from './components/order/order.component';
import { NewOrderComponent } from './components/order/new-order/new-order.component';
import { EditOrderComponent } from './components/order/edit-order/edit-order.component';
import { EditCatalogComponent } from './components/catalog/edit-catalog/edit-catalog.component';
import { NewCatalogComponent } from './components/catalog/new-catalog/new-catalog.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NewCategoryComponent } from './components/category/new-category/new-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { CategoryComponent } from './components/category/category.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MainNavComponent } from './common/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { VendorService } from './services/vendor.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DataAccordionComponent } from './common/data-accordion/data-accordion.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MatNativeDateModule } from '@angular/material/core';
import { EditSettingsComponent } from './components/setting/edit-settings/edit-settings.component';
import { SettingComponent } from './components/setting/setting.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    NewExhibitComponent,
    ExhibitsComponent,
    CatalogsComponent,
    ExhibitComponent,
    EditExhibitComponent,
    CategoriesComponent,
    LoginPageComponent,
    UsersComponent,
    UserComponent,
    NewUserComponent,
    EditUserComponent,
    CatalogPageComponent,
    SettingsComponent,
    VendorsComponent,
    NewVendorComponent,
    EditVendorComponent,
    VendorComponent,
    OrdersComponent,
    OrderComponent,
    NewOrderComponent,
    EditOrderComponent,
    EditCatalogComponent,
    NewCatalogComponent,
    CatalogComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    CategoryComponent,
    CartItemComponent,
    MainNavComponent,
    DataAccordionComponent,
    LandingPageComponent,
    EditSettingsComponent,
    SettingComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService,
    ExhibitService,
    UserService,
    CategoryService,
    CatalogService,
    OrderService,
    VendorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
