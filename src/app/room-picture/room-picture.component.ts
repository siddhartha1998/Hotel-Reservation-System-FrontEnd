import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { RoomPicture } from './roomPicture.model';
import {Location} from '@angular/common';


@Component({
  selector: 'app-room-picture',
  templateUrl: './room-picture.component.html',
  styleUrls: ['./room-picture.component.css']
})
export class RoomPictureComponent implements OnInit {

  id:any[]=[];
  value:any;
  showRoomImage:boolean=true;
  retrievedImage: any;
  collectionOfRoomImages:Array<RoomPicture>;
  uploadDir:any;
  roomPictureDetail:any;
  fileName:any;
  fileType:any;
  uploadedBy:any;
  uploadedTime:any;

  constructor(private activatedRouter:ActivatedRoute,
    private userService:UserService,
    private snackBar : MatSnackBar,
    private location :  Location
    ) {
      this.collectionOfRoomImages = new Array<RoomPicture>();
     }

  ngOnInit(): void {
    this.value = this.activatedRouter.snapshot.paramMap.get("id");
      
    this.userService.getPictureOfRoom(this.value).subscribe(
      res=>{
        this.roomPictureDetail=res;
        if(res.length == 0){
          this.showRoomImage = false;
        }else{
  
        for(let i =0; i< res.length; i++){
          // this.id[i] = res[i].id;

          this.uploadDir = res[i].uploadDir;
          if(this.uploadDir!=null){
          this.userService.loadRoomPicture(this.uploadDir).subscribe(
           (res:Blob)=>{

            let reader=new FileReader();
            reader.addEventListener("load",()=>{
              this.retrievedImage=reader.result;
              this.collectionOfRoomImages[i]= this.retrievedImage;
              this.showRoomImage=true;
            },
            false);
            if(res){
              reader.readAsDataURL(res);
            }
            },
            err=>{
              console.log(err);
            }
          );
            }
        }
      }
     
      },
      err=>{
        this.retrievedImage = null;
        console.log(err);
        this.showRoomImage=false;
      }
    
    );
    console.log(this.collectionOfRoomImages);
  }   

  refresh(){
    window.location.reload();
  }
  backClicked(){
      this.location.back();
      }

  deleteRoomPicture(id:any){
    this.userService.deleteRoomPic(id).subscribe(
  res=>{
    this.snackBar.open(res.message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['red-snackBar'],
    });
    this.refresh();
  },
  
  err=>{
    console.log(err);
  }
    );
  }
} 
