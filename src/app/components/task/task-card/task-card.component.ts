import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../../services/modal-controller.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  private readonly _modalService = inject(ModalControllerService);

  openEditTaskModal() {
    const DialogRef = this._modalService.openEditTaskModal({name: "Nova tarefa", description: "desc tarefa" })

    DialogRef.closed.subscribe((taskForm) => {
      console.log("Editing", taskForm)
    })
  }
}
