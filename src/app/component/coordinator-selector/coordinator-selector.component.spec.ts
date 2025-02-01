import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorSelectorComponent } from './coordinator-selector.component';

describe('CoordinatorSelectorComponent', () => {
  let component: CoordinatorSelectorComponent;
  let fixture: ComponentFixture<CoordinatorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatorSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
