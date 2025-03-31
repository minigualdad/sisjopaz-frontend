import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceGeneratesTableComponent } from './assistance-generates-table.component';

describe('AssistanceGeneratesTableComponent', () => {
  let component: AssistanceGeneratesTableComponent;
  let fixture: ComponentFixture<AssistanceGeneratesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceGeneratesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceGeneratesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
