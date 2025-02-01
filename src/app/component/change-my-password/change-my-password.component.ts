import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-change-my-password',
    standalone: false,
    templateUrl: './change-my-password.component.html',
    styleUrl: './change-my-password.component.scss'
})
export class ChangeMyPasswordComponent {
    form: FormGroup;

    showPasswordCurrent: boolean = false;
    showPasswordNew: boolean = false;
    loading = false;
    passwordsDoNotMatch: boolean = false;
    token = '';
    passwordIsValid: boolean = false;
    isView: boolean = true;

    passwordValidations = {
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    };

    /**
     * Constructor
     */
    constructor(
        private userService: UserService,
        private titleService: Title,
        private fb: FormBuilder,
        private router: Router) {
        this.form = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            currentPassword: ['', Validators.required],
        }, {
            validators: this.passwordsMatchValidator
        });
        this.titleService.setTitle('Cambiar Contraseña');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }
    passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            return { passwordsDoNotMatch: true };
        }
        return null;
    }

    validatePasswords() {
        const password = this.form.get('password')?.value;
        const confirmPassword = this.form.get('confirmPassword')?.value;

        this.passwordsDoNotMatch = password !== confirmPassword;
    }

    changePassword() {
        this.loading = true;
        this.userService.changePassword(this.form.value.currentPassword, this.form.value.password)
            .subscribe((res) => {
                this.loading = false;
                Swal.fire('Éxito', 'La contraseña se ha cambiado correctamente', 'success');
                this.router.navigateByUrl('/app/home');
            }, (err) => {
                this.loading = false;
                console.error(err)
                Swal.fire('Error', 'La contraseña actual no es correcta', 'error');
            });
    }

    toggleView() {
        this.isView = !this.isView;
    }

    checkPassword(event: Event) {
        const input = event.target as HTMLInputElement;
        const password = input.value;

        this.passwordValidations.minLength = password.length >= 8;
        this.passwordValidations.uppercase = /[A-Z]/.test(password);
        this.passwordValidations.lowercase = /[a-z]/.test(password);
        this.passwordValidations.number = /[0-9]/.test(password);
        this.passwordValidations.specialChar = /[!@#$%^&*]/.test(password);

        this.passwordIsValid = Object.values(this.passwordValidations).every(value => value);
    }
}
