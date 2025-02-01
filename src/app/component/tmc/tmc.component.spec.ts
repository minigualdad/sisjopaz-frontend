import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TMCComponent } from './tmc.component';

describe('TMCComponent', () => {
  let component: TMCComponent;
  let fixture: ComponentFixture<TMCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TMCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
