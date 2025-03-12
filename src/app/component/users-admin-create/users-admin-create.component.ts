import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../service/user.service';
import { Roles } from '../../shared/constants/constants';
import { Router } from '@angular/router';
import { DivipolService } from '../../service/divipol.service';

@Component({
    selector: 'app-users-admin-create',
    templateUrl: './users-admin-create.component.html',
    styleUrls: ['./users-admin-create.component.scss'],
    standalone: false
})
export class UsersAdminCreateComponent implements OnInit, OnDestroy {
    form: FormGroup;
    showPassword = false;
    roles: any = [];
    loading = false;
    authError = false;
    isView: boolean = true; // Estado inicial para mostrar 'eye.svg'
    divipol:any;
    filteredRoles: [string, string][] = []; // Roles filtrados dinámicamente


    constructor(
        private userService: UserService,
        private _divipolService: DivipolService,
        private router: Router
    ) {
        this.roles = Object.entries(Roles);
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,  Validators.minLength(6)
            ]),
            name: new FormControl('', [Validators.required, this.noNumbersValidator()]),
            identificationType: new FormControl('', [Validators.required]),
            identification: new FormControl('', [Validators.required]),
            role: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            contactPhone: new FormControl('', [Validators.pattern(/^\d{10}$/)]),
            municipalityId:new FormControl('', [Validators.required]),
            linkageType:new FormControl('', [Validators.required]),
        });

    }

    isFormValid(): boolean {
        const requiredFields = [
          'email',
          'password',
          'name',
          'identificationType',
          'identification',
          'role',
          'state',
          'linkageType',
        ];
      
        // Verifica que todos los campos requeridos sean válidos
        return requiredFields.every(field => this.form.get(field)?.valid);
      }

    toggleView() {
        this.isView = !this.isView;
      }

      noNumbersValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const hasNumbers = /\d/.test(control.value);
          return hasNumbers ? { noNumbers: true } : null;
        };
    }

    private filterRoles(linkageType: string): [string, string][] {
        let filteredRoles: [string, string][] = [];
      
        if (linkageType === 'Min-Igualdad') {
          filteredRoles = this.roles.slice(0, 3); // Los primeros dos roles (ADMIN y DIRECCION)
        } else if (linkageType === 'UT') {
          filteredRoles = this.roles.slice(3); // Todos los roles excepto ADMIN y DIRECCION
        }
      
        // Reemplazamos los guiones bajos por espacios en los nombres de los roles
        return filteredRoles.map(([key, value]) => [key, value.replace(/_/g, ' ')]);
      }
      

    ngOnInit() {
        this.filteredRoles = [...this.roles]; // Inicializamos con todos los roles

        this.form.get('linkageType')?.valueChanges.subscribe((value) => {
          this.filteredRoles = this.filterRoles(value);
          this.form.get('role')?.reset(); // Reseteamos el campo de roles
        });
        
        this.loading = true;

        this._divipolService.getAll().subscribe({
            next: (response:any) => {
                this.divipol = response.divipolas
                this.loading = false;

            }   
        })
    }

    ngOnDestroy(): void {
    }

    createUser() {
        this.loading = true;
        this.userService.createUser(this.form.value).subscribe({
            next: (response: any) => {
                this.loading = false;
                Swal.fire(
                    'Operación correcta',
                    'Usuario creado correctamente',
                    'success'
                );
                this.router.navigateByUrl('/app/user')
            },
            error: (error) => {
                this.loading = false;
                console.error(error);
                Swal.fire(
                    'Operación incorrecta',
                    `No se ha podido crear el usuario ${error.error.message}`,
                    'error'
                );
            },
        });
    }

}
