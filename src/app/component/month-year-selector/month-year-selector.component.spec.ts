import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthYearSelectorComponent } from './month-year-selector.component';

describe('MonthYearSelectorComponent', () => {
  let component: MonthYearSelectorComponent;
  let fixture: ComponentFixture<MonthYearSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthYearSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthYearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
