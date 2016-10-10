import { Component } from '@angular/core';
import { Slides, PopoverController, NavController, AlertController, ModalController, ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/buy-product/buy-product.html',
})
export class BuyProductPage {
  basket: any = [];
  totalPrice: any = 0;
  companydetail: any;
  selectedProduct: any = [];
  mySlideOptions: any;
  product: any = [{ id: '1', productName: 'chair', price: 1500, desc: 'เก้าอี้', logo: 'images/book.png' },
    { id: '2', productName: 'book', price: 120, desc: 'หนังสือ', logo: 'images/book.png' },
    { id: '3', productName: 'note book', price: 50, desc: 'สมุด', logo: 'images/book.png' },
    { id: '4', productName: 'pen', price: 15, desc: 'ปากกา', logo: 'images/book.png' },
    { id: '5', productName: 'elaser', price: 25, desc: 'ยางลบ', logo: 'images/book.png' },
    { id: '6', productName: 'pencil', price: 10, desc: 'ดินสอ', logo: 'images/book.png' }];

  constructor(public popoverCtrl: PopoverController, private navCtrl: NavController, private navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.companydetail = navParams.get('companydetail');
    this.mySlideOptions = {
      initialSlide: 0,
      loop: false,
      pager: true
    };
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
              if (this.basket[i].id == item.id) {
                this.basket.splice(i, 1);
                break;
              }
            }
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
      this.totalPrice += this.basket[i].price * this.basket[i].qty;
    }
  }

  arrayIndexOf(myArr, key) {
    let result = -1;
    myArr.forEach(function (idx) {
      if (idx.id == key.id) result++;
    });
    return result;
  }

  itemSelected(item) {
    this.selectedProduct.push(item);
    if (this.arrayIndexOf(this.basket, item) != -1) {
      let selected = this.basket.filter(function (itm) {
        return itm.id == item.id;
      })[0];
      selected.qty++;
      selected.total = selected.price * selected.qty;
    } else {
      item.qty = 1;
      item.total = item.price * item.qty;
      this.basket.push(item);
    }
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

