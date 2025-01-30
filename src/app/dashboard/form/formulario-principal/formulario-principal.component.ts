import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-principal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './formulario-principal.component.html',
  styleUrl: './formulario-principal.component.css',
})
export default class FormularioPrincipalComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form: FormGroup = this.createForm();

  private createForm(): FormGroup {
    return this.fb.group({
      nomape: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')],
      ],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]],
    });
  }

  onNumberInput(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }
  onCorreoInput(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/\s+/g, '');
  }

  onLetterInput(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ ]/g, '');
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigate(['/dashboard/formsecu'], {
        state: { formData: this.form.value },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
