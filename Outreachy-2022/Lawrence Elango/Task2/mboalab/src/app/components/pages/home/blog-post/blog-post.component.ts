import { Component, OnInit, AfterContentInit } from '@angular/core';
import { CoreService } from '../../../../core/core.service';
import { PostsService } from '../../../../services/posts.service';
import { CategoriesService } from '../../../../services/categories.service';
import blogpost from '../../../../data/blog/blog.json';
import tags from '../../../../data/blog/tags.json';
import _ from 'lodash';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements AfterContentInit, OnInit {

  public postsPerPage: any;
  public loadingData = false;
  public loading = false;
  public animationType = 'wanderingCubes';
  public defaultStartDate = "";
  public defaultEndDate = "";
  public defaultStatus = "all";
  public count = 3;


  public categories: any = [];
  public categoryCount = 0;
  public posts: any = [];
  public postCount = 0;

  constructor(public _core: CoreService,
    private categoriesService: CategoriesService,
    private postsService: PostsService) { }


  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.getCategories();
    this.getPosts();
  }



  async getCategories() {
    this.loadingData = true;

    this.categoriesService
      .getCategories()
      .then(async (category) => {
        this.categoryCount = category.count;
        let categories = this._core.normalizeKeys(category.categories);

        this.categories = _.orderBy(categories, ['created_at'], ['desc']);;

        this.loadingData = false;
      })
      .catch(e => {
        this.loadingData = false;
        this._core.handleError(e);
      });
  }



  getDate(date: string) {
    if (!this._core.isEmptyOrNull(date)) {
      return this._core.formatDate(date);
    } else {
      return "";
    }
  }


  async getPosts() {
    this.loadingData = true;

    let data = {
      start: this.defaultStartDate,
      end: this.defaultEndDate,
      status: this.defaultStatus,
      count: this.count
    }

    this.postsService
      .getPosts(data)
      .then(async (post) => {
        this.postCount = post.count;
        let posts = this._core.normalizeKeys(post.posts);
        this.posts = _.orderBy(posts, ['createdat'], ['desc']);
        this.loadingData = false;
      })
      .catch(e => {
        this.loadingData = false;
        this._core.handleError(e);
      });
  }


}
