import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssitanceComponentByMonthComponent } from './assitance-component-by-month.component';

describe('AssitanceComponentByMonthComponent', () => {
  let component: AssitanceComponentByMonthComponent;
  let fixture: ComponentFixture<AssitanceComponentByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssitanceComponentByMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssitanceComponentByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
