import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { User } from '../user.types';

@Component({
    selector: 'app-user-selector',
    templateUrl: './user-selector.component.html',
    styleUrls: ['./user-selector.component.scss'],
    standalone: false
})

export class UserSelectorComponent {
  form: FormGroup;
  users: User [] = [];
  @Output() userIdListen: EventEmitter<number> = new EventEmitter();
  @Input() user!: number;

  constructor(
    private userService: UserService,
  ) {

  this.form = new FormGroup({
    userId: new FormControl('', [Validators.required]),
  });


  this.userService.getUsers()
  .subscribe({
    next: (response: any) => {
      this.users = response.users;
      if(this.user) {
        this.form.patchValue({userId: this.user});
      }
      }
  });
}
ngOnInit(){
  this.checkValue();

}

 ngAfterContentInit() {
}

checkValue(){
  setTimeout(() => {
    if(this.user) {
      this.form.patchValue({userId: this.user});
    }
  }, 300);
  
}


selectUserId(event: any) {
    this.userIdListen.emit(event.value);
}
}
