import { Component, OnInit } from '@angular/core';
import {InMemoryDataService}from '../../in-memory-data.service'
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private inMemoryDataService: InMemoryDataService) { }

  ngOnInit(): void {
  }
  onSelect(){
    this.inMemoryDataService.get<>()
  }

}
