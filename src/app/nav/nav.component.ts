import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserInfoComponent } from '../user-info/user-info.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [MessageService,UserInfoComponent]
})
export class NavComponent {

  userInfo?:any;
  visibleSidebar1:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // private  userInfoComponent?: UserInfoComponent;
  constructor(private breakpointObserver: BreakpointObserver,private userInfoComponent: UserInfoComponent) {
    // this.userInfoComponent = userInfoComponent;
  }

  ngOnInit(): void {
    
    // this.userInfoComponent.ngOnInit();
    // this.userInfo = this.userInfoComponent.getThisUser();
    // console.log("nav:" + this.userInfo.avatar)
    // console.log("nav:" + this.userInfo.name);
  }
}
