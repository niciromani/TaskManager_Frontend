import { Component, OnInit } from '@angular/core';
import {RestServiceService} from "../../../services/rest-service.service";
import {MyTask} from "../../../model/MyTask";

@Component({
  selector: 'app-show-chronological',
  templateUrl: './show-chronological.component.html',
  styleUrls: ['./show-chronological.component.scss']
})
export class ShowChronologicalComponent implements OnInit {

  tasktable: MyTask[]=[]
  constructor(private rest:RestServiceService) { }

  ngOnInit(): void {
    // this.tasktable = [{
    //   "id": 1,
    //   "title": "RW",
    //   "description": "Uebung",
    //   "isFinished": true,
    //   "createdDate": "2022-12-07",
    //   "beginDate": "2022-12-07",
    //   "endDate": "2022-12-07",
    //   "priority": "wichtig",
    //   "tags": [
    //   ]
    // }]

    this.chronologicalList()
    // get data for chronological
  }

  chronologicalList() {
    this.rest
      .getChronologicalTask()
      .subscribe((data) => this.tasktable = data)
  }

  search(search: string){


  }
}
