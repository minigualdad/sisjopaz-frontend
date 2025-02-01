import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueOptionComponent } from './unique-option.component';

describe('UniqueOptionComponent', () => {
  let component: UniqueOptionComponent;
  let fixture: ComponentFixture<UniqueOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniqueOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
