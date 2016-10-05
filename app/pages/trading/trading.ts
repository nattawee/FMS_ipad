import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BuyProductPage } from '../buy-product/buy-product';


/*
  Generated class for the TradingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/trading/trading.html',
})
export class TradingPage {

  
  Trading:any = [
    {name:"เงินสด", icon:"images/money175x175.jpg", tel:"0124634855", address:"ร้านลุงแปะ"},
    {name:"HomePro", icon:"images/Homepro175x175.png", tel:"023564789", address:" 99 หมู่ 6, ลำลูกกา, ตำบลบึงคำพร้อย อำเภอลำลูกกา ปทุมธานี, 12150"},
    {name:"Big C", icon:"images/big-c175x175.png", tel:"027364842", address:": 10 หมู่ 12 ตำบลบึงคำพร้อย อำเภอลำลูกกา ปทุมธานี 12150"},
    {name:"Lotus", icon:"images/Lotus175x175.png", tel:"023873453", address:" 20/68 หมู่ที่ 18 ต.คูคต อ.ลำลูกกา ปทุมธานี 12150"}    
  ]

  constructor(private navCtrl: NavController) {

  }

  addname(Modelname){
    this.Trading.push({name:Modelname});
  }

  TradingSelected(Trad){
    console.log(Trad);
this.navCtrl.push(BuyProductPage,{"companydetail":Trad});
  }


}
