import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {

  categories: any = ["Currently Active Auction","Upcoming Auction","Past Auction","All Items with Images"];
  selectedValue = this.categories[0];
  allItems = []; data;
  sortBy: boolean = true;
  showForm: boolean = false;
  dateValue;
  
  constructor(private auctionService: AuctionService) { }
  
  newAuction = new FormGroup({
    itemName: new FormControl('', Validators.required),
    itemDescription: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    bidAmount: new FormControl('', Validators.required),
    currentBid: new FormControl('', Validators.required),
    itemImage: new FormControl('', Validators.required)
  });

  deleteItem = function(id){
    this.auctionService.deleteAuction(id).subscribe(
      (response) => {
        this.fetchAuctionItems();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  createAuction = function() {
    this.newAuction.value.endTime = new Date(this.newAuction.value.endTime).toISOString();
    this.newAuction.value.startTime = new Date(this.newAuction.value.startTime).toISOString();
    this.newAuction.value.itemImage = "https://www.pexels.com/photo/nature-red-love-romantic-67636/";
    this.auctionService.createNewAuction(this.newAuction.value).subscribe(
      (response) => {
        this.fetchAuctionItems();
        this.showForm = false;
      },
      (error) => {
        this.fetchAuctionItems();
        console.log(error);
      }
    )
  }

  selectedCategory = function(){
    this.dateValue = new Date().toISOString();
    if(this.selectedValue === "Currently Active Auction"){
      this.allItems = [];
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].endTime > this.dateValue && this.data[i].startTime < this.dateValue){
          this.allItems.push(this.data[i]);
        }
      }
    }
    else if(this.selectedValue === "Upcoming Auction"){
      this.allItems = [];
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].startTime > this.dateValue){
          this.allItems.push(this.data[i]);
        }
      }
    }
    else if(this.selectedValue === "Past Auction"){
      this.allItems = [];
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].startTime < this.dateValue){
          this.allItems.push(this.data[i]);
        }
      }
    }
    else{
      this.allItems = this.data;
    }
  }
  sortFunction = function(sortKey) {
    if(this.sortBy){
      this.allItems.sort(function(a, b){
        return a[sortKey] - b[sortKey];
      });
    } else{
      this.allItems.sort(function(a, b){
        return b[sortKey] -a[sortKey];
      });
    }
    this.sortBy = !this.sortBy;
  }
  
  ngOnInit() {
    this.selectedValue = "Currently Active Auction";
    this.auctionService.fetchAllItems().subscribe(
      (response) => {
        this.data = response;
        this.selectedCategory();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
