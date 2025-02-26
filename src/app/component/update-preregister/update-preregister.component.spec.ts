import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreregisterComponent } from './update-preregister.component';

describe('UpdatePreregisterComponent', () => {
  let component: UpdatePreregisterComponent;
  let fixture: ComponentFixture<UpdatePreregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePreregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePreregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
