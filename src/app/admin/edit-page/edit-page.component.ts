import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {switchMap} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styles: []
})
export class EditPageComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private post: Post;
  public submitted = false;
  private uSub: Subscription;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        author: new FormControl({value: localStorage.getItem('author'), disabled: true})
      })
    })
  }

  ngOnDestroy(): void {
    if(this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (!this.form.invalid) {
      this.submitted = true;
      this.uSub = this.postsService.update({
        ...this.post,
        title: this.form.value.title,
        text: this.form.value.text,
      }).subscribe(() => {
        this.submitted = false;
        this.alertService.success('Post edited');
      })
    }
  }

}
