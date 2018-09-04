import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  newBid = new FormGroup({
    name: new FormControl,
    email: new FormControl,
    bidAmount: new FormControl
  });

  constructor(private auctionService: AuctionService, private activatedRoute: ActivatedRoute, private fBuilder: FormBuilder) { 
    this.newBid = fBuilder.group({
      email:['',Validators.email],
      name: ['',Validators.required],
      bidAmount: ['',Validators.required]
    });
  }
  itemData; itemId;postData;
  showForm: boolean = false;

  

  postBid = function() {
    // console.log(this.newBid.value.bidAmount);
    if(parseFloat(this.newBid.value.bidAmount) > parseFloat(this.itemData.bidAmount)){
      this.auctionService.createNewBid(this.newBid.value, this.itemId).subscribe(
        (response) => {
          console.log(response);
          this.showForm = false;
        }
      )
    } else{
      alert("Bid Amount should be greater than previous bid amount");
    }
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.itemId = paramsId.id;
      // console.log(x); // Print the parameter to the console. 
    });
    
    this.auctionService.fetchSelectedItemData(this.itemId).subscribe(
      (response) => {
        this.itemData = (response);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
