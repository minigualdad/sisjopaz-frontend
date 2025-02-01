import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionGroupService } from '../../service/question-group.service';

@Component({
  selector: 'app-question-group-add',
  standalone: false,
  templateUrl: './question-group-add.component.html',
  styleUrl: './question-group-add.component.scss'
})
export class QuestionGroupAddComponent {
  form: FormGroup;

  constructor(private questionGroupService: QuestionGroupService,
    private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
  }


  async create() {
    await this.questionGroupService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Categoría de preguntas creados correctamente', 'success');
          this.router.navigateByUrl(`/app/question-group`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear categoría de preguntas', 'error');
        }
      });
  }

}
