import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupComponentSheetService } from '../../service/group-component-sheet.service';
import { environment } from '../../../enviroment/enviroment';

@Component({
  selector: 'app-image-group-component',
  standalone: false,
  templateUrl: './image-group-component.component.html',
  styleUrl: './image-group-component.component.scss'
})
export class ImageGroupComponentComponent implements OnChanges {
  form: FormGroup;
  groupComponentSheets: any = [];
  @Output() groupSheetIdListen: EventEmitter<number> = new EventEmitter();
  @Input() groupComponentId?: any;
  @Input() reload?: boolean;

  currentIndex = 0;
  server: any = environment.apiUrl;
  isValidImage = true;
  constructor(
    private groupComponentSheetService: GroupComponentSheetService,
  ) {
    this.form = new FormGroup({
      groupComponentId: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.checkValue();
  }

  ngAfterContentInit() {
    this.checkValue();
  }

  ngOnChanges(){
    if(this.reload === true){
      this.checkValue()
    }
  }

  getAll() {
    if (this.groupComponentId) {
      this.groupComponentSheetService.getAllByGroupComponent(this.groupComponentId)
        .subscribe({
          next: (response: any) => {
           this.groupComponentSheets = response.groupComponentSheets.map((sheet: any) => {
        return {
          ...sheet,
          imageUrl: `${this.server}/${sheet.imageUrl}`
        };
      });

      if (this.groupComponentId) {
        this.form.patchValue({ groupComponentId: this.groupComponentId });
      }
          }
        });
    }
  }

  checkValue() {
    setTimeout(() => {
      if (this.groupComponentId) {
        this.getAll();
        this.form.patchValue({ groupComponentId: this.groupComponentId });
      }
    }, 300);

  }

next() {
  this.currentIndex = (this.currentIndex + 1) % this.groupComponentSheets.length;
  this.isValidImage = true;
}

prev() {
  this.currentIndex = (this.currentIndex - 1 + this.groupComponentSheets.length) %
    this.groupComponentSheets.length;
  this.isValidImage = true;

}

onImageError() {
  this.isValidImage = false;
}

}
