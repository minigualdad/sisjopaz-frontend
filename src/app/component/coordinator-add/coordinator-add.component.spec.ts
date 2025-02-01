import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorAddComponent } from './coordinator-add.component';

describe('CoordinatorAddComponent', () => {
  let component: CoordinatorAddComponent;
  let fixture: ComponentFixture<CoordinatorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatorAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
