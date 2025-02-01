import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../shared/constants/constants';
@Component({
    selector: 'app-user-password-change',
    templateUrl: './user-password-change.component.html',
    styleUrl: './user-password-change.component.scss',
    standalone: false
})
export class UserPasswordChangeComponent {
  form: FormGroup;
  user: any;
  roles: any = [];
  loading = false;
  fieldTitle = '';
  showPassword = false;
  showPasswordConfirm = false;
  selecteds = [];
  ccaaSelection = undefined;
  provinceSelection = undefined;
  municipalitySelection = undefined;


  constructor(
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
  ) {
      this.roles = Object.entries(Roles);
      this.form = new FormGroup({
        password: new FormControl('', [Validators.required])
      });
      this.user = {};
      this.user.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {    
      this.loading = true;
      this.userService.getUserById(this.user.id).subscribe({
          next: (response: any) => {
              this.loading = false;
              this.user = response.user;
          },
      });
  }
  ngOnDestroy(): void {
  }

  editUser() {

      this.userService.setPassword(this.user.id, this.form.controls['password'].value).subscribe({
          next: (response: any) => {
              this.loading = false;
              Swal.fire(
                  'Operación correcta',
                  'Contraseña asignada correctamente',
                  'success'
              );
              this.router.navigateByUrl('/app/user')
          },
          error: (error) => {
              this.loading = false;
              console.error(error);
              Swal.fire(
                  'Operación incorrecta',
                  'No se ha podido asignar la contraseña',
                  'error'
              );
          },
      });
  }
}
