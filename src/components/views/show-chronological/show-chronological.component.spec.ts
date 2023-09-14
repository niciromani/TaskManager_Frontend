import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChronologicalComponent } from './show-chronological.component';

describe('ShowChronologicalComponent', () => {
  let component: ShowChronologicalComponent;
  let fixture: ComponentFixture<ShowChronologicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowChronologicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowChronologicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
