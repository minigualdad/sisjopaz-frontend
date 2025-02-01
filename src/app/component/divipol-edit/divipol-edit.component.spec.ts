import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivipolEditComponent } from './divipol-edit.component';

describe('DivipolEditComponent', () => {
  let component: DivipolEditComponent;
  let fixture: ComponentFixture<DivipolEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivipolEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivipolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
