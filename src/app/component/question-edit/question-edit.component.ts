import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-question-edit',
  standalone: false,
  templateUrl: './question-edit.component.html',
  styleUrl: './question-edit.component.scss'
})
export class QuestionEditComponent {
  question: any;
  form: FormGroup;

  constructor(private questionService: QuestionService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      questionGroupId: new FormControl('', Validators.required),
      subGroup: new FormControl('', Validators.required),
      subGroupDesciption: new FormControl('', Validators.required),
      question: new FormControl('', Validators.required),
      isMandatory: new FormControl('', Validators.required),
      questionObservations: new FormControl('', Validators.required),
      dataType: new FormControl('', Validators.required),
      typeAnswer: new FormControl('', Validators.required),
      orderQuestion: new FormControl('', Validators.required),
      typeQuestion: new FormControl('', Validators.required),
    });
    this.question = {};
    this.question.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.questionService.show(this.question.id )
      .subscribe({
        next: (response: any) => {
          this.question = response.question;
            this.form.patchValue(response.question);
        }
      });
  }
  async edit() {
    this.questionService.edit(this.question.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Pregunta editada correctamente', 'success');
          this.router.navigateByUrl(`/app/question/${this.question.questionGroupId}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar la pregunta', 'error');
        }
        
    });
  }
}
