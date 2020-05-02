import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styles: []
})
export class CreatePageComponent implements OnInit {

  public form: FormGroup;

  constructor(private postsService: PostsService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      author: new FormControl({value: localStorage.getItem('author'), disabled: true})
      })
  }

  submit() {
    if(!this.form.invalid) {
      const post: Post = {
        title: this.form.value.title,
        text: this.form.value.text,
        author: localStorage.getItem('author'),
        date: new Date()
      }

      this.postsService.create(post).subscribe(() => {
        this.form.reset();
        this.alertService.success("Post created");
      })
    }
  }

}
