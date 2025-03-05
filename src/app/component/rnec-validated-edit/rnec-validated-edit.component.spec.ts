import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnecValidatedEditComponent } from './rnec-validated-edit.component';

describe('RnecValidatedEditComponent', () => {
  let component: RnecValidatedEditComponent;
  let fixture: ComponentFixture<RnecValidatedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnecValidatedEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RnecValidatedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
