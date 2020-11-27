import { product } from './../../models/product';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conformation-modal',
  templateUrl: './conformation-modal.component.html',
  styleUrls: ['./conformation-modal.component.scss'],
})
export class ConformationModalComponent implements OnInit {
  @Output() productDelete = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<ConformationModalComponent>) {}

  ngOnInit(): void {}

 

  deleProduct() {
    this.productDelete.emit();
  }

  dismissModal() {
    this.dialogRef.close();
  }
}
