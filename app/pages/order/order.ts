import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the OrderPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/order/order.html',
})
export class OrderPage {

  order = [{ orderNum: '1', createDate: '3/10/59', createBy: 'mos', listItem: 'pen', seller: 'homepro', payment: 'pay' },
    { orderNum: '2', createDate: '3/11/59', createBy: 'duke', listItem: 'teble', seller: 'homepro', payment: 'pay' },
    { orderNum: '3', createDate: '3/12/59', createBy: 'nong', listItem: 'telephone', seller: 'itcenter', payment: 'pay' },
    { orderNum: '4', createDate: '3/12/59', createBy: 'duke', listItem: 'mouse', seller: 'tesgo lotus', payment: 'pay' },
    { orderNum: '5', createDate: '3/12/59', createBy: 'nong', listItem: 'note book', seller: 'bigc', payment: 'pay' }
  ]

  constructor(private navCtrl: NavController) {



  }

}
