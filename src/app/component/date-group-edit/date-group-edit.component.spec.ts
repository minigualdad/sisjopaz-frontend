import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGroupEditComponent } from './date-group-edit.component';

describe('DateGroupEditComponent', () => {
  let component: DateGroupEditComponent;
  let fixture: ComponentFixture<DateGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateGroupEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
