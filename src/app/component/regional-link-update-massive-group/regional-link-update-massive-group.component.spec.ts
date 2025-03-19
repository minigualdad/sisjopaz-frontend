import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalLinkUpdateMassiveGroupComponent } from './regional-link-update-massive-group.component';

describe('RegionalLinkUpdateMassiveGroupComponent', () => {
  let component: RegionalLinkUpdateMassiveGroupComponent;
  let fixture: ComponentFixture<RegionalLinkUpdateMassiveGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionalLinkUpdateMassiveGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalLinkUpdateMassiveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
