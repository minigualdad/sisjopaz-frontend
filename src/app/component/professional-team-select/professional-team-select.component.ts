import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfessionalTeamService } from '../../service/professional-team.service';

@Component({
    selector: 'app-professional-team-select',
    templateUrl: './professional-team-select.component.html',
    styleUrl: './professional-team-select.component.scss',
    standalone: false
})
export class ProfessionalTeamSelectComponent {
  form: FormGroup;
  professionalTeams: any = [];
  @Output() professionalTeamIdListen: EventEmitter<number> = new EventEmitter();
  @Input() professionalTeam?: number;

  constructor(
    private professionalTeamService: ProfessionalTeamService,
  ) {

    this.form = new FormGroup({
      professionalTeamId: new FormControl('', [Validators.required]),
    });


    this.professionalTeamService.getAll()
      .subscribe({
        next: (response: any) => {
          this.professionalTeams = response.professionalTeams;
          if (this.professionalTeam) {
            this.form.patchValue({ professionalTeamId: this.professionalTeam });
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
      if (this.professionalTeam) {
        this.form.patchValue({ professionalTeamId: this.professionalTeam });
      }
    }, 300);

  }

  selectProfessionalTeamId(event: any) {
    this.professionalTeamIdListen.emit(event.value);
  }
}
