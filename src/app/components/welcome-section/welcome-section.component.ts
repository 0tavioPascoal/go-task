import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../services/modal-controller.service';

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css'
})
export class WelcomeSectionComponent {

  private readonly _modalService = inject(ModalControllerService)

  openNewTaskModal() {
    const DialogRef = this._modalService.openNewTaskModal()

    DialogRef.closed.subscribe((taskForm) => {
      console.log("tarefa criada", taskForm)
    })
}
}
