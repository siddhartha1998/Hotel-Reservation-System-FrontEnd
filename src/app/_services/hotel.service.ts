import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
    providedIn: 'root',
  })
export class HotelService implements OnInit{
    currentUser: any;
    msg: any;

    constructor(private http: HttpClient, private token: TokenStorageService){

    }

    ngOnInit(){
      this.currentUser=this.token.getUser();
    }

    getHotelById(id:any):Observable<any>{
        return this.http.get(environment.apiUrls + 'hotel/getMyHotelById/' +id,{responseType:'json'});
    }

    editHotelDetail( id: any,  hotelName: any,  hotelOwner: any,  city: any,
      hotelAddress: any,  panNumber: any, phone: any,  description: any
    ): Observable<any> {
      return this.http.put(
        environment.apiUrls + 'hotel/updateHotelDetail/' + id,
        {
          hotelName: hotelName,
          hotelOwner: hotelOwner,
          city: city,
          hotelAddress: hotelAddress,
          panNumber: panNumber,
          phone: phone,
          description: description,
        },
        { responseType: 'json' }
      );
    }

    addHotelPicture(hotelId: Number, hotelPic: FormData): Observable<any> {
      return this.http.post(
        environment.apiUrls +
          'hotelPicture/addPictureForHotel/' +
          hotelId,
          hotelPic,
        {
          reportProgress: true,
          observe: 'events',
        }
      );
    }

    addHotelDocument(hotelId: Number, hotelDocument: FormData): Observable<any> {
      return this.http.post(
        environment.apiUrls +
          'hotelDocument/addDocumentForHotel/' +
          hotelId,
          hotelDocument,
        {
          reportProgress: true,
          observe: 'events',
        }
      );
    }

    getRoomDetail(id:any):Observable<any>{
      return this.http.get(environment.apiUrls + 'hotel/getRoomOfMyHotel/' +id,{responseType:'json'});
    }

    getInactiveRoomDetail(id:any):Observable<any>{
      return this.http.get(environment.apiUrls + 'hotel/getInactiveRoomOfMyHotel/' +id,{responseType:'json'});
    }

    getRoomDetailById(id:any):Observable<any>{
      return this.http.get(environment.apiUrls + 'hotel/getRoomDetailById/' +id,{responseType:'json'});
    }

    editActiveRoomDetail(id:any,roomType:any,roomNumber:any,description:any):Observable<any>{
      return this.http.put(environment.apiUrls + 'room/updateRoomDetail/'+id,
      {
        roomType:roomType,
        roomNumber:roomNumber,
        description:description
      } ,{responseType:'json'});
    }
}