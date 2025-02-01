import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PointService } from '../../service/point.service';

@Component({
  selector: 'app-point-selector',
  standalone: false,
  templateUrl: './point-selector.component.html',
  styleUrl: './point-selector.component.scss'
})
export class PointSelectorComponent implements OnChanges {
  form: FormGroup;
  points: any = [];
  @Output() pointIdListen: EventEmitter<number> = new EventEmitter();
  @Input() point?: number;
  @Input() divipolaId?: number;


  constructor(
    private pointService: PointService,
  ) {

    this.form = new FormGroup({
      pointId: new FormControl('', [Validators.required]),
    });

  }
  ngOnInit() {
    this.checkValue();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['divipolaId'] && changes['divipolaId'].currentValue) {
      this.checkValue();
    }
  }

  ngAfterContentInit() {
  }

  checkValue() {
    setTimeout(() => {
      if(this.divipolaId){
        this.pointService.getAllByDivipola(this.divipolaId)
        .subscribe({
          next: (response: any) => {
            this.points = response.points;
            if (this.point) {
              this.form.patchValue({ pointId: this.point });
            }
          }
        });
      }
      if (this.point) {

        this.form.patchValue({ pointId: this.point });
      }
    }, 300);

  }

  selectPointId(event: any) {
    this.pointIdListen.emit(event.value);
  }
}
