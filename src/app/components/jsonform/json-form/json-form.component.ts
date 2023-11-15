import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { JsonFormService } from 'src/app/services/jsonform/json-form.service';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class JsonFormComponent implements OnInit {
//@Input() jsonFormData:any;

errrorMessage:string='';


@Input() jsonFormData:JsonFormData | undefined;

  constructor(private jsonService:JsonFormService) { }

  ngOnInit(): void {
// this.jsonService.jsonForm$.pipe(
//   tap(data => console.log(data)),
//   catchError(err => {
//     this.errrorMessage = err;
//     return EMPTY;
//   })
// );




this.jsonService.PrintMyName('Saifullah');
  }


  getFormControls$ = this.jsonService.getControls();

}
