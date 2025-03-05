import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnecValidatedComponent } from './rnec-validated.component';

describe('RnecValidatedComponent', () => {
  let component: RnecValidatedComponent;
  let fixture: ComponentFixture<RnecValidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnecValidatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RnecValidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
