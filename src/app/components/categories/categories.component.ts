import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { catchError, debounce, debounceTime, EMPTY, Observable, Subscription, tap } from 'rxjs';
import { ICategory } from 'src/app/interfaces/ICategory';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from './category';


// function ratingRange(c:AbstractControl): { [key: string]: boolean } | null {
//   if(c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5 )){
//     return {'range':true};
//   }
//   return null;
// }


function ratingRange(min: number, max: number): ValidatorFn {

  return (c: AbstractControl): { [key: string]: boolean } | null => {

    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  //console.log(`${emailControl.value === confirmControl.value}, ${confirmControl.value}`);
  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {// implements OnInit, OnDestroy {
  pageTitle: string = "Bikes' Categories";
  emailMessages: string = '';
  errorMessage$: string = '';

  validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'

  };

  //sub: Subscription[] = [];
  //catsub!: Subscription;
  //  categories: ICategory[] = [];

  //categories$: Observable<ICategory[]> | undefined ;
  categories$ = this.categoryService.categories$
    .pipe(
      catchError(err => {
        this.errorMessage$ = err;
        return EMPTY;
      }));


  isVisible = false;

  //Property 'categoryForm' has no initializer and is not definitely assigned in the constructor.ts(2564)
  /**
  Just go to tsconfig.json and set
     "compilerOptions": {
      "strictPropertyInitialization": false,
      ...
  }
   */
  categoryForm!: FormGroup;
  cagetory = new Category();

  //category:ICategories = new


get addresses():FormArray{
  return <FormArray>this.categoryForm.get('addresses');
}

addAddress():void{
  this.addresses.push(this.buildAddresses());
}


  constructor(private categoryService: CategoryService, private fb: FormBuilder) {

  }




  ngOnInit(): void {
    /**Accessing the Form Model Properties
     customerForm.controls.categoryName.valid
    customerForm.get('categoryName').valid
    OR
    categoryName = new FormControl();
     *
     */
    /**
        this.categoryForm = new FormGroup({
        categoryName: new FormControl()
        });
         */

    let users = new FormArray([
      new FormControl('ARC'),
      new FormControl('Tutorials')
    ]);


    this.categoryForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      //  email: ['', [Validators.required, Validators.email]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      },
        { validator: emailMatcher }),


      phone: '',
      notification: 'email ',
      //rating:[null, [Validators.minLength(1), Validators.maxLength(5)]]
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
    //  addresses: this.buildAddresses(),
    addresses:this.fb.array([this.buildAddresses()]),



      emailAddr: new FormControl(),
      quantity: new FormControl(),
      terms: new FormControl(),
      categoryName: new FormControl()

      /*

            emailAddr: ['', [Validators.required, Validators.email]],
            quantity: ['', Validators.required],
            terms: ['', Validators.requiredTrue],
      */






      //categoryName:['',[Validators.required, Validators.minLength(6)]]
      // Different format: either it could be single value or an array
      // lastName: {value:'n/a', disabled:true},
      // email:''
      // sendCatalog:true
    });



    this.categoryForm.get('notification')?.valueChanges.subscribe(value => this.setNotification(value));


    const emailControl = this.categoryForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setMessage(emailControl));

  }

buildAddresses():FormGroup{
  return  this.fb.group({
    addressType: 'home',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
  })
}


  /** Form Builder: Creates a form model from a configuration
   * Shortens the boiler plate code
   * Provided as a service
   *
   */

  /**For every single field we use setValue method but for subset
   * values or 2 out of 5 we ues patchValue
   */
  populateTestData(): void {
    /* this.categoryForm.setValue({
      emailAddr: 'saifjadoon1@yahoo.com',
      quantity: 10,
      terms: true ,
     });
     */
    this.categoryForm.patchValue({
      emailAddr: 'saifjadoon1@yahoo.com',
      quantity: 10
    });
  }



  DisplayCategoryForm(): void {
    this.isVisible = true;
  }


  AddNewCategory(): void {
  }

  save(): void { }



  setMessage(c: AbstractControl): void {
    this.emailMessages = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessages = Object.keys(c.errors)
        .map(key => this.validationMessages[key as keyof typeof this.validationMessages]).join(' ');
    }
  }

  postData(): void {
    /*
    console.log(this.categoryForm);
    console.log(this.categoryForm.value);
    console.log(this.categoryForm.value.emailAddr);
    console.log(this.categoryForm.value.quantity);
    console.log(this.categoryForm.value.terms);
*/

    var catName = this.categoryForm.value.categoryName;
    console.log(`Category name is: ${catName}`);

    const cat = this.categoryForm.value;

    /*
    this.sub.push(this.categoryService.createCategory(cat).subscribe({


       next: category => this.cagetory = category,
       error: err => this.errorMessage = err
    }));
*/

    /**I have wrote code here because it will run after creating category and display it right after but it didn't work*/
    // this.categoryService.getCategories().subscribe(
    //   {
    //     next: categories => this.categories = categories,
    //     error: err => this.errorMessage = err
    //   });
  }


  setNotification(notifyVia: string): void {
    const phoneControl = this.categoryForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }



}
