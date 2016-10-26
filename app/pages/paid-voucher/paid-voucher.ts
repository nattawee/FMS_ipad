import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaidVoucherOrderPage } from '../paid-voucher-order/paid-voucher-order';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

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
    });
  }

  openPVO(item){
    this.navCtrl.push(PaidVoucherOrderPage, { "paidvoucherdetail": item });
  }

}
