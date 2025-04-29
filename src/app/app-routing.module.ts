import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashMainComponent } from './components/dashboard/dash-main/dash-main.component';
import { LoginformComponent } from './components/auth/loginform/loginform.component';
import { TestComponent } from './components/testing/test/test.component';
import { canActivate,redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/auth-guard';


const routes: Routes = [
  {path: 'main', component: DashMainComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))  }, //Chequear si funcionan 2 rutas distintas segun la direccion indicada en la URL
  {path: 'login', component: LoginformComponent,...canActivate(() => redirectLoggedInTo(['/main '])) }, //Para que no haya errores, podria poner un redirect logged into aca
  {path: 'test', component: TestComponent,...canActivate(() => redirectUnauthorizedTo(['/login']))}, //Por ahora el redirectloggedinto() si funciona, deberia intentar deslogearme y probar
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
