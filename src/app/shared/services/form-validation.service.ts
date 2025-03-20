import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  isValidField(myForm: FormGroup, field: string): boolean | null {
    return (
      myForm.controls[field].invalid &&
      (myForm.controls[field].touched || myForm.controls[field].dirty)
    );
  }

  getFieldError(myForm: FormGroup, field: string): string | null {
    if (!myForm.controls[field]) return null;

    const errors = myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;

        case 'maxlength':
          return `Maximo ${errors['maxlength'].requiredLength} caracteres.`;

        case 'min':
          return `El valor deber ser ${errors['min'].min} o mayor`;

        case 'max':
          return `El valor deber ser ${errors['max'].max} o menor`;

        case 'email':
          return `El email no es valido.`;

        case 'stockExceeded':
          return `Excede la cantidad disponible`;
      }
    }

    return null;
  }
}
