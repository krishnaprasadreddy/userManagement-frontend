import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../../services/product.service';
import { product } from './../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @Input() product: product;

  @Output() productAdded = new EventEmitter();
  @Output() productEdited = new EventEmitter();

  submitted: boolean = false;
  isEdit: boolean = false;
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private formBuilder: FormBuilder,
    public ps: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: product
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [],
    });
    console.log('****');
    console.log(this.data);
    if (this.data) {
      this.isEdit = true;
      this.form.get('name').setValue(this.data.name);
      this.form.get('price').setValue(this.data.price);
      this.form.get('description').setValue(this.data.description);
    }
  }

  addProduct(product: product) {
    this.ps.addProduct(product).subscribe(
      (response) => {
        console.log(response);
        this.productAdded.emit(response);
        this.dismiss();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error && err.error.message) {
          alert(err.error.message);
        }
      }
    );
  }

  updateProduct(product: product) {
    this.ps.updateProduct(product).subscribe(
      (res) => {
        this.productEdited.emit(res);
        this.dismiss();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error && err.error.message) {
          alert(err.error.message);
        }
      }
    );
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      const prod = this.form.value as product;
      if (this.isEdit) {
        prod._id = this.data._id;
        // console.log('*** ' + prod._id);
        this.updateProduct(prod);
      } else {
        this.addProduct(prod);
      }
    }
  }

  dismiss() {
    console.log('dismiss');
    this.dialogRef.close();
  }
}
