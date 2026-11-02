import { Routes } from '@angular/router';
import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';
import { Home } from './features/auth/components/home/home';

export const routes: Routes = [
    {
        path : '', component : Home
    },
    {
        path : 'login', component : Login
    },
    {
        path : 'register', component : Register
    },
    
];
