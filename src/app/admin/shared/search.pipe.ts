import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../shared/interfaces";

@Pipe({name: 'searchPosts'})
export class SearchPipe implements PipeTransform{
  transform(posts: Post[], searchStr: string = '', searchPlace?: string): Post[] {
    if(!searchStr.trim()) {
      return posts;
    } else {

      let key = searchPlace ? searchPlace : 'title';
      const words = searchStr.trim().split(' ').filter(word => word);
      let searchedPosts: Post[] = [];

      for (const word of words) {
        posts.forEach(post => {
          if(post[key].toLowerCase().includes(word.toLowerCase()) && !searchedPosts.includes(post)) {
            searchedPosts.push(post);
          }
        });
      }
      return searchedPosts;
    }
  }

}
