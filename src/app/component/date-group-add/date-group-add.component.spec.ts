import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGroupAddComponent } from './date-group-add.component';

describe('DateGroupAddComponent', () => {
  let component: DateGroupAddComponent;
  let fixture: ComponentFixture<DateGroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateGroupAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
