import { Component } from '@angular/core';
import { Slides, PopoverController, NavController, AlertController, ModalController, ViewController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/buy-product/buy-product.html',
})
export class BuyProductPage {
  basket: any = [];
  totalPrice: any = 0;
  companydetail: any;
  selectedProduct: any = [];
  mySlideOptions: any;
  boxs: any = [];
  boxsProduct: any = [];
  product: any = [];

  constructor(public http: Http, public popoverCtrl: PopoverController, private navCtrl: NavController, private navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.companydetail = navParams.get('companydetail');
    this.mySlideOptions = {
      initialSlide: 0,
      loop: false,
      pager: true
    };
    this.http.get('https://pms-service.herokuapp.com/product').map(res => {

      return res.json();

    }).subscribe(data => {
      this.product = data;
      this.setProduct();
    });



  }

  deleteItem(item) {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบสินค้า',
      message: `คุณต้องการลบ ${item.productName} ออกจากตะกร้าสินค้าใช่หรือไม่`,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {

          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            for (let i = 0; i < this.basket.length; i++) {
              if (this.basket[i]._id == item._id) {
                this.basket.splice(i, 1);
                break;
              }
            }
            this.updatePageAndItem();
            this.updateTotalPrice();
          }
        }
      ]
    });
    confirm.present();
  }

  updateTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.basket.length; i++) {
      this.totalPrice += this.basket[i].Price * this.basket[i].qty;
    }
  }

  updatePageAndItem() {
    this.boxs = [];
    let perPage = 3;
    let page = Math.ceil(this.basket.length / perPage);
    let idx = 0;

    for (let i = 0; i < page; i++) {
      let item = { page: i, productPerPage: [] };

      for (let j = 0; j < perPage; j++) {
        if (this.basket[idx]) item.productPerPage.push(this.basket[idx]);
        idx++;
      }
      this.boxs.push(item);
    }
  }

  setProduct() {
    let perPage = 6;
    let page = Math.ceil(this.product.length / perPage);
    let idx = 0;

    for (let i = 0; i < page; i++) {
      let item = { page: i, productPerPage: [] };

      for (let j = 0; j < perPage; j++) {
        if (this.product[idx]) item.productPerPage.push(this.product[idx]);
        idx++;
      }
      this.boxsProduct.push(item);
    }
  }

  arrayIndexOf(myArr, key) {
    let result = -1;
    myArr.forEach(function (idx) {
      if (idx._id == key._id) result++;
    });
    return result;
  }

  itemSelected(item) {
    this.selectedProduct.push(item);
    if (this.arrayIndexOf(this.basket, item) != -1) {
      let selected = this.basket.filter(function (itm) {
        return itm._id == item._id;
      })[0];
      selected.qty++;
      selected.total = selected.Price * selected.qty;
    } else {
      item.qty = 1;
      item.total = item.Price * item.qty;
      this.basket.push(item);
    }
    // updatePageAndItem
    this.updatePageAndItem();
    // sum price
    this.updateTotalPrice();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}

@Component({
  template: `
    <ion-list>
      <ion-list-header>ประเภทสินค้า</ion-list-header>
      <ion-item (click)="close()">เครื่องเขียน</ion-item>
      <ion-item (click)="close()">อุปกรณ์สำนักงาน</ion-item>
      <ion-item (click)="close()">ตกแต่งบ้าน</ion-item>
      <ion-item (click)="close()">อุปกรณ์ไฟฟ้า</ion-item>
      <ion-item (click)="close()">อุปกรณ์ตกแต่งสวน</ion-item>
      <ion-item (click)="close()">ของใช้ทั่วไป</ion-item>
      <ion-item (click)="close()">ห้องนอน</ion-item>
    </ion-list>
  `
})
class PopoverPage {
  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}

