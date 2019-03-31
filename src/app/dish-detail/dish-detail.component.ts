import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

	@Input()
	dish: Dish;
	
  constructor(private dishService: DishService,
  	private route: ActivatedRoute,
  	private location: Location) { }

  ngOnInit() {
  	let id = this.route.snapshot.params['id'];
  	this.dishService.getDish(id)
      .then(dish => this.dish = dish);
  }

  goBack(): void {
  	this.location.back();
  }

}
