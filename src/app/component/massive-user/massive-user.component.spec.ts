import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassiveUserComponent } from './massive-user.component';

describe('MassiveUserComponent', () => {
  let component: MassiveUserComponent;
  let fixture: ComponentFixture<MassiveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassiveUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassiveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
