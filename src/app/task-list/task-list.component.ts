import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TaskListService } from './task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  private tasks: String[];

  @Output()
  startAjaxRequest = new EventEmitter();

  @Output()
  completeAjaxRequest = new EventEmitter();

  constructor(private taskListService: TaskListService) {

  }

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {

    this.startAjaxRequest.emit();

    this.taskListService.loadTasks$().subscribe(
      response => this.tasks = response.json(),
      error => console.log(error),
      () => this.completeAjaxRequest.emit()
    );
  }

  taskAddedHandler(task) {

    this.startAjaxRequest.emit();

    this.taskListService.addTask$(task).subscribe(
      response => this.loadTasks(),
      error => console.log(),
      () => this.completeAjaxRequest.emit()
    );
  }

  deleteTask(task) {

    this.startAjaxRequest.emit();

    this.taskListService.deleteTask$(task).subscribe(
      response => this.loadTasks(),
      error => console.log(),
      () => this.completeAjaxRequest.emit()
    );
  }
}
