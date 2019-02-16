import { Component, OnInit, HostListener } from '@angular/core';
import { NavLinkModel } from 'src/app/shared/models/nav-link.model';
import { CurrencyModel } from 'src/app/shared/models/currency.model';
import { CartService } from 'src/app/shared/services/cart.service';



@Component({
  selector: 'sss-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isCollapsed: boolean = true;
  public cartCount;
  public Currencies: Array<CurrencyModel> = [
    {
      value: "USD",
      img: "./assets/images/usa-flag.png"
    },
    {
      value: "AED",
      img: "./assets/images/uae-flag.png"
    }
  ]

  public SelectedCurrency: CurrencyModel = this.Currencies[0]

  public Links: Array<NavLinkModel> = [
    {Name: 'Link 1', Link: '/route1'},
    {Name: 'Link 2', Link: '/route2'},
    {Name: 'Link 3', Link: '/route3'},
  ];


  @HostListener('window:resize', ['$event'])
  onResize(event){
    if(event.currentTarget.innerWidth > 991){
      this.isCollapsed = true;
    }
  }




  constructor(private cartService: CartService ) { 
    this.cartService.itemsCount.subscribe(val =>{
      this.cartCount = val;
    })
  }

  ngOnInit() {
  }


  public onChangeCurrency(index) {
    this.SelectedCurrency = this.Currencies[index];
  }
}
