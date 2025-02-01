import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../../service/component.service';
@Component({
    selector: 'app-component-selector',
    templateUrl: './component-selector.component.html',
    styleUrl: './component-selector.component.scss',
    standalone: false
})
export class ComponentSelectorComponent {
  form: FormGroup;
  components: any = [];
  @Output() componentIdListen: EventEmitter<number> = new EventEmitter();
  @Input() component?: number;

  constructor(
    private componentService: ComponentService,
  ) {

    this.form = new FormGroup({
      componentId: new FormControl('', [Validators.required]),
    });


    this.componentService.getAll()
      .subscribe({
        next: (response: any) => {
          this.components = response.components;
          if (this.component) {
            this.form.patchValue({ componentId: this.component });
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
      if (this.component) {
        this.form.patchValue({ componentId: this.component });
      }
    }, 300);

  }

  selectComponentId(event: any) {
    this.componentIdListen.emit(event.value);
  }
}
