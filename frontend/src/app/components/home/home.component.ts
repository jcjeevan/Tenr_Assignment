import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../services/shared.service";
import { HomeService } from "../../services/home.service";
import { Router } from "@angular/router";
import { Subject } from '../../../../node_modules/rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  role_id: string;
  username: string;
  generic_user: boolean;
  admin_user: boolean;
  dtOptions: DataTables.Settings = {};
	users: any;
	dtTrigger: Subject<any> = new Subject();

  constructor(private sharedService: SharedService, private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {
    this.role_id = this.sharedService.getRole();
    this.username = this.sharedService.getName();
    if (this.role_id == '2') {
      this.generic_user = true;
      this.admin_user = false;
    }
    else {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.generic_user = false;
      this.admin_user = true;
      this.homeService.fetchAll().subscribe((res: any) => {
        if (res.status == "success") {
		  this.users = res.data;
		  this.dtTrigger.next();
        }
        else {
        }
      });
    }
  }

  logout(){
	  localStorage.clear();
	  this.router.navigate(['/login']);
  }

}
