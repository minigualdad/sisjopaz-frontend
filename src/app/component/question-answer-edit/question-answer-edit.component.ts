import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionAnswerService } from '../../service/question-answer.service';

@Component({
  selector: 'app-question-answer-edit',
  standalone: false,
  templateUrl: './question-answer-edit.component.html',
  styleUrl: './question-answer-edit.component.scss'
})
export class QuestionAnswerEditComponent {
  questionAnswer: any;
  form: FormGroup;

  constructor(private questionAnswerService: QuestionAnswerService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      questionId: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),   
    });
    this.questionAnswer = {};
    this.questionAnswer.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.questionAnswerService.show(this.questionAnswer.id )
      .subscribe({
        next: (response: any) => {
          this.questionAnswer = response.questionAnswer;
            this.form.patchValue(response.questionAnswer);
        }
      });
  }
  async edit() {
    this.questionAnswerService.edit(this.questionAnswer.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Respuesta editada correctamente', 'success');
          this.router.navigateByUrl(`/app/question-answer/${this.questionAnswer.questionId}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar la respuesta', 'error');
        }
        
    });
  }
}
