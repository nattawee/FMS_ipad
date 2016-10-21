import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/paid-voucher-order/paid-voucher-order.html',
})
export class PaidVoucherOrderPage {
  paidvoucherdetail: any;
  product: any = [];
  fillterCate: any = [];
  boxcate: any = [];
  basket: any = [];
  selectbasket: any = [];
  box: any = [];
  totalPrice: any = 0;

  constructor(private navCtrl: NavController, private navParams: NavParams, public http: Http) {
    this.paidvoucherdetail = navParams.get('paidvoucherdetail');
    this.product = this.paidvoucherdetail;
    this.chooseCate('สินค้า');
    let flags = [], output = [], l = this.product.Products.length, i;

    for (i = 0; i < l; i++) {
      if (flags[this.product.Products[i].Category]) continue;
      flags[this.product.Products[i].Category] = true;
      output.push(this.product.Products[i].Category);
      this.fillterCate = output;
    }
    let productPerCate = 3;
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
  }

  chooseCate(cate) {
    this.basket = this.product.Products.filter(function (el) {
      return (el.Category === cate);
    });
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
  }

  chooseProduct(item) {
    if (this.arrayIndexOf(this.selectbasket, item) != -1) {
      let selected = this.selectbasket.filter(function (itm) {
        return itm._id == item._id;
      })[0];
      selected.QTY++;
      selected.total = selected.Price * selected.QTY;
    } else {
      item.QTY = 1;
      item.total = item.Price * item.QTY;
      this.selectbasket.push(item);
    }
    // sum price
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.selectbasket.length; i++) {
      this.totalPrice += this.selectbasket[i].Price * this.selectbasket[i].QTY;
    }
  }

  arrayIndexOf(myArr, key) {
    let result = -1;
    myArr.forEach(function (idx) {
      if (idx._id == key._id) result++;
    });
    return result;
  }

  cancelPage() {
    this.navCtrl.pop();
  }
}


