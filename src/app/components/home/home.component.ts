import { ConformationModalComponent } from './../conformation-modal/conformation-modal.component';
import { product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { user } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: user;
  products: Array<product> = [];
  showTable:Boolean=true;
  constructor(
    public ps: ProductService,
    public userService: UserService,
    public router: Router,
    public matDialog: MatDialog
  ) {
    this.getUser();
    this.getProducts();
  }
  getUser() {
    this.userService.getUser().subscribe(
      (response) => {
        this.user = response as user;
        console.log(this.user.firstName);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status == 401) {
          alert(err.error.message);
          this.router.navigate(['login']);
        }
      }
    );
  }

  ngOnInit(): void {}

  openModal() {
    const modalDialog = this.matDialog.open(
      AddProductComponent,
      this.getModalConfig('add-product-component', '450px', '600PX')
    );

    modalDialog.componentInstance['productAdded'].subscribe((event) => {
      console.log(event);
      this.products.push(event as product);
    });
  }

  getProducts() {
    this.ps.getProducts().subscribe(
      (response) => {
        this.products = response as Array<product>;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  editProduct(product: product) {
    console.log('opening edit modal');
    const productEdit = this.matDialog.open(
      AddProductComponent,
      this.getModalConfig('edit-product-component', '450px', '600PX', product)
    );

    productEdit.componentInstance['productEdited'].subscribe(
      (product: product) => {
        console.log(product);
        this.showTable=false;
        let producsArr = this.products;
        this.products = [];
        // this.products.push(event as product);
        this.products = producsArr.filter((item: product) => {
          if (item._id == product._id) {
            console.log("match")
            return product;
          }
          return item;
        });
        console.log(this.products);
        this.showTable=true;
      }
    );
  }

  deleteProduct(product: product) {
    const deleteDialog = this.matDialog.open(
      ConformationModalComponent,
      this.getModalConfig('delete-product-component', '250PX', '400PX')
    );

    deleteDialog.componentInstance['productDelete'].subscribe((event) => {
      console.log('event subscribe');
      deleteDialog.close();
      this.ps.deleteProduct(product).subscribe(
        (res) => {
          this.products = this.products.filter(
            (item: product) => item._id != product._id
          );
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          if (err.error && err.error.message) {
            alert(err.error.message);
          }
        }
      );
    });
  }

  getModalConfig(id, height, width, data?) {
    // https://material.angular.io/components/dialog/overview

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = id;
    dialogConfig.height = height;
    dialogConfig.width = width;

    if (data) dialogConfig.data = data;

    return dialogConfig;
  }
}
