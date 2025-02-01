import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorEditComponent } from './coordinator-edit.component';

describe('CoordinatorEditComponent', () => {
  let component: CoordinatorEditComponent;
  let fixture: ComponentFixture<CoordinatorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatorEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
