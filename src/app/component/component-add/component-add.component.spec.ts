import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAddComponent } from './component-add.component';

describe('ComponentAddComponent', () => {
  let component: ComponentAddComponent;
  let fixture: ComponentFixture<ComponentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
