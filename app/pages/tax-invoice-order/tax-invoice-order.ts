import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  totalPrice: any = 0;

  constructor(private navCtrl: NavController, private navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
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
    this.basket = this.product.Product.filter(function (el) {
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
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการยกเลิกสินค้า',
      message: `คุณต้องการยกเลิกสินค้าใช่หรือไม่`,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {

          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  deleteItem(item) {
    for (let i = 0; i < this.selectbasket.length; i++) {
      if (this.selectbasket[i]._id == item._id) {
        this.selectbasket.splice(i, 1);
        break;
      }
    }
    this.updateTotalPrice();
  }

  saveOrder() {
    let dateNow = new Date().toLocaleDateString();
    let params = {
      "DocNo": "000000002",
      "DocDate": "2016-10-25T00:00:00.000Z",
      "PoRef": "000001",
      "Total": 10000,
      "VatTotal": 170000,
      "WHTTotal": 130000,
      "Amount": 300000,
      "CreditDay": "1970-01-01T00:00:00.015Z",
      "DrillDate": "2016-11-10T00:00:00.000Z",
      "BillDate": "2016-10-25T00:00:00.000Z",
      "ReceiptNo": "000001",
      "ReceiptDate": "2016-10-30T00:00:00.000Z",
      "ReceiptStated": "money",
      "ReceiptRefNo": "9985411111",
      "Product": this.selectbasket,
      "Customer": {
        "Company": {
          "GovermentId": "0000000002",
          "FullName": "บริษัท แอดวานซ์ อินโฟร์ เซอร์วิส",
          "Address": "เขตพญาไท, กรุงเทพมหานคร",
          "TelNo": "088 888 8888",
          "Email": "Demo@gmail.com",
          "BrunchCode": "1235456",
          "CreditDay": 15,
          "AccoutIncome": "999888",
          "AccoutExpense": "888999",
          "IMG": "AIS.png"
        }
      }
    }
  }




