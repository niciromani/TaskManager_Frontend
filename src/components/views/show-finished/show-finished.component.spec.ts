import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFinishedComponent } from './show-finished.component';

describe('ShowFinishedComponent', () => {
  let component: ShowFinishedComponent;
  let fixture: ComponentFixture<ShowFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
