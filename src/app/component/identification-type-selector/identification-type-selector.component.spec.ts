import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationTypeSelectorComponent } from './identification-type-selector.component';

describe('IdentificationTypeSelectorComponent', () => {
  let component: IdentificationTypeSelectorComponent;
  let fixture: ComponentFixture<IdentificationTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentificationTypeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentificationTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
