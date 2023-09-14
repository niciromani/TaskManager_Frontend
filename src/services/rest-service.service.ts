import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {MyTask} from "../model/MyTask";
import {FilterObject} from "../model/FilterObject";
import {MyTag} from "../model/MyTag";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})

export class RestServiceService {
  baseURL = 'http://localhost:7063';
 //ff urlAdd = this.baseURL + '/api/Assignments/AddAssignment';

  urlAdd = this.baseURL + '/api/Assignments/AddAssignment';
  urlGet = this.baseURL + '/api/Assignments';
  urlEdit = this.baseURL + '/api/Assignments/editAssignment';
  urlChronological = this.baseURL + '/api/Assignments/GetAssignmentsChronological';
  urlFinished = this.baseURL + '/api/Assignments/GetFinishedAssignments';
  urlGetToEdit = this.baseURL + '/api/Assignments/getSpecificAssignment';
  urlSearch = this.baseURL + '/api/Assignments/GetAssignmentsBySearch';
  urlFilter = this.baseURL + '/api/Assignments/GetFilteredAssignments';
  urlGetTags = this.baseURL + '/api/Assignments/GetAllTags';

  constructor(private http: HttpClient) {
  }

  //edited task to database
  editTask(data: any) {
    return this.http.put<MyTask>(this.urlEdit, data, httpOptions);
  }

  //save task
  saveTask(data: any) {
    console.log("Save Task")
    return this.http.post<MyTask>(this.urlAdd, data, httpOptions);
  }

  //get all tasks
  getTask(): Observable<MyTask[]> {
    return this.http.get<MyTask[]>(this.urlGet);
  }

  //get task with ID
  getTaskByID(id: number): Observable<MyTask> {    //: Observable<MyTask>
    const headers = httpOptions.headers;
    const params = new HttpParams().append('id', id);
    console.warn("ID in Service: " + id);
    return this.http.get<MyTask>(this.urlGetToEdit, {headers: headers, params: params});

  }

  //get all tasks in chronological order
  getChronologicalTask() {
    return this.http.get<MyTask[]>(this.urlChronological);

  }

  //get all finished tasks
  getFinishedTasks() {
    return this.http.get<MyTask[]>(this.urlFinished);

  }

  //search
  search(search: string): Observable<MyTask[]> {
    const header = httpOptions.headers;
    const params = new HttpParams().append('search', search);
    return this.http.get<MyTask[]>(this.urlSearch, {headers: header, params: params});
  }

  //filter
  filter(filter: FilterObject): Observable<MyTask[]> {
    console.warn("FilterObject (service): " + filter);
    console.log("Filter in Service: " + JSON.stringify(filter))
    return this.http.post<MyTask[]>(this.urlFilter, filter, httpOptions);
  }

  //get all tags
  getAllTags() {
    return this.http.get<MyTag[]>(this.urlGetTags);
  }
}
