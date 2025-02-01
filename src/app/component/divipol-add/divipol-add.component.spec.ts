import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivipolAddComponent } from './divipol-add.component';

describe('DivipolAddComponent', () => {
  let component: DivipolAddComponent;
  let fixture: ComponentFixture<DivipolAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivipolAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivipolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
