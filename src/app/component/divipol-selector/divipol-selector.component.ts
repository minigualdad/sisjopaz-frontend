import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DivipolService } from '../../service/divipol.service';
@Component({
    selector: 'app-divipol-selector',
    templateUrl: './divipol-selector.component.html',
    styleUrl: './divipol-selector.component.scss',
    standalone: false
})
export class DivipolSelectorComponent {
  form: FormGroup;
  divipols: any = [];
  @Output() divipolIdListen: EventEmitter<number> = new EventEmitter();
  @Input() divipol?: number;
  filteredDivipols = [...this.divipols];
  searchText: string = '';

  constructor(
    private divipolService: DivipolService,
  ) {

    this.form = new FormGroup({
      divipolId: new FormControl('', [Validators.required]),
    });


    this.divipolService.getAll()
      .subscribe({
        next: (response: any) => {
          this.divipols = response.divipolas;
          if (this.divipol) {
            this.form.patchValue({ divipolId: this.divipol });
          }
        }
      });
  }
  ngOnInit() {
    this.checkValue();
  }

  AfterViewInit(){
    this.checkValue();
  }

  filterOptions() {
    const searchLower = this.searchText.toLowerCase();
    this.filteredDivipols = this.divipols.filter((divipol: any) =>
      `${divipol.ListDepartment.name} - ${divipol.name}`.toLowerCase().includes(searchLower)
    );
  }
  ngAfterContentInit() {
  }

  checkValue() {
    setTimeout(() => {
      if (this.divipol) {
        this.form.patchValue({ divipolId: this.divipol });
      }
    }, 300);

  }

  selectDivipolId(event: any) {
    this.divipolIdListen.emit(event.value);
  }
}
