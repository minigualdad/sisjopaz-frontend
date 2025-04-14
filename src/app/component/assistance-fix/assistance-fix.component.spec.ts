import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceFixComponent } from './assistance-fix.component';

describe('AssistanceFixComponent', () => {
  let component: AssistanceFixComponent;
  let fixture: ComponentFixture<AssistanceFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceFixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
