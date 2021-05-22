import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  form:any;
  isSuccessful=false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
