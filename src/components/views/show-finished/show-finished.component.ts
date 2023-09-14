import {Component, Input, OnInit} from '@angular/core';
import {MyTask} from "../../../model/MyTask";
import {RestServiceService} from "../../../services/rest-service.service";

@Component({
  selector: 'app-show-finished',
  templateUrl: './show-finished.component.html',
  styleUrls: ['./show-finished.component.scss']
})
export class ShowFinishedComponent implements OnInit {

  @Input() searchTaskTable : MyTask[]  = []
  tasktable: MyTask[] = this.searchTaskTable
  //tasktable: MyTask []=[]
  constructor(private rest: RestServiceService) { }

  ngOnInit(): void {
    this.finishedList()
    //this.finishedList()
  }

  finishedList() {
     this.rest
      .getFinishedTasks()
      .subscribe((data) => this.tasktable = data)
  }

  datasource(){
    if(this.searchTaskTable.length == 0){
      return this.tasktable
    }else{
      return this.searchTaskTable
    }
  }

}
