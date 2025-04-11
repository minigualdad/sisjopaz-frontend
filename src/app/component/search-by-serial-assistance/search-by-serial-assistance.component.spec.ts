import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBySerialAssistanceComponent } from './search-by-serial-assistance.component';

describe('SearchBySerialAssistanceComponent', () => {
  let component: SearchBySerialAssistanceComponent;
  let fixture: ComponentFixture<SearchBySerialAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBySerialAssistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBySerialAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
