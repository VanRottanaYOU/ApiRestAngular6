import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Societe } from 'src/app/models/societe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  name: string

  @Input()
  required: Boolean

  @Output()
  change: EventEmitter<MatRadioChange> 

  societe: Societe = null;

  isVisibleSociete : boolean = false;

  searchForm : FormGroup; 
  searchitem: string;
  mrButton: MatRadioButton;

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  title: string = 'My first AGM project';
  lat: number = 50.607605;
  lng: number = 3.018058;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
    ) {}

  ngOnInit() {
   this.searchForm = this.formBuilder.group({
    itemsearch: ['', Validators.required],
    searchType: ['', Validators.required]
  });
  this.societe= new Societe("430032854", "IT-ROOM", " 5 Allée Gabert, 59510 Hem");
  }

  onChange(mrChange: MatRadioChange) {
    // console.log("value : " +mrChange.value);
    this.mrButton = mrChange.source;
    // console.log("mrButton.name : "+this.mrButton.name);
    // console.log("mrButton.checked : "+this.mrButton.checked);
    // console.log("mrButton.inputId : "+this.mrButton.inputId);
    // console.log("rButton.radioGroup.name : "+this.mrButton.radioGroup.name);
  } 


  onFormSubmit() {
    this.isVisibleSociete=true;
    if (this.mrButton.value == "rs"){
      console.log("mrButton.name 2 : "+this.mrButton.value);
    }

    if (this.mrButton.value == "sir"){
      //console.log("mrButton.name 2 : "+this.mrButton.value);
      //it room : siren : 430032854 siret : 43003285400050
      this.searchService.getInfosBySiren(this.searchForm.value.itemsearch)
      .subscribe(
        data => {
          console.log(data);
          this.societe= new Societe("430032854", "IT-ROOM", " 5 Allée Gabert, 59510 Hem");
        },
        error => {
          console.log("Erreur", error);
        }
      );
    }

  }
  get itemsearch() {
    return this.searchForm.get('itemsearch');
  }  
  get searchType() {
    return this.searchForm.get('searchType');
  }    

  selectedMarker;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 22.33159, lng: 105.63233, alpha: 1 },
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
    { lat: 5.19334, lng: -67.03352, alpha: 1 },
    { lat: 12.09407, lng: 26.31618, alpha: 1 },
    { lat: 47.92393, lng: 78.58339, alpha: 1 }
  ];

  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

}
