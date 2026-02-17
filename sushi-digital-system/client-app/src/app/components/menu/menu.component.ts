import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  protected data = inject(DataService);
  private toast = inject(ToastController);
  
  view = 'menu';
  menu = signal<any[]>([]);
  categories = signal<string[]>([]);

  ngOnInit() {
    this.data.getMenu().subscribe(res => {
      this.menu.set(res);
      this.categories.set([...new Set(res.map(i => i.category_name))] as string[]);
    });
    // Carica ordini iniziali del tavolo
    this.data.getTableOrders();
  }

  segmentChanged() {
    if (this.view === 'status') {
      this.data.getTableOrders();
    }
  }

  menuByCategory(cat: string) {
    return this.menu().filter(p => p.category_name === cat);
  }

  async inviaOrdine() {
    this.data.sendOrder().subscribe(async () => {
      const t = await this.toast.create({
        message: '🍣 Ordine inviato con successo!',
        duration: 2000, color: 'success'
      });
      t.present();
      this.data.cart.set([]);
      this.data.getTableOrders(); // Aggiorna la lista
    });
  }
}
