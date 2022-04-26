import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {

  }

}
