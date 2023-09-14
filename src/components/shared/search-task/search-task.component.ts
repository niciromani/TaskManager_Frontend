import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ManageTasksComponent} from "../../views/manage-tasks/manage-tasks.component";
import {ShowChronologicalComponent} from "../../views/show-chronological/show-chronological.component";
import {ShowFinishedComponent} from "../../views/show-finished/show-finished.component";
import {MyTask} from "../../../model/MyTask";
import {RestServiceService} from "../../../services/rest-service.service";

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.scss']
})
export class SearchTaskComponent implements OnInit {
  @Input() myView = ""

  @Output() searchedTasks = new EventEmitter<MyTask[]>()

  //@ViewChild(ManageTasksComponent) manageTask!: ManageTasksComponent
  @ViewChild(ManageTasksComponent) manageTask: ManageTasksComponent | any
  @ViewChild(ShowChronologicalComponent) showChronological: ShowChronologicalComponent | any
  @ViewChild(ShowFinishedComponent) showFinished: ShowFinishedComponent | any



  timeout: any
  search_string = ""

  constructor(private rest: RestServiceService) {
  }

  ngOnInit(): void {

  }


  public search(event: any) {
   clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchFor()
    }, 500)

    // clearTimeout(this.timeout);
    // var $this = this;
    //
    // this.timeout = setTimeout(function () {
    //     if (event.keyCode != 0.0001) {
    //       $this.searchFor(event.target.value);
    //     }
    //   },
    //   1000);
  }

  /*
  onInputChange(event: any) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.search();
    }, 500);
   */

  public searchFor() {
    //search for items with rest
    //this.rest.search(search).subscribe(data => this.tasktable=data)
    if(this.search_string!=""){
      this.rest.search(this.search_string).subscribe(data => this.searchedTasks.emit(data))
    }
    else{
      this.searchedTasks.emit([])
     // this.rest.getTask().subscribe(data => this.searchedTasks.emit(data))
    }

    //this.searchedTasks.emit()
    console.log("MyView: " + this.myView)
    console.log("Search String: " + this.search_string)



    // switch (this.myView) {
    //   case "Manage":
    //     this.manageTask.search(this.search_string);
    //     break;
    //   case "Chronological":
    //     this.showChronological.search(this.search_string);
    //     break;
    //   case "Finished":
    //     this.showFinished.search(this.search_string);
    //     break;
    // }


  }




}
