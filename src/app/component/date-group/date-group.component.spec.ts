import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGroupComponent } from './date-group.component';

describe('DateGroupComponent', () => {
  let component: DateGroupComponent;
  let fixture: ComponentFixture<DateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
