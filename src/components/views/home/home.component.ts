import { Component, OnInit } from '@angular/core';
import {MyTask} from "../../../model/MyTask";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  views = [
    {value: 1, label: 'Manage'},
    {value: 2, label: 'Chronological'},
    {value: 3, label: 'Finished'},
  ];
  selectedView = this.views[0];

  searchedData : MyTask[] = []
  constructor() { }

  ngOnInit(): void {
  }

  handleSearchData(searchedData: MyTask[]){
    console.log(searchedData)
    this.searchedData = searchedData
  }

}
