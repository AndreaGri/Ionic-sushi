import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected data = inject(DataService);
  private router = inject(Router);
  
  tavolo = '';
  nome = '';

  entra() {
    if (this.tavolo && this.nome) {
      this.data.table.set(this.tavolo);
      this.data.user.set(this.nome);
      this.router.navigate(['/menu']);
    } else {
      alert('Inserisci nome e numero tavolo!');
    }
  }
}
