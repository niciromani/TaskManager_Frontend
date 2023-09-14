import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './views/home/home.component';
import { ShowFinishedComponent } from './views/show-finished/show-finished.component';
import { ShowChronologicalComponent } from './views/show-chronological/show-chronological.component';
import { ManageTasksComponent } from './views/manage-tasks/manage-tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { TaskTableComponent } from './shared/task-table/task-table.component';
import { SearchTaskComponent } from './shared/search-task/search-task.component';
import { FilterTaskComponent } from './shared/filter-task/filter-task.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditDialogComponent } from './shared/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './shared/add-dialog/add-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { HeaderBarComponent } from './shared/header-bar/header-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowFinishedComponent,
    ShowChronologicalComponent,
    ManageTasksComponent,
    TaskTableComponent,
    SearchTaskComponent,
    FilterTaskComponent,
    EditDialogComponent,
    AddDialogComponent,
    HeaderBarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        HttpClientModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatExpansionModule

    ],
  providers: [HttpClientModule, MatDialogModule, MatNativeDateModule,MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
