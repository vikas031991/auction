import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http:Http) { }

  fetchAllItems(): Observable<any>{
    return this.http.get('http://arunreghunathan.pythonanywhere.com/auction/item')
    .pipe(map((response: any) => response.json()),
    catchError(this.handleError));
  }

  fetchSelectedItemData(itemId): Observable<any>{
    return this.http.get('http://arunreghunathan.pythonanywhere.com/auction/item/'+itemId)
    .pipe(map((response: any) => response.json()),
    catchError(this.handleError));
  }

  createNewBid(itemData, itemId): Observable<any>{
    return this.http.put('http://arunreghunathan.pythonanywhere.com/auction/item/'+itemId+'/bid', itemData)
    .pipe(catchError(this.handleError));
  }

  createNewAuction(auctionData): Observable<any>{
    return this.http.post('http://arunreghunathan.pythonanywhere.com/auction/item', auctionData)
    .pipe(catchError(this.handleError));
  }

  deleteAuction(id): Observable<any>{
    return this.http.delete('http://arunreghunathan.pythonanywhere.com/auction/item/'+id)
    .pipe(catchError(this.handleError));
  }
  private handleError(error: Response | any) {
  	return Observable.throw(error);
  }

}
