import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { BuyProductPage } from '../buy-product/buy-product';
/*
  Generated class for the ProductPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/product/product.html',
})
export class ProductPage {
  product:any = [{ pid: '1', productName: 'chair', price: '1500', desc: 'เก้าอี้', logo: 'images/chair.png' },
    { pid: '2', productName: 'book', price: '120', desc: 'หนังสือ', logo: 'images/book.png' },
    { pid: '3', productName: 'note book', price: '50', desc: 'สมุด', logo: 'images/notebook.png' },
    { pid: '4', productName: 'pen', price: '15', desc: 'ปากกา', logo: 'images/pen.png' },
    { pid: '5', productName: 'pen', price: '15', desc: 'ปากกา', logo: 'images/pen.png' },
    { pid: '6', productName: 'pen', price: '15', desc: 'ปากกา', logo: 'images/pen.png' },
    { pid: '7', productName: 'pen', price: '15', desc: 'ปากกา', logo: 'images/pen.png' },
    { pid: '8', productName: 'pen', price: '15', desc: 'ปากกา', logo: 'images/pen.png' },
    { pid: '9', productName: 'pencil', price: '10', desc: 'ดินสอ', logo: 'images/pencil.png' }];

  public selectProduct:any = [];

  constructor(private navCtrl: NavController,public viewCtrl: ViewController) {

  }
  dismiss() {
    this.viewCtrl.dismiss();   
  }

  itemSelected(item){
    this.selectProduct.push(item);
    this.viewCtrl.dismiss();    
    // this.navCtrl.push(BuyProductPage,{'selectProduct':this.selectProduct});
  }

}
