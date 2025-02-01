import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionalLinkService } from '../../service/regional-link.service';

@Component({
  selector: 'app-regional-link-selector',
  standalone: false,
  templateUrl: './regional-link-selector.component.html',
  styleUrl: './regional-link-selector.component.scss'
})
export class RegionalLinkSelectorComponent {
  form: FormGroup;
  regionalLinks: any = [];
  @Output() regionalLinkIdListen: EventEmitter<number> = new EventEmitter();
  @Input() regionalLink?: number;

  constructor(
    private regionalLinkService: RegionalLinkService,
  ) {

    this.form = new FormGroup({
      regionalLinkId: new FormControl('', [Validators.required]),
    });


    this.regionalLinkService.getAll()
      .subscribe({
        next: (response: any) => {
          this.regionalLinks = response.regionalLinks;
          if (this.regionalLink) {
            this.form.patchValue({ regionalLinkId: this.regionalLink });
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
      if (this.regionalLink) {
        this.form.patchValue({ regionalLinkId: this.regionalLink });
      }
    }, 300);

  }

  selectRegionalLinkId(event: any) {
    this.regionalLinkIdListen.emit(event.value);
  }
}
