import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  // USA IL TUO URL REALE QUI SOTTO
  private url = 'https://fantastic-winner-9rgq9p4v496f7r9j-5000.app.github.dev/api';

  public table = signal<string>('');
  public user = signal<string>('');
  public cart = signal<any[]>([]);
  public tableOrders = signal<any[]>([]);
  
  public cartCount = computed(() => this.cart().reduce((acc, i) => acc + i.quantity, 0));
  public cartTotal = computed(() => this.cart().reduce((acc, i) => acc + (i.price * i.quantity), 0));

  getMenu() { 
    return this.http.get<any[]>(`${this.url}/menu`); 
  }
  
  getTableOrders() {
    const tableCode = this.table();
    if (!tableCode) return; // Non chiamare se il tavolo è vuoto

    this.http.get<any[]>(`${this.url}/orders/table/${tableCode}`).subscribe({
      next: (res) => this.tableOrders.set(res),
      error: (err) => console.error('Errore caricamento ordini tavolo:', err)
    });
  }

  addToCart(p: any) {
    this.cart.update(items => {
      const ex = items.find(i => i.product_id === p.id);
      if (ex) return items.map(i => i.product_id === p.id ? {...i, quantity: i.quantity + 1} : i);
      return [...items, { product_id: p.id, name: p.name, price: p.price, quantity: 1 }];
    });
  }

  sendOrder() {
    return this.http.post(`${this.url}/orders`, { 
      table_code: this.table(), 
      customer_name: this.user(), 
      items: this.cart() 
    });
  }
}
