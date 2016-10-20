import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

/*
  Generated class for the ProductPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/product-page/product-page.html',
})
export class ProductPagePage {

  product = [{ productName: 'หนังสือ', price: '300', image: 'images/book.png', type: 'เครื่องเขียน'},
              { productName: 'หนังสือ', price: '350', image: 'images/chair.png', type: 'เครื่องเขียน'},
              { productName: 'หนังสือ', price: '400', image: 'images/pen.png', type: 'เครื่องเขียน'},
              { productName: 'หนังสือ', price: '200', image: 'images/pencil.png', type: 'อุปกรณ์สำนักงาน'},
              { productName: 'หนังสือ', price: '250', image: 'images/notebook.png', type: 'อุปกรณ์สำนักงาน'},
              { productName: 'หนังสือ', price: '1000', image: 'images/notebook.png', type: 'อุปกรณ์สำนักงาน'}
  ];
  typeName:any;

  constructor(private navCtrl: NavController,public navParams:NavParams) {
    this.typeName = navParams.get('typeName');
  }

}
