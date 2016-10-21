import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/tax-invoice-order/tax-invoice-order.html',
})
export class TaxInvoiceOrderPage {
  taxInvoiceDetail: any;
  product: any = [];
  fillterCate: any = [];
  boxcate: any = [];
  basket: any = [];
  selectbasket: any = [];
  box: any = [];

  constructor(private navCtrl: NavController, private navParams: NavParams, public http: Http) {
    this.taxInvoiceDetail = navParams.get('taxInvoiceDetail');
    console.log(this.taxInvoiceDetail);
    this.product = this.taxInvoiceDetail;
    this.chooseCate('สินค้า');
    let flags = [], output = [], l = this.product.Product.length, i;

    for (i = 0; i < l; i++) {
      if (flags[this.product.Product[i].Category]) continue;
      flags[this.product.Product[i].Category] = true;
      output.push(this.product.Product[i].Category);
      this.fillterCate = output;
    }
    let productPerCate = 6;
    let pageCate = Math.ceil(this.fillterCate.length / productPerCate);
    let ii2 = 0;
    for (let i = 0; i < pageCate; i++) {
      let pp = { pageCate: i, fillterCate: [] };

      for (let j = 0; j < productPerCate; j++) {
        if (this.fillterCate[ii2]) pp.fillterCate.push(this.fillterCate[ii2]);
        ii2++;
      }
      this.boxcate.push(pp);
    }
    console.log(this.boxcate);



  }
  chooseCate(cate) {
    this.basket = this.product.Product.filter(function (el) {
      return (el.Category === cate);
    });
    console.log(this.basket);
    this.box = [];
    let productPerPage = 12;
    let page = Math.ceil(this.basket.length / productPerPage);
    let ii = 0;
    for (let i = 0; i < page; i++) {
      let pp = { page: i, basket: [] };

      for (let j = 0; j < productPerPage; j++) {
        if (this.basket[ii]) pp.basket.push(this.basket[ii]);
        ii++;
      }
      this.box.push(pp);
    }
    console.log(this.box);
  }

  chooseProduct(item) {
    this.selectbasket.push(item);
    console.log(this.selectbasket);
  }

  cancelPage() {
    this.navCtrl.pop();
  }
}




