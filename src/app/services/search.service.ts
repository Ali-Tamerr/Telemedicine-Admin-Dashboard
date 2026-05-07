import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  query = signal('');

  setQuery(val: string) {
    this.query.set(val);
  }
}
