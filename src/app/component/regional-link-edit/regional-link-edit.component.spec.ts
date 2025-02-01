import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalLinkEditComponent } from './regional-link-edit.component';

describe('RegionalLinkEditComponent', () => {
  let component: RegionalLinkEditComponent;
  let fixture: ComponentFixture<RegionalLinkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionalLinkEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalLinkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
