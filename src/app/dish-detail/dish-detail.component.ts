import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  @ViewChild('cform')commentFormDirective;

	dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required': 'Author Name is required',
      'minlength': 'Author Name must be at least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required',
      'minlength': 'Comment must be at least 2 characters long'
    }
  };
	
  constructor(private dishService: DishService,
  	private route: ActivatedRoute,
  	private location: Location,
    private fb: FormBuilder) { 
      this.createForm();
  }

  ngOnInit() {
  	//let id = this.route.snapshot.params['id'];
  	//this.dishService.getDish(id)
    //  .subscribe(dish => this.dish = dish);

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id); });

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
  	this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: '',
      comment: ['', [Validators.required, Validators.minLength(2)] ]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }      
    }
  }


  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment['date'] = new Date().toISOString();
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      comment:'',
      rating: 5
    });
    this.commentFormDirective.resetForm();
  }

}
