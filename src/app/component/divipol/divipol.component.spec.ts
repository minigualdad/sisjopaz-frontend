import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivipolComponent } from './divipol.component';

describe('DivipolComponent', () => {
  let component: DivipolComponent;
  let fixture: ComponentFixture<DivipolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivipolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivipolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
