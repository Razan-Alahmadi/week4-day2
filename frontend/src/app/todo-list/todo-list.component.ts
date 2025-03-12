import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../state/list.reducer';
import { Store } from '@ngrx/store';
import { loadTasks, addTask, completeTask, removeTask, resetTasks, editTask } from '../state/list.actions';
import { selectAllTodos, selectCompletedTodos, selectIncompleteTodos } from '../state/list.selector';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todoForm!: FormGroup;
  todos$: Observable<Task[]>;
  completedTodos$: Observable<Task[]>;
  incompleteTodos$: Observable<Task[]>;

  editedTodoName: string = ''; // Needed for edit mode
  editingTodoId: number | null = null; // Tracks which task is being edited

  constructor(private fb: FormBuilder, private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    this.completedTodos$ = this.store.select(selectCompletedTodos);
    this.incompleteTodos$ = this.store.select(selectIncompleteTodos);
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    this.store.dispatch(loadTasks());
  }

  addTodo() {
    if (this.todoForm.valid) {
      const newTask: Task = {
        id: Date.now(),
        title: this.todoForm.value.title,
        completed: false,
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.todoForm.reset();
    }
  }

  completeTodo(taskId: number) {
    this.store.dispatch(completeTask({ taskId }));
  }

  removeTodo(taskId: number) {
    this.store.dispatch(removeTask({ taskId }));
  }

  startEdit(task: Task) {
    this.editingTodoId = task.id;
    this.editedTodoName = task.title;
  }

  saveEdit(task: Task) {
    if (this.editedTodoName.trim().length > 0) {
      this.store.dispatch(editTask({ task: { ...task, title: this.editedTodoName } }));
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.editingTodoId = null;
    this.editedTodoName = '';
  }

  resetAllTodos() {
    this.store.dispatch(resetTasks());
  }
}
