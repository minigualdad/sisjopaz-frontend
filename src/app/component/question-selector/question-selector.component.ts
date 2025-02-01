import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../service/question.service';
@Component({
  selector: 'app-question-selector',
  standalone: false,
  templateUrl: './question-selector.component.html',
  styleUrl: './question-selector.component.scss'
})
export class QuestionSelectorComponent {
  form: FormGroup;
  questions: any = [];
  @Output() questionIdListen: EventEmitter<number> = new EventEmitter();
  @Input() question?: number;

  constructor(
    private questionService: QuestionService,
  ) {

    this.form = new FormGroup({
      questionId: new FormControl('', [Validators.required]),
    });


    this.questionService.getAll()
      .subscribe({
        next: (response: any) => {
          this.questions = response.questions;
          if (this.question) {
            this.form.patchValue({ questionId: this.question });
          }
        }
      });
  }
  ngOnInit() {
    this.checkValue();

  }

  ngAfterContentInit() {
  }

  checkValue() {
    setTimeout(() => {
      if (this.question) {
        this.form.patchValue({ questionId: this.question });
      }
    }, 300);

  }

  selectQuestionId(event: any) {
    this.questionIdListen.emit(event.value);
  }
}
