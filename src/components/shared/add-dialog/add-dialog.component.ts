import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MyTask} from "../../../model/MyTask";
import {Priority} from "../../../model/Priority";
import {RestServiceService} from "../../../services/rest-service.service";
import {MyTag} from "../../../model/MyTag";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder} from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']

})
export class AddDialogComponent implements OnInit {

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

  // taskForm = this.formBuilder.group({
  //   mytask: MyTask
  // });


  constructor(private rest: RestServiceService,
              private dialog: MatDialogRef<any>,
              private snackBar: MatSnackBar) {
    this.filteredTags = this.tagCrtl.valueChanges.pipe(
      startWith(null),
      map((tag: MyTag | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );

  }

  ngOnInit(): void {
    this.getTags()
  }

  getTags() {
    this.rest.getAllTags().subscribe(data => this.allTags = data)
  }

  addTask() {
    this.mytask.createdDate = this.todayStr
    this.mytask.beginDate = this.formatDate(this.mytask.beginDate)
    this.mytask.endDate = this.formatDate(this.mytask.endDate)
    this.mytask.tags = this.tags
    const taskList: string[] =  this.mytask.tags.map((tag) => tag.tagName)
    this.mytask.tags = taskList

    this.rest.saveTask(this.mytask).subscribe()

    this.openSnackBar("Task added","OK")

    this.dialog.close()

    //this.mytask.priority
    // console.log(this.mytask.createdDate)
    // console.log(this.mytask.title)
    // console.log(this.mytask.description)
    // console.log(this.mytask.priority)
    // console.log(this.mytask.beginDate)
    // console.log(this.mytask.endDate)
    // console.log(this.mytask.tags)

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


  //Tags
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
