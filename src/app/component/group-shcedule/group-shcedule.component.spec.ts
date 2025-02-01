import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupShceduleComponent } from './group-shcedule.component';

describe('GroupShceduleComponent', () => {
  let component: GroupShceduleComponent;
  let fixture: ComponentFixture<GroupShceduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupShceduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupShceduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
