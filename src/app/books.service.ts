import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Book } from './Book';
import { MessageService } from './message.service';
import {catchError, tap} from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class BooksService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 
apiUrl = `api/books`
  constructor(private messageService: MessageService,
              private http: HttpClient) { }
              private log(message: string) {
                this.messageService.add(`BookService: ${message}`);
              }
  getBooks(): Observable<Book[]> {
    
    this.messageService.add('BookService: fetched bookes');
    return this.http.get<Book[]>(this.apiUrl)
     .pipe(
        tap(_ => this.log('fetched ')),
       catchError(this.handleError<Book[]>('getBookes', [])))
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    // TODO: send the message _after_ fetching the Book
    this.messageService.add(`BookService: fetched Book id=${id}`);
     return this.http.get<Book>(url)
       .pipe(
        tap(_ => this.log(`fetched Book id=${id}`)),
        catchError(this.handleError<Book>(`getBook id=${id}`))
       );
    
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, this.httpOptions).pipe(
      tap((newBook: Book) => this.log(`added Book w/ id=${newBook.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }
  updateBook(book: Book): Observable<any> {
    return this.http.put(this.apiUrl, book, this.httpOptions).pipe(
      tap(_ => this.log(`updated Book id=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

deleteBook(book: Book | number): Observable<Book> {
  const id = typeof book === 'number' ? book : book.id;
  const url = `${this.apiUrl}/${id}`;

  return this.http.delete<Book>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted Book id=${id}`)),
    catchError(this.handleError<Book>('deleteBook'))
  );
}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
