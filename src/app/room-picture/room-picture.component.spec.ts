import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPictureComponent } from './room-picture.component';

describe('RoomPictureComponent', () => {
  let component: RoomPictureComponent;
  let fixture: ComponentFixture<RoomPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
