import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  authError = false;
  errormessage = "";
  showError = false;
  validationTimer: any;

  // Expresión regular para validar el formato del email
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  form = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]
    ),
  });

  constructor(private _userServices: UserService, private route: Router){

  }

  ngOnInit(): void {}

  // Inicia el temporizador de 6 segundos para la validación
  startValidationTimer() {
    if (this.validationTimer) {
      clearTimeout(this.validationTimer);
    }

    this.validationTimer = setTimeout(() => {
      this.validateEmail();
    }, 6000); // 6 segundos
  }

  // Valida el email y muestra el error si es inválido
  validateEmail() {
    const emailControl = this.form.get('email');
    if (emailControl?.invalid) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }

  // Evita que el temporizador se ejecute si el usuario envía el formulario
  onSubmit() {
    const email = 
    clearTimeout(this.validationTimer);
    this.validateEmail();
    if (this.form.valid) {
      this.showError = false;
      this._userServices.forgotpassword(this.form.value).subscribe({
        next: (response:any) => {
          this.authError = true;
          this.errormessage = 'Si el correo ingresado está registrado, te enviaremos un enlace para restablecer tu contraseña.'
        },
        error : (error:any) => {
          this.authError = true;
          this.errormessage = 'Si el correo ingresado está registrado, te enviaremos un enlace para restablecer tu contraseña.'
        }
      })

    }
  }

  navigateLogin(){
    this.route.navigate(['/login']);
  }

}
