import { Injectable } from '@angular/core';
import { CachingService } from './caching-services';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartService{
    public itemsCount = new BehaviorSubject('0');
    
    constructor(private cahingService: CachingService){
        let cartItems =  this.cahingService.readPersistant("cart");
        if(cartItems){ 
            let itemsLength = this.cahingService.readPersistant("cart").length;
            this.itemsCount.next(itemsLength);
        }
    }

    addCart(item){
        let cartItems =  this.cahingService.readPersistant("cart");

        if(cartItems){
            let itemIndex = cartItems.findIndex(x => x.sku == item.sku && x.color == item.color && x.size == item.size);
            if(itemIndex > -1) {
                cartItems[itemIndex].qty +=  item.qty;
                this.cahingService.storePersistant("cart", cartItems);
                let itemsLength = this.cahingService.readPersistant("cart").length;
                this.itemsCount.next(itemsLength);
    
            } else {
                cartItems.push(item);
                this.cahingService.storePersistant("cart", cartItems)
                let itemsLength = this.cahingService.readPersistant("cart").length;
                this.itemsCount.next(itemsLength); 
            }
        }
        else {
            this.cahingService.storePersistant("cart", [item])
            let itemsLength = this.cahingService.readPersistant("cart").length;
            this.itemsCount.next(itemsLength); 
        }
           
    }

}