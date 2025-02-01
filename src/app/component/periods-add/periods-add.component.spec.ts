import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodsAddComponent } from './periods-add.component';

describe('PeriodsAddComponent', () => {
  let component: PeriodsAddComponent;
  let fixture: ComponentFixture<PeriodsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
