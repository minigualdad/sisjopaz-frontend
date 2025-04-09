import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsssitanceDetectedComponent } from './asssitance-detected.component';

describe('AsssitanceDetectedComponent', () => {
  let component: AsssitanceDetectedComponent;
  let fixture: ComponentFixture<AsssitanceDetectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsssitanceDetectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsssitanceDetectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
