import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './components/common-ui/layout/layout.component';
import { accessGuard } from './guards/access.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, children: [
      {
        path: '',
        component: SearchComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ],
    canActivate: [accessGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];
