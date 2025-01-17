import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styles: []
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public posts: Post[];
  private pSub: Subscription;
  private dSub: Subscription;
  public searchStr: string = '';
  searchPlace: string = 'title';

  constructor(private postsService: PostsService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Post deleted');
    })
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe();
    }
    if(this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
