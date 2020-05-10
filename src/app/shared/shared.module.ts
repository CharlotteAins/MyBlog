import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchPipe} from "../admin/shared/search.pipe";
import {QuillSettings} from "./quill.settings";

@NgModule({
  declarations:[
    SearchPipe,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SearchPipe,
    QuillModule
  ],
  providers: [QuillSettings]
  })
export class SharedModule {

}
