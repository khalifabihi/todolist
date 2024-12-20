import {Component, inject} from '@angular/core';
import {TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  todosService = inject(TodosService);
  text: string = '';

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todosService.addTodos(this.text);
    this.text = '';
  }
}
