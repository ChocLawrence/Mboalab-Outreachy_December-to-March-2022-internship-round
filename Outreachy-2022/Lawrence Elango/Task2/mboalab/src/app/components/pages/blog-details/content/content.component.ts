import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilesService } from '../../../../services/profiles.service';
import { CoreService } from '../../../../core/core.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import {
  DomSanitizer,
  SafeHtml,
  SafeUrl,
  SafeStyle
} from '@angular/platform-browser';
import { PostsService } from '../../../../services/posts.service';
import { CommentsService } from '../../../../services/comments.service';
import { CategoriesService } from '../../../../services/categories.service';
import blog from '../../../../data/blog/blog.json';

import blogcategory from '../../../../data/blog/category.json'
import blogtags from '../../../../data/blog/tags.json'
import author from '../../../../data/team.json';
import { DxDataGridComponent } from "devextreme-angular";
import _ from 'lodash';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements AfterContentInit, OnInit {

  // pagination
  page: number = 1;
  public default = 'assets/img/profile-thumb.png';
  public userProfile: any;
  public userImage: any;
  public relatedPosts: any;
  public relatedTags: any;
  public postPerPage: any;

  public loadingData = false;
  public loading = false;
  public animationType = 'wanderingCubes';

  public categories: any = [];
  public categoryCount = 0;

  public nextPost: any = [];
  public post: any = [];
  public postCount = 0;


  commentForm!: FormGroup;

  public comments: any = [];
  public commentsCount = 0;
  public action = "addComment";

  constructor(private router: ActivatedRoute,
    public route: Router,
    private fb: FormBuilder,
    public profilesService: ProfilesService,
    public _core: CoreService,
    public sanitization: DomSanitizer,
    private categoriesService: CategoriesService,
    private postsService: PostsService,
    private commentsService: CommentsService) { }


  ngOnInit(): void {
    this.commentForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  ngAfterContentInit(): void {
    this.setPost(this.router.snapshot.params.id);
    this.getCategories();
  }

  async getComments(id) {
    this.loadingData = true;

    let data = {
      post: id
    }

    this.commentsService
      .getComments(data)
      .then(async (comments) => {
        this.commentsCount = comments.count;
        let allComments = this._core.normalizeKeys(comments.comments);

        this.comments = _.orderBy(allComments, ['createdat'], ['desc']);;

        this.loadingData = false;
      })
      .catch(e => {
        this.loadingData = false;
        this._core.handleError(e);
      });
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

  onSubmitComment() {

    if (this.commentFormIsValid()) {
      this.loading = true;
      this.loadingData = true;
      let values = this.commentForm.value;

      if (this.action == "addComment") {
        this.addComment(values, this.post._id);
      }

    }

    return false;

  }

  addComment(values: any, id: any) {

    this.commentsService.addComment(values, id).then(r => {
      this._core.showSuccess("Success", "Added Successfully...");
      this.commentForm.reset();
      this.getComment(r._id, this.action);
      this.loading = false;
      this.loadingData = false;
    }).catch(e => {
      this.loading = false;
      this.loadingData = false;
      this._core.handleError(e);
    });

  }

  getComment(id, action) {
    this.commentsService
      .getSingleComment(id)
      .then((result) => {
        let comment = this._core.normalizeKeys(result);

        if (action == "addComment") {
          this.commentsCount += 1;
          this.comments = [comment, ...this.comments];
        } else if (action == "updateComment") {
          this.comments.forEach((element, index, array) => {
            if (element._id.toString() == id.toString()) {
              array.splice(index, 1, comment);
            }
          });
          this.comments = [...this.comments];
        }
      })
      .catch((e) => {
        this._core.handleError(e);
      });
  }

  commentFormIsValid() {
    return this.commentForm.controls.text.valid;
  }


  async getProfile(id) {

    this.loadingData = true;
    await this.profilesService
      .getProfile(id)
      .then(user => {
        this.userProfile = this._core.normalizeKeys(user);
        if (this.userProfile.avatar) {
          this.userImage = this.userProfile.avatar;
        } else {
          this.userImage = null;
        }

        this.loadingData = false;
      })
      .catch(e => {
        this.loadingData = false;
        //this._core.handleError(e);
      });

  }



  getDate(date: string) {
    if (!this._core.isEmptyOrNull(date)) {
      return this._core.formatDate(date);
    } else {
      return "";
    }
  }


  async setPost(slug) {
    this.loadingData = true;
    this.postsService
      .getSinglePostBySlug(slug)
      .then(async (post) => {
        let currentPost = this._core.normalizeKeys(post);
        this.post = this._core.normalizeKeys(currentPost);
        this.getProfile(this.post.authorusername);
        this.getComments(currentPost._id);
        //this.getPostSequence(this.post._id, "next");
        this.loadingData = false;
      })
      .catch(e => {
        this.loadingData = false;
        this._core.handleError(e);
      });
  }

  async getPostSequence(id, realm) {
    this.loadingData = true;
    if (realm == "next") {

      this.postsService
        .getNextPost(id)
        .then(async (post) => {
          let currentPost = this._core.normalizeKeys(post);
          this.nextPost = this._core.normalizeKeys(currentPost);
          console.log('this.nextPost', this.nextPost);
          this.loadingData = false;
        })
        .catch(e => {
          this.loadingData = false;
          this._core.handleError(e);
        });

    } else if (realm == "previous") {

    }

  }



}
