import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceTableFixedComponent } from './assistance-table-fixed.component';

describe('AssistanceTableFixedComponent', () => {
  let component: AssistanceTableFixedComponent;
  let fixture: ComponentFixture<AssistanceTableFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceTableFixedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceTableFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
