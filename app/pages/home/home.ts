import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { TradingPage } from '../trading/trading';
import { PaidVoucherPage } from '../paid-voucher/paid-voucher';
import { TaxInvoicePage } from '../tax-invoice/tax-invoice';
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
    

  }
  openOrderPage(){
    this.navCtrl.push(OrderPage);
  }
  openTrading(){
    this.navCtrl.push(TradingPage);
  }
  openPV(){
    this.navCtrl.push(PaidVoucherPage);
  }
  openTaxinvoice(){
    this.navCtrl.push(TaxInvoicePage);
  }
}