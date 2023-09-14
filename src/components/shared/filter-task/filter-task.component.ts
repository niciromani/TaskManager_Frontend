import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FilterObject} from "../../../model/FilterObject";
import {MyTag} from "../../../model/MyTag";
import {Priority} from "../../../model/Priority";
import {RestServiceService} from "../../../services/rest-service.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {MyTask} from "../../../model/MyTask";

@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.scss']
})
export class FilterTaskComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | any;

  @ViewChild('dateInput') dateInput: ElementRef<HTMLInputElement> | any;

  @ViewChild('priorityInput') priorityInput: ElementRef<HTMLInputElement> | any;

  @Output() filteredDataSource = new EventEmitter<MyTask[]>();
  separatorKeysCodesTag: number[] = [ENTER, COMMA];

  tagCrtl = new FormControl()

  myFilter = {} as FilterObject

  filteredTags: Observable<MyTag[]>;

  allTags: MyTag[] = []

  tags: MyTag[] = []

  allDates: string[] = ['today', 'tomorrow', 'next week'];

  dates: string[] = [];

  filteredDates: Observable<string[]>;

  dateCtrl = new FormControl()

  separatorKeysCodesDate: number[] = [ENTER, COMMA];

  allPriorities = this.enumValues<Priority>(Priority)

 // priorities = this.enumList(Priority)

  priorities : string[] = []

  filteredPriorities: Observable<string[]>

  separatorKeysCodesPriority: number[] = [ENTER, COMMA];

  priorityCtrl = new FormControl()

  constructor(private rest: RestServiceService) {
    this.filteredTags = this.tagCrtl.valueChanges.pipe(
      startWith(null),
      map((tag: MyTag | null) => (tag ? this.filterTags(tag) : this.allTags.slice())),
    );

    this.filteredDates = this.dateCtrl.valueChanges.pipe(
      startWith(null),
      map((date: string | null) => (date ? this.filterDates(date) : this.allDates.slice())),
    );

    this.filteredPriorities = this.priorityCtrl.valueChanges.pipe(
      startWith(null),
      map((priority: Priority | null) => (priority ? this.filterPriorities(priority): this.allPriorities.slice()))
    )



  }

  ngOnInit(): void {
    this.rest.getAllTags().subscribe(data => this.allTags = data)
  }

 applyFilter()
 {
   //this.myFilter.tags = this.tags
   //this.myFilter.tags = this.tags
   const taskList: string[] =  this.tags.map((tag) => tag.tagName)
   this.myFilter.tags = taskList
   this.myFilter.deadlines = this.dates
   this.myFilter.priorities = this.priorities
   this.rest.filter(this.myFilter).subscribe(data =>
     this.filteredDataSource.emit(data))
 }

 cancelFilter(){
    this.rest.getTask().subscribe(data => this.filteredDataSource.emit(data))
 }
   enumValues<T>(e: any): T[] {
    return Object.keys(e)
      .filter(key => isNaN(Number(key)))
      .map(key => e[key]);
  }

   enumList(enumObj: any): string[] {
    return Object.keys(enumObj).filter(key => isNaN(+key));
  }

  removeTag(tag: MyTag): void {
    const index = this.tags.indexOf(tag)

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagCrtl.setValue(null);
  }

  private filterTags(value: MyTag): MyTag[] {
    const filterValue = value.id
    return this.allTags.filter(tag => tag.id == filterValue)
  }

  private filterDates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allDates.filter(date => date.toLowerCase().includes(filterValue));
  }
  removeDate(date: string): void {
    const index = this.dates.indexOf(date);

    if (index >= 0) {
      this.dates.splice(index, 1);
    }
  }

  //selected Dates
  selectedDate(event: MatAutocompleteSelectedEvent): void {
    this.dates.push(event.option.viewValue);
    this.dateInput.nativeElement.value = '';
    this.dateCtrl.setValue(null);
  }

  private filterPriorities(value: string): string[] {
    const filterValue = value.toString().toLowerCase();
    return this.allPriorities.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  selectedPriorities(event: MatAutocompleteSelectedEvent): void {
    this.priorities.push(event.option.viewValue);
    this.priorityInput.nativeElement.value = '';
    this.priorityCtrl.setValue(null);
  }

  removePriority(priority: string): void {
    const index = this.priorities.indexOf(priority);

    if (index >= 0) {
      this.priorities.splice(index, 1);
    }

  }






}
