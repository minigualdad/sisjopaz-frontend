import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentGroupEditComponent } from './component-group-edit.component';

describe('ComponentGroupEditComponent', () => {
  let component: ComponentGroupEditComponent;
  let fixture: ComponentFixture<ComponentGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentGroupEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
