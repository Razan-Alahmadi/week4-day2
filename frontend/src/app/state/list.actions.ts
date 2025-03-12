import { createAction, props } from '@ngrx/store';
import { Task } from './list.reducer';

// Load tasks from API
export const loadTasks = createAction('[List] Load Tasks');
export const loadTasksSuccess = createAction(
  '[List] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[List] Load Tasks Failure',
  props<{ error: string }>()
);

// Add Task
export const addTask = createAction(
  '[List] Add Task',
  props<{ task: Omit<Task, 'id'> }>()
);
export const addTaskSuccess = createAction(
  '[List] Add Task Success',
  props<{ task: Task }>()
);
export const addTaskFailure = createAction(
  '[List] Add Task Failure',
  props<{ error: string }>()
);

// Edit Task
export const editTask = createAction(
  '[List] Edit Task',
  props<{ id: number; updates: Partial<Task> }>()
);
export const editTaskSuccess = createAction(
  '[List] Edit Task Success',
  props<{ task: Task }>()
);
export const editTaskFailure = createAction(
  '[List] Edit Task Failure',
  props<{ error: string }>()
);

// Complete Task
export const completeTask = createAction(
  '[List] Complete Task',
  props<{ id: number }>()
);
export const completeTaskSuccess = createAction(
  '[List] Complete Task Success',
  props<{ task: Task }>()
);
export const completeTaskFailure = createAction(
  '[List] Complete Task Failure',
  props<{ error: string }>()
);

// Remove Task
export const removeTask = createAction(
  '[List] Remove Task',
  props<{ id: number }>()
);
export const removeTaskSuccess = createAction(
  '[List] Remove Task Success',
  props<{ id: number }>()
);
export const removeTaskFailure = createAction(
  '[List] Remove Task Failure',
  props<{ error: string }>()
);

// Reset Tasks
export const resetTasks = createAction('[List] Reset Tasks');
