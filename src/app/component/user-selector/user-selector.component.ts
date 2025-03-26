import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { User } from '../user.types';
import { debounceTime, map, startWith } from 'rxjs';

@Component({
    selector: 'app-user-selector',
    templateUrl: './user-selector.component.html',
    styleUrls: ['./user-selector.component.scss'],
    standalone: false
})

export class UserSelectorComponent {
  form: FormGroup;
  users: any[] = [];
  filteredUsers: User[] = [];
  userFilter: FormControl = new FormControl('');

  @Output() userIdListen: EventEmitter<number> = new EventEmitter();
  @Input() user!: number;

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      userId: new FormControl('', [Validators.required]),
    });

    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.users;
        this.filteredUsers = this.users;

        if (this.user) {
          this.form.patchValue({ userId: this.user });
          this.setUserName(this.user);
        }
      }
    });

    this.userFilter.valueChanges
    .pipe(
      startWith(''),
      debounceTime(300),
      map(value => (typeof value === 'string' ? this.filterUsers(value) : this.filteredUsers))
    )
    .subscribe(filtered => (this.filteredUsers = filtered));
  }

  async afterContentInit(){
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.users;
        this.filteredUsers = this.users;

        if (this.user) {
          this.form.patchValue({ userId: this.user });
          this.setUserName(this.user);
        }
      }
    });
  }

  private filterUsers(value: string): User[] {
    const filterValue = this.normalizeString(value);
    return this.users.filter(user => this.normalizeString(user.name).includes(filterValue));
  }
  
  // Función para eliminar tildes y convertir a minúsculas
  private normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  selectUserId(event: any) {
    const selectedUser = this.users.find(user => user.id === event.option.value);
    if (selectedUser) {
      this.form.patchValue({ userId: selectedUser.id });
      this.userFilter.setValue(selectedUser.name);
      this.userIdListen.emit(selectedUser.id);
    }
  }

  displayFn(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : '';
  }

  private setUserName(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.userFilter.setValue(user.name);
    }
  }
}
