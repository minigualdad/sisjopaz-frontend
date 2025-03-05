import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointIndexComponent } from './point-index.component';

describe('PointIndexComponent', () => {
  let component: PointIndexComponent;
  let fixture: ComponentFixture<PointIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
