import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentGroupAddComponent } from './component-group-add.component';

describe('ComponentGroupAddComponent', () => {
  let component: ComponentGroupAddComponent;
  let fixture: ComponentFixture<ComponentGroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentGroupAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
