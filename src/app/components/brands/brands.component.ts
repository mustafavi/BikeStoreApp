import { NgIfContext } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsService } from 'src/app/services/brands.service';
import { IBrands } from '../../interfaces/IBrands';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit, OnDestroy {
  pageTitle: string = "Bikes' Brands";
  errorMessage: string = '';
  sub!: Subscription;
  brands: IBrands[] = [];

  constructor(private brandsService: BrandsService) {
    this.sub = this.brandsService.getBrands().subscribe(
      {
        next: brands => this.brands = brands,
        error: err => this.errorMessage = err
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }



  ngOnInit(): void {

  }

}
