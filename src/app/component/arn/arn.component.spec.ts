import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArnComponent } from './arn.component';

describe('ArnComponent', () => {
  let component: ArnComponent;
  let fixture: ComponentFixture<ArnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
