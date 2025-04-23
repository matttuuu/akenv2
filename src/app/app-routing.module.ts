import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashMainComponent } from './components/dashboard/dash-main/dash-main.component';
import { LoginformComponent } from './components/auth/loginform/loginform.component';

const routes: Routes = [
  {path: '', component: DashMainComponent  }, //Chequear si funcionan 2 rutas distintas segun la direccion indicada en la URL
  {path: 'login', component: LoginformComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
