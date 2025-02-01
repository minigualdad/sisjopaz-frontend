import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionGroupService } from '../../service/question-group.service';

@Component({
  selector: 'app-question-group-selector',
  standalone: false,
  templateUrl: './question-group-selector.component.html',
  styleUrl: './question-group-selector.component.scss'
})
export class QuestionGroupSelectorComponent {
  form: FormGroup;
  questionGroups: any = [];
  @Output() questionGroupIdListen: EventEmitter<number> = new EventEmitter();
  @Input() questionGroup?: number;

  constructor(
    private questionGroupService: QuestionGroupService,
  ) {

    this.form = new FormGroup({
      questionGroupId: new FormControl('', [Validators.required]),
    });


    this.questionGroupService.getAll()
      .subscribe({
        next: (response: any) => {
          this.questionGroups = response.questionGroups;
          if (this.questionGroup) {
            this.form.patchValue({ questionGroupId: this.questionGroup });
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
      if (this.questionGroup) {
        this.form.patchValue({ questionGroupId: this.questionGroup });
      }
    }, 300);

  }

  selectQuestionGroupId(event: any) {
    this.questionGroupIdListen.emit(event.value);
  }
}
