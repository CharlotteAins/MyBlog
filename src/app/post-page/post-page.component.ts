import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {Post} from "../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuillSettings} from "../shared/quill.settings";
import {Location} from "@angular/common";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styles: []
})
export class PostPageComponent implements OnInit {

  public post: Post;
  public form: FormGroup;
  public submitted: boolean = false;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              public quill: QuillSettings) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      author: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required)
    })
    this.getPost();
  }

  getPost() {
    this.route.params.subscribe((params: Params) => {
      this.postsService.getById(params['id']).subscribe(post => this.post = post);
    })
  }

  addComment() {
    if (!this.form.invalid) {

      this.submitted = true;
      this.post.comments = this.post.comments ? this.post.comments : [];
      this.post.comments.unshift({
        author: this.form.value.author,
        text: this.form.value.comment
      })
      this.postsService.update(this.post).subscribe(() => {
        this.submitted = false;
        this.form.reset();
      },() => {
        this.getPost();
      })
    }

  }


}
