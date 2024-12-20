import {Component, computed, inject} from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {CommonModule} from "@angular/common";
import {FilterEnum} from "../../types/filter.enum";
import {TodoComponent} from "../todo/todo.component";

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todosService.todosSignal();
    const filter = this.todosService.filterSignal();

    if (filter === FilterEnum.active) {
      return todos.filter(todo => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter(todo => todo.isCompleted);
    }
    return todos;
  });

  noTodosClass = computed(() => this.todosService.todosSignal().length === 0);

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  isAllTodosSelected = computed(() => {
    this.todosService.todosSignal().every(todo => todo.isCompleted);
  });

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
