import {Component, Inject, Input, OnInit} from '@angular/core';
import {MyTask} from "../../../model/MyTask";
import {MatDialog} from "@angular/material/dialog";
import {AddDialogComponent} from "../../shared/add-dialog/add-dialog.component";
import {RestServiceService} from "../../../services/rest-service.service";
import {EditDialogComponent} from "../../shared/edit-dialog/edit-dialog.component";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss']
})
export class ManageTasksComponent implements OnInit {

  @Input() searchTaskTable : MyTask[]  = []
  tasktable: MyTask[] = this.searchTaskTable
  displayColumns: string[] = ['ID', 'Title', 'Description', 'Finished', 'Created', 'Start', 'Till', 'Priority', 'Tags','Edit'];

  constructor(private dialog: MatDialog,
              private rest: RestServiceService,

              ) {
  }

  ngOnInit(): void {
    console.log(this.searchTaskTable)
    this.getAllTasks()
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




  }

  datasource(){
    if(this.searchTaskTable.length == 0){

      return this.tasktable
    }else{
     return this.searchTaskTable
    }
  }
  filterEvent(filteredDataSource: MyTask[]){
    this.tasktable=filteredDataSource
  }


  getAllTasks(){
    this.rest.getTask().subscribe(data => this.tasktable=data)
  }

  addTask() {
     const d = this.dialog.open(AddDialogComponent,{
       width: '600px',
     } )
    d.afterClosed().subscribe(async result => {
      console.log("got closed")
      await new Promise(r => setTimeout(r, 2000));
      this.getAllTasks()
    })
  }

  editTask(id: number){
    const e = this.dialog.open(EditDialogComponent,{
      width: '600px',
      data: {
        taskID: id
      }
    })
    e.afterClosed().subscribe(async result => {
      console.log("got closed")
      await new Promise(r => setTimeout(r, 2000));
      this.getAllTasks()
    })
  }

}
