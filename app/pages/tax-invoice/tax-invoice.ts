import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http'; 
import 'rxjs/add/operator/map';

/*
  Generated class for the TaxInvoicePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/tax-invoice/tax-invoice.html',
})
export class TaxInvoicePage {
  product: any= [];
  fillterCate: any=[];
  boxcate: any=[];
  basket: any=[];
  box: any=[];
  constructor(private navCtrl: NavController , public http : Http) {




    this.http.get('https://pms-service.herokuapp.com/product').map(res => { 

      return res.json(); 

    }).subscribe(data => {

      console.dir(data); 
      this.product = data;
      console.log(this.product); 
      var flags = [], output = [], l = this.product.length, i; 
      for (i = 0; i < l; i++) { 
        if (flags[this.product[i].Category]) continue; 
        flags[this.product[i].Category] = true; 
        output.push(this.product[i].Category); 
        this.fillterCate = output; 
        console.log(this.fillterCate); 
      }
       let productPerCate = 6; 
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
      console.log(this.boxcate);
    });

   
    
  }
  chooseCate(cate){
    // console.log(this.orders.order); 
    console.log(cate); 
    this.basket = this.product.filter(function (el) { 
      return (el.Category === cate); 
    }); 
    console.log(this.basket); 
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
    console.log(this.box);
  }

}
