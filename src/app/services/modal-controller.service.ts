
import { inject, Injectable, model } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskCommentsModalComponent } from '../components/task/task-comments-modal/task-comments-modal.component';
import type { ITaskFormControls } from '../interfaces/task-form-controls.interface';
import { TaskFormModalComponent } from '../components/task/task-form-modal/task-form-modal-data.component';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly _dialog = inject(Dialog);
  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95%',
  };
  constructor() {}

  openNewTaskModal() {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'create',
        formValues: {
          name: '',
          description: ''
        }
      },
    });
  }

  openEditTaskModal(formValues: ITaskFormControls) {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'edit',
        formValues,
      },
    });
  }

  openTaskCommentModal() {
    return this._dialog.open(TaskCommentsModalComponent, {
      ...this.modalSizeOptions,
    });
  }
}
