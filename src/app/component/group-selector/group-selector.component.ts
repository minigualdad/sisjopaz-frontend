import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-group-selector',
  standalone: false,
  templateUrl: './group-selector.component.html',
  styleUrl: './group-selector.component.scss'
})
export class GroupSelectorComponent {
  form: FormGroup;
  groups: any = [];
  @Output() groupIdListen: EventEmitter<number> = new EventEmitter();
  @Input() group?: number;

  constructor(
    private groupService: GroupService,
  ) {

    this.form = new FormGroup({
      coresponsabilityId: new FormControl('', [Validators.required]),
    });


    this.groupService.getAll()
      .subscribe({
        next: (response: any) => {
          this.groups = response.groups;
          if (this.group) {
            this.form.patchValue({ coresponsabilityId: this.group });
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
      if (this.group) {
        this.form.patchValue({ coresponsabilityId: this.group });
      }
    }, 300);

  }

  selectGroupId(event: any) {
    this.groupIdListen.emit(event.value);
  }
}
