import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private _userServices: UserService){

  }

  user:any;

  ngOnInit(): void {
    this._userServices.getUser().subscribe({
      next: (response) => {
        this.user = response.user
        },
    })
  }
}
