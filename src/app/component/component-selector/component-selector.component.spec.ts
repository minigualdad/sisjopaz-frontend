import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoresponsabilitySelectorComponent } from './component-selector.component';

describe('CoresponsabilitySelectorComponent', () => {
  let component: CoresponsabilitySelectorComponent;
  let fixture: ComponentFixture<CoresponsabilitySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoresponsabilitySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoresponsabilitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
