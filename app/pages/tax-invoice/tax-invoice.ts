import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaxInvoiceOrderPage } from '../tax-invoice-order/tax-invoice-order';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/tax-invoice/tax-invoice.html',
})
export class TaxInvoicePage {
  taxInvoice:any = [];

  constructor(private navCtrl: NavController,public http: Http) {
    this.http.get('https://pms-service.herokuapp.com/taxInvoice').map(res => {

      return res.json();

    }).subscribe(data => {
      this.taxInvoice = data;
    });
  }

  openPVO(item){
    this.navCtrl.push(TaxInvoiceOrderPage, { "taxInvoiceDetail": item });
  }

}

