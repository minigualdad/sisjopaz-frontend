import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMassiveGroupComponent } from './update-massive-group.component';

describe('UpdateMassiveGroupComponent', () => {
  let component: UpdateMassiveGroupComponent;
  let fixture: ComponentFixture<UpdateMassiveGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMassiveGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMassiveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
