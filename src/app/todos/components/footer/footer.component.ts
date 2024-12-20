import {Component, computed, inject} from '@angular/core';
import {NgClass} from "@angular/common";
import {TodosService} from "../../services/todos.service";
import {FilterEnum} from "../../types/filter.enum";

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSignal = this.todosService.filterSignal;
  filterEnum = FilterEnum;
  acitveCount = computed(() => {
    return this.todosService.todosSignal().filter(todo => !todo.isCompleted).length;
  });
  noTodosClass = computed(() => this.todosService.todosSignal().length === 0);

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
