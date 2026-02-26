import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form data:', form.value);
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      form.resetForm();
    }
  }
}
