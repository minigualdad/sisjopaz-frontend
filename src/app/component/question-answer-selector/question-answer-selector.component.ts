import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionAnswerService } from '../../service/question-answer.service';

@Component({
  selector: 'app-question-answer-selector',
  standalone: false,
  templateUrl: './question-answer-selector.component.html',
  styleUrl: './question-answer-selector.component.scss'
})
export class QuestionAnswerSelectorComponent {
 form: FormGroup;
  questionAnswers: any = [];
  @Output() questionAnswerIdListen: EventEmitter<number> = new EventEmitter();
  @Input() questionAnswer?: number;

  constructor(
    private questionAnswerService: QuestionAnswerService,
  ) {

    this.form = new FormGroup({
      questionAnswerId: new FormControl('', [Validators.required]),
    });


    this.questionAnswerService.getAll()
      .subscribe({
        next: (response: any) => {
          this.questionAnswers = response.questionAnswers;
          if (this.questionAnswer) {
            this.form.patchValue({ questionAnswerId: this.questionAnswer });
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
      if (this.questionAnswer) {
        this.form.patchValue({ questionAnswerId: this.questionAnswer });
      }
    }, 300);

  }

  selectQuestionAnswerId(event: any) {
    this.questionAnswerIdListen.emit(event.value);
  }
}
