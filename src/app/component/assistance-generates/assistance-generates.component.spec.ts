import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceGeneratesComponent } from './assistance-generates.component';

describe('AssistanceGeneratesComponent', () => {
  let component: AssistanceGeneratesComponent;
  let fixture: ComponentFixture<AssistanceGeneratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceGeneratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceGeneratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
