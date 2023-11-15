import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/ICategory';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Category Detail';
  category: ICategory | undefined;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnDestroy(): void {  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); this.pageTitle += `${id}`;
    console.log(this.category?.category_id, this.category?.category_name);

    this.categoryService.getCategory(id).subscribe(
      {
        next: category => this.category = category,
        error: err => this.errorMessage = err
      });
  }

  onBack(): void {
    this.router.navigate(['components/categories']);
  }
}
/**
    this.product =
    {
      "productId": id,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2021",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "assets/images/leaf_rake.png"
    }

 */