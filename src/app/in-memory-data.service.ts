import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Book} from './Book'
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    const books = [
      { id: 11,title:'Think And Grow Rich', author: 'Napolion' },
      { id: 12,title:'Power of positive thinking', author: 'Hill' },
      { id: 13,title:'The 7 habits', author: 'Brad' },
      { id: 14,title:'The Alchimist', author: 'Celin' },
      { id: 15,title:'Languages of love', author: 'Marta' },
      { id: 16,title:'Rich Dad Poor Dad', author: 'Robert' },
      
    
    ];
    return {books};
  }
  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }
}
