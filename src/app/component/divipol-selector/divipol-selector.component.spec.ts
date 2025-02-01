import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivipolSelectorComponent } from './divipol-selector.component';

describe('DivipolSelectorComponent', () => {
  let component: DivipolSelectorComponent;
  let fixture: ComponentFixture<DivipolSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivipolSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivipolSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
