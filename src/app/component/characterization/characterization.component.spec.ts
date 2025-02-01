import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterizationComponent } from './characterization.component';

describe('CharacterizationComponent', () => {
  let component: CharacterizationComponent;
  let fixture: ComponentFixture<CharacterizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
