import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnpComponent } from './dnp.component';

describe('DnpComponent', () => {
  let component: DnpComponent;
  let fixture: ComponentFixture<DnpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DnpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
