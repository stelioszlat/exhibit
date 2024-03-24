import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsComponent } from './components/catalog/catalogs/catalogs.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { EditExhibitComponent } from './components/exhibit/edit-exhibit/edit-exhibit.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { EditVendorComponent } from './components/vendor/edit-vendor/edit-vendor.component';
import { ExhibitsComponent } from './components/exhibit/exhibits/exhibits.component';
import { NewExhibitComponent } from './components/exhibit/new-exhibit/new-exhibit.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { NewVendorComponent } from './components/vendor/new-vendor/new-vendor.component';
import { OrdersComponent } from './components/order/orders/orders.component';
import { SettingsComponent } from './components/setting/settings/settings.component';
import { UsersComponent } from './components/user/users/users.component';
import { VendorsComponent } from './components/vendor/vendors/vendors.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewCatalogComponent } from './components/catalog/new-catalog/new-catalog.component';
import { EditCatalogComponent } from './components/catalog/edit-catalog/edit-catalog.component';
import { NewCategoryComponent } from './components/category/new-category/new-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { EditOrderComponent } from './components/order/edit-order/edit-order.component';
import { NewOrderComponent } from './components/order/new-order/new-order.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EditSettingsComponent } from './components/setting/edit-settings/edit-settings.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent, children: [
    { path: 'catalogs', component: CatalogsComponent },
    { path: 'catalog/new', component: NewCatalogComponent },
    { path: 'catalog/:id/edit', component: EditCatalogComponent},
    { path: 'categories', component: CategoriesComponent},
    { path: 'category/new', component: NewCategoryComponent},
    { path: 'category/:id/edit', component: EditCategoryComponent},
    { path: 'exhibits', component: ExhibitsComponent },
    { path: 'exhibit/new', component: NewExhibitComponent },
    { path: 'exhibit/:id/edit', component: EditExhibitComponent },
    { path: 'orders', component: OrdersComponent},
    { path: 'order/new', component: NewOrderComponent},
    { path: 'order/:orderId/edit', component: EditOrderComponent},
    { path: 'users', component: UsersComponent},
    { path: 'user/new', component: NewUserComponent},
    { path: 'user/:userId/edit', component: EditUserComponent},
    { path: 'vendors', component: VendorsComponent},
    { path: 'vendor/new', component: NewVendorComponent},
    { path: 'vendor/:name/edit', component: EditVendorComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'setting/new', component: EditSettingsComponent}
  ], 
  },
  // canActivate: [AuthGuard]},
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent},
  { path: 'catalog/:catalogId', component: CatalogPageComponent },
  { path: '', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
