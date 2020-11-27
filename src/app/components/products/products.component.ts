import { product } from './../../models/product';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() products: Array<product>;
  @Input() isAdmin: Boolean = false;

  @Output() deleteProduct = new EventEmitter();
  @Output() editProduct = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  edit(product:product){
    this.editProduct.emit(product);
  }

  delete(product: product) {
    this.deleteProduct.emit(product);
  }
  truncate(str){
    return (str.length > 20) ? `<span ata-toggle="tooltip" data-placement="right" title=${str}>${str.substr(0, 19)}</span>` + '...' : str;
  };
}
