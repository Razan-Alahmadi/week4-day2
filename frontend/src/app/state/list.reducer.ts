import { createReducer, on } from '@ngrx/store';
import {
  addTaskSuccess,
  editTaskSuccess,
  completeTaskSuccess,
  removeTaskSuccess,
  resetTasks,
  loadTasksSuccess
} from './list.actions';

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export const initialState: Task[] = [];

export const listReducer = createReducer(
  initialState,

  on(loadTasksSuccess, (_, { tasks }) => [...tasks]),

  on(addTaskSuccess, (state, { task }) => [...state, task]),

  on(editTaskSuccess, (state, { task }) =>
    state.map((t) => (t.id === task.id ? task : t))
  ),

  on(completeTaskSuccess, (state, { task }) =>
    state.map((t) => (t.id === task.id ? task : t))
  ),

  on(removeTaskSuccess, (state, { id }) =>
    state.filter((t) => t.id !== id)
  ),

  on(resetTasks, () => [])
);
