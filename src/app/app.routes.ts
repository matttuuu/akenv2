import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginformComponent } from './components/auth/loginform/loginform.component';
import { DashMainComponent } from './components/dashboard/dash-main/dash-main.component';

export const routes: Routes = [
    {path: '', component: DashMainComponent  }, //Chequear si funcionan 2 rutas distintas segun la direccion indicada en la URL
    {path: 'login', component: LoginformComponent}
];
