import {Injectable, signal} from "@angular/core";
import {TodoInterface} from "../types/todo.interface";
import {FilterEnum} from "../types/filter.enum";

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  todosSignal = signal<TodoInterface[]>([]);
  filterSignal = signal<FilterEnum>(FilterEnum.all);

  changeFilter(filterName: FilterEnum): void {
    this.filterSignal.set(filterName);
  }

  addTodos(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString()
    }
    this.todosSignal.update((todos) => [...todos, newTodo]);
  }

  changeTodo(id: string, text: string): void {
    this.todosSignal.update((todos) => todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text
        }
      }
      return todo;
    }));
  }

  removeTodo(id: string): void {
    this.todosSignal.update((todos) => todos.filter(todo => todo.id !== id));
  }

  toggleTodo(id: string): void {
    this.todosSignal.update((todos) => todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo;
    }));
  }

  toggleAll(isAllCompleted: boolean): void {
    this.todosSignal.update((todos) => todos.map(todo => ({
      ...todo,
      isCompleted: isAllCompleted
    })));
  }
}
