import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../task.service';
import {
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  addTask,
  addTaskSuccess,
  addTaskFailure,
  editTask,
  editTaskSuccess,
  editTaskFailure,
  completeTask,
  completeTaskSuccess,
  completeTaskFailure,
  removeTask,
  removeTaskSuccess,
  removeTaskFailure,
} from './list.actions';
import { catchError, map, mergeMap, of } from 'rxjs';


@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  // Load Tasks
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => loadTasksSuccess({ tasks })),
          catchError((error) => of(loadTasksFailure({ error: error.message })))
        )
      )
    )
  );

  // Add Task
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      mergeMap(({ task }) =>
        this.taskService.addTask(task as Task).pipe(
          map((newTask) => addTaskSuccess({ task: newTask })),
          catchError((error) => of(addTaskFailure({ error: error.message })))
        )
      )
    )
  );

  // Edit Task
  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTask),
      mergeMap(({ id, updates }) =>
        this.taskService.updateTask({ id, ...updates } as Task).pipe(
          map((updatedTask) => editTaskSuccess({ task: updatedTask })),
          catchError((error) => of(editTaskFailure({ error: error.message })))
        )
      )
    )
  );

  // Complete Task
  completeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeTask),
      mergeMap(({ id }) =>
        this.taskService.updateTask({ id, completed: true } as Task).pipe(
          map((updatedTask) => completeTaskSuccess({ task: updatedTask })),
          catchError((error) => of(completeTaskFailure({ error: error.message })))
        )
      )
    )
  );

  // Remove Task
  removeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTask),
      mergeMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => removeTaskSuccess({ id })),
          catchError((error) => of(removeTaskFailure({ error: error.message })))
        )
      )
    )
  );
}
