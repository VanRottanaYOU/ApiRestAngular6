import { Component, OnInit, Input } from '@angular/core';
import { Societe } from '../models/societe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() 
  societe : Societe;

  constructor() { }

  ngOnInit(
  ) {
    
  }

}
