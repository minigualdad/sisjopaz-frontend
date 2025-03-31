import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurverMassiveUpdateComponent } from './surver-massive-update.component';

describe('SurverMassiveUpdateComponent', () => {
  let component: SurverMassiveUpdateComponent;
  let fixture: ComponentFixture<SurverMassiveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurverMassiveUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurverMassiveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
