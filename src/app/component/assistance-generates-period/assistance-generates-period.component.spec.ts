import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceGeneratesPeriodComponent } from './assistance-generates-period.component';

describe('AssistanceGeneratesPeriodComponent', () => {
  let component: AssistanceGeneratesPeriodComponent;
  let fixture: ComponentFixture<AssistanceGeneratesPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceGeneratesPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceGeneratesPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
