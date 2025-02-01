import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  form: FormGroup;
  passwordsDoNotMatch: boolean = false;
  token = '';
  passwordIsValid: boolean = false;
  isView: boolean = true;


  // Validaciones dinámicas para los requisitos de la contraseña
  passwordValidations = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: this.passwordsMatchValidator 
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.userService.verifyToken(this.token).subscribe({
      next: (response) => {
        const data = response.data;
        this.form.get('email')?.setValue(data.email);
      }, error: (error) => {
        this.router.navigate(['**']);
      }
    });
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

  onSubmit() {
    if (this.form.valid && !this.passwordsDoNotMatch) {
      const password = this.form.get('password')?.value;
      this.userService.resetPassword(this.token, password).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Contraseña restablecida!',
            text: 'Tu contraseña se ha restablecido correctamente.',
            icon: 'success',
            confirmButtonText: 'Ir a Login'
          }).then(() => {
            this.router.navigate(['/login']);
          });
        }, error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error?.error?.message || 'Hubo un problema al restablecer la contraseña.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
          });
        }
      });
    }
  }
}
