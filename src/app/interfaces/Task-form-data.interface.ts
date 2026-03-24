import type { ITaskFormControls } from "./task-form-controls.interface";

export interface ITskFormModalData {
  mode: 'create' | 'edit',
  formValues: ITaskFormControls
}