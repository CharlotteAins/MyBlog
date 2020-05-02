import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";
import {PostsService} from "../shared/posts.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: []
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.posts$ = this.postsService.getAll();
  }

}
