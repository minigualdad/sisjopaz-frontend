import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGroupSelectorComponent } from './date-group-selector.component';

describe('DateGroupSelectorComponent', () => {
  let component: DateGroupSelectorComponent;
  let fixture: ComponentFixture<DateGroupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateGroupSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
