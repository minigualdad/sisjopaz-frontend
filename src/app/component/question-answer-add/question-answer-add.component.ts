import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionAnswerService } from '../../service/question-answer.service';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-question-answer-add',
  standalone: false,
  templateUrl: './question-answer-add.component.html',
  styleUrl: './question-answer-add.component.scss'
})
export class QuestionAnswerAddComponent {
  question: any;
  form: FormGroup;

  constructor(private questionAnswerService: QuestionAnswerService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.form = new FormGroup({
      questionId: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required)
    });
    this.question = {};
    this.question.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.controls['questionId'].setValue(this.question.id);
  }
  ngOnInit() {
    this.showQuestion();
  }

  showQuestion(){
    this.questionService.show(this.question.id)
    .subscribe((response: any) => {
      this.question = response.question;
    })
  }


  async create() {
    await this.questionAnswerService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Respuesta creada correctamente', 'success');
          this.router.navigateByUrl(`/app/question-answer/${this.question.questionGroupId}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear la respuesta', 'error');
        }
      });
  }
}
