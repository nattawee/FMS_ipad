import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaidVoucherOrderPage } from '../paid-voucher-order/paid-voucher-order';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PaidVoucherPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/paid-voucher/paid-voucher.html',
})
export class PaidVoucherPage {
  paidvoucher:any = [];

  constructor(private navCtrl: NavController,public http: Http) {
    this.http.get('https://pms-service.herokuapp.com/paidvoucher').map(res => {

      return res.json();

    }).subscribe(data => {
      this.paidvoucher = data;
      console.dir(data);
      
    });
    // console.log( this.paidvoucher.Products);
  }

  openPVO(item){
    this.navCtrl.push(PaidVoucherOrderPage, { "paidvoucherdetail": item });
  }

}
