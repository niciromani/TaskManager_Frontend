import {Component, Input, OnInit} from '@angular/core';
import {MyTask} from "../../../model/MyTask";

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {

  @Input() tasktable: MyTask [] = []

  displayColumns: string[] = ['ID', 'Title', 'Description', 'Finished', 'Created', 'Start', 'Till', 'Priority', 'Tags'];

  constructor() {

  }

  ngOnInit(): void {
  }



}
