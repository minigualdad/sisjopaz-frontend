import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../shared/constants/constants';
import { DivipolService } from '../../service/divipol.service';

@Component({
    selector: 'app-users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users-edit.component.scss'],
    standalone: false
})
export class UsersEditComponent implements OnInit, OnDestroy {
    form: FormGroup;
    showPassword = false;
    user: any;
    roles: any = [];
    loading = false;
    fieldTitle = '';

    selecteds = [];
    ccaaSelection = undefined;
    provinceSelection = undefined;
    municipalitySelection = undefined;
    divipol:any;
    filteredRoles: [string, string][] = []; // Roles filtrados dinámicamente



    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private _divipolService: DivipolService,
        private router: Router,
    ) {
        this.roles = Object.entries(Roles);
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            name: new FormControl('', [Validators.required, this.noNumbersValidator()]),
            identificationType: new FormControl('', [Validators.required]),
            identification: new FormControl('', [Validators.required]),
            role: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            contactPhone: new FormControl('', [Validators.pattern(/^\d{10}$/)]),
            municipalityId:new FormControl('', [Validators.required]),
            linkageType:new FormControl('', [Validators.required]),
        });
        this.user = {};
        this.user.id = this.activatedRoute.snapshot.paramMap.get('id');
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
        this.userService.getUserById(this.user.id).subscribe({
            next: (response: any) => {
                this.loading = false;
                this.user = response.user;
                this.form.patchValue(this.user);
                this.form.get('municipalityId')?.setValue(this.user.divipolaId);
                this.form.get('linkageType')?.setValue(this.user.linkageType);
                this.form.get('role')?.setValue(this.user.role);
                this.form.get('contactPhone')?.setValue(this.user.contactPhone);
            },
        });
        this._divipolService.getAll().subscribe({
            next: (response:any) => {
                this.divipol = response.divipolas
            }   
        })
    }

    ngOnDestroy(): void {
    }

    isFormValid(): boolean {
        const requiredFields = [
          'email',
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

    editUser() {
        const cleanedObject = Object.entries(this.form.value).reduce((accumulator: any, [key, value]) => {
            if (value !== '') {
              accumulator[key] = value;
            }
            return accumulator;
          }, {});
          this.loading = true;
        this.userService.editUser(this.user.id, cleanedObject).subscribe({
            next: (response: any) => {
                this.loading = false;
                Swal.fire(
                    'Operación correcta',
                    'Usuario editado correctamente',
                    'success'
                );
                this.router.navigateByUrl('/app/user')
            },
            error: (error) => {
                this.loading = false;
                console.error(error);
                Swal.fire(
                    'Operación incorrecta',
                    'No se ha podido editar el usuario',
                    'error'
                );
            },
        });
    }

}
