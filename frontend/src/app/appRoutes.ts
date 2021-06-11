import { ErrorComponent } from './error/error.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export default [
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'main/:id',
    component: MainPageComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '*',
    redirectTo: 'error',
  },
];
