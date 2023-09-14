import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MyTask} from "../../../model/MyTask";
import {Priority} from "../../../model/Priority";
import {MyTag} from "../../../model/MyTag";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {RestServiceService} from "../../../services/rest-service.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  mytask = {} as MyTask
  today = new Date()
  todayStr = this.today.toLocaleDateString()
  priorities = Object.values(Priority)
  allTags: MyTag[] = []
  tagCrtl = new FormControl()
  filteredTags: Observable<MyTag[]>;
  tags: MyTag[] = []
  finished: boolean = false

  beginDate = Date()

  endDate = Date()


  constructor(private rest: RestServiceService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public taskID: any) {
    this.filteredTags = this.tagCrtl.valueChanges.pipe(
      startWith(null),
      map((tag: MyTag | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );

  }

  ngOnInit(): void {
    console.warn("MyTask: " + this.taskID);
    console.log(this.endDate)
    this.getTaskByID(function (task: MyTask) {

      const [begin_month, begin_day, begin_year] = task.beginDate.split('/')

      const [end_month, end_day, end_year] = task.endDate.split('/')

      // @ts-ignore
      this.beginDate = new Date(+begin_year, +begin_month - 1, +begin_day)

      // @ts-ignore
      this.endDate = new Date(+end_year, +end_month - 1, +end_day)


    }.bind(this))


  }


  getTaskByID(blubFunction: Function) {

    return this.rest.getTaskByID(this.taskID.taskID).subscribe(data => {
        this.mytask = data;

        blubFunction(this.mytask)
        console.log(this.mytask)
        this.tags = this.mytask.tags.map(strTag => {
          const tagObject: MyTag = {
            id: -1,
            tagName: strTag as string,
            assignments: null
          }
          return tagObject
        }) as MyTag[]
      },
      error => {
        console.warn("Something went wrong");
      });
  }


  editTask() {
    this.mytask.beginDate = this.formatDate(this.mytask.beginDate)
    this.mytask.endDate = this.formatDate(this.mytask.endDate)
    this.mytask.tags = this.tags
    const taskList: string[] =  this.mytask.tags.map((tag) => tag.tagName)
    this.mytask.tags = taskList
    this.rest.editTask(this.mytask).subscribe(data => console.log(data))
    this.dialog.closeAll()

  }

  remove(tag: MyTag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      const createTag: MyTag = {
        id: 0,
        tagName: value,
        assignments: null
      }
      this.tags.push(createTag);
    }
    // Clear the input value
    event.chipInput!.clear();

    console.log("Tags: " + this.filteredTags)
    this.tagCrtl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagCrtl.setValue(null);
  }

  private _filter(value: MyTag): MyTag[] {
    const filterValue = value.id
    return this.allTags.filter(tag => tag.id == filterValue)
  }

  private formatDate(date: string): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('' + dateObj.getDate()).slice(-2);
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate
  }

}
