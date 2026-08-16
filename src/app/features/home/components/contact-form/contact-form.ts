import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  private fb = new FormBuilder();
  submitted = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  // Helper para saber si un campo tiene error Y ya fue tocado (mejor UX: no marca error mientras escribís por primera vez)
  hasError(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Acá en el futuro harías la llamada real a un backend/servicio de email
    console.log('Formulario enviado:', this.form.value);

    alert('¡Gracias! Tu mensaje fue enviado (simulado por ahora).');
    this.form.reset();
    this.submitted = false;
  }
}