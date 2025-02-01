import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentGroupTemplateComponent } from './component-group-template.component';

describe('ComponentGroupTemplateComponent', () => {
  let component: ComponentGroupTemplateComponent;
  let fixture: ComponentFixture<ComponentGroupTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentGroupTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentGroupTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
