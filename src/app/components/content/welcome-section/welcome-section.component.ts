import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../../services/modal-controller.service';
import { TaskService } from '../../../services/task-service';
import { AuthService } from '../../../services/auth/auth-service';


@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css'
})
export class WelcomeSectionComponent {

  private readonly _modalService = inject(ModalControllerService)
  private readonly _TaskService = inject(TaskService) 
  public readonly _AuthService = inject(AuthService)

  openNewTaskModal() {
    const DialogRef = this._modalService.openNewTaskModal()

    DialogRef.closed.subscribe((taskForm) => {
      console.log("tarefa criada", taskForm)
      if(taskForm){
        this._TaskService.addTask(taskForm)
      }
    })
}

}
