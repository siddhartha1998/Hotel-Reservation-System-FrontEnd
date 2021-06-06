import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPictureComponent } from './hotel-picture.component';

describe('HotelPictureComponent', () => {
  let component: HotelPictureComponent;
  let fixture: ComponentFixture<HotelPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
