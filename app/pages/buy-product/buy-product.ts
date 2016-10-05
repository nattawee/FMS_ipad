import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/buy-product/buy-product.html',
})
export class BuyProductPage {
  basket: any = [];
  totalprice:any = 0;
  companydetail : any;
  product:any = [{ id: '1', productName: 'chair', price: '1500', desc: 'เก้าอี้', logo: 'images/chair.png' },
    { id: '2', productName: 'book', price: '120', desc: 'หนังสือ', logo: 'images/book.png' },
    { id: '3', productName: 'note book', price: '50', desc: 'สมุด', logo: 'images/notebook.png' },
    { id: '4', productName: 'pen', price: '15', desc: 'ปากกา', logo: 'images/pen.png' },
    { id: '5', productName: 'pencil', price: '10', desc: 'ดินสอ', logo: 'images/pencil.png' }];

  constructor(private navCtrl: NavController, private navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.companydetail = navParams.get('companydetail');
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
          }
        }
      ]
    });
    confirm.present();
  }

  arrayIndexOf(myArr, key) {
    let result = -1;
    myArr.forEach(function (idx) {
      if (idx.id == key.id) result++;
    });
    return result;
  }

  itemSelected(item) {
    console.log(this.arrayIndexOf(this.basket, item));
    if (this.arrayIndexOf(this.basket, item) != -1) {
        let selected = this.basket.filter(function(itm){
          return itm.id == item.id;
        })[0];

        selected.qty++;
        selected.totalPrice = selected.price * selected.qty;
        this.totalprice += selected.totalPrice;
      } else {
        item.qty = 1;
        item.totalPrice = item.price * item.qty;
        this.totalprice += item.totalPrice;
        this.basket.push(item);
      }
  }
  

}

