import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Book';
import { BooksService } from 'src/app/books.service';
import {InMemoryDataService}from '../../in-memory-data.service'
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(): void {
    this.bookService.getBooks()
    .subscribe(books => this.books = books);
  }
  add(title: string, author: string){
    title = title.trim();
    author = author.trim();
  if (!title && !author) { return; }
  this.bookService.addBook({ title, author } as Book)
    .subscribe(book => {
      this.books.push(book);
    });
  }
  delete(book: Book): void {
    this.books = this.books.filter(h => h !== book);
    this.bookService.deleteBook(book).subscribe();
  }

}
