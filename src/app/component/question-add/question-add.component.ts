import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../service/question.service';
@Component({
  selector: 'app-question-add',
  standalone: false,
  templateUrl: './question-add.component.html',
  styleUrl: './question-add.component.scss'
})
export class QuestionAddComponent {
  questionGroup: any;
  form: FormGroup;

  constructor(private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
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
      state: new FormControl('', Validators.required)
    });
    this.questionGroup = {};
    this.questionGroup.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.controls['questionGroupId'].setValue(this.questionGroup.id);

  }
  ngOnInit() {
  }


  async create() {
    await this.questionService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Pregunta creada correctamente', 'success');
          this.router.navigateByUrl(`/app/question/${this.questionGroup.id}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear la pregunta', 'error');
        }
      });
  }
}
