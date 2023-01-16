import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  { path: "",component:UserInfoComponent },
  { path: "user-info",component:UserInfoComponent },
  { path: "account",component:AccountComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
