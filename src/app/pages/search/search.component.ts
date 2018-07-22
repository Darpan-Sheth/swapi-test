import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../../providers/search.service';
import { HttpServiceService } from '../../providers/http-service.service';
import { AppSettingsService } from '../../providers/app-settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchOption: string = "people"; //set default option to people
  searchText: string = "*"; //set default string to *
  searchResults: any = [];
  selectedResult: any;
  nextUrl: string;
  prevUrl: string;
  searchSubscription: Subscription;
  errorString: string;
  serviceError: boolean = false;
  @ViewChild('itemDetails') private itemDetails: ElementRef;
  constructor(public searchService: SearchService, public httpServiceService: HttpServiceService, public appSettings: AppSettingsService) { }

  ngOnInit() {
    this.getSearchData("*", false);  //Initially all the records for people
  }

  ngOnDestroy(){
    this.searchSubscription.unsubscribe();  //Unsubscribe Observable on destroy
  }

  /* Method to make web service call
  * Params(SearchText: string, flag: boolean - to check whether its a page call fro next or prev record or normal web service call)
  */ 

  getSearchData(searchKey, forPageCall): void {
    let searchOption = this.searchOption;
      this.serviceError = false;
      this.searchSubscription = this.searchService.searchRecords(searchKey, searchOption, forPageCall).subscribe(res=>{
        this.nextUrl = res.next;
        this.prevUrl = res.previous;
        this.searchResults = res.results;
      }, error=>{
        console.log("error on seach component 45", error);
        this.serviceError = true;
        this.errorString = "Not able to fetch data. Please try later";
      });
  }

  /*
  * Method to show item details on item click
  * Params(result: any)
  * */

  getDetails(result): void{
    result.option = this.searchOption;
    this.selectedResult = result;
    this.scrollToBottom();
  }

  /*
  * Method to handle radio button change and empty searchbox
  * 
  * */

  handleChange(): void {
    this.selectedResult = "";
    this.searchResults = "";
    this.searchText = "";
    this.serviceError = true;
    this.errorString = "Please enter text to search";
  }

  /*
  * Method to get search key
  * 
  * */

  getSearchKey(): void{
    let searchKey = this.searchText;
    if(searchKey != ""){
      this.getSearchData(searchKey, false);
    }else{
      this.handleChange();
    }
  }

  /*
  * Method to handle next and previous click
  * Params(url: string - previous or next url)
  * */

  pageCick(url): void{
    console.log("url.......", url);
    let lastSegmentOfNextUrl = url.substr(url.lastIndexOf('/') + 1);
    this.getSearchData(lastSegmentOfNextUrl, true); //for page call
  }

  /*
  * Method to make page scroll to the bottom on item click
  * 
  * */

  scrollToBottom(): void {
    try {
      setTimeout(()=>{
        var scrollHeight = this.itemDetails.nativeElement.scrollHeight;
        window.scrollBy(0, scrollHeight);
      }, 700);
    } catch(err) { }                 
  }
}