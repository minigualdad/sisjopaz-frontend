import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCharacterizationComponent } from './pending-characterization.component';

describe('PendingCharacterizationComponent', () => {
  let component: PendingCharacterizationComponent;
  let fixture: ComponentFixture<PendingCharacterizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingCharacterizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingCharacterizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
