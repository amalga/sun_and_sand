import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
import { DataService } from "src/app/shared/services/data.service";
import { ItemModel } from "src/app/shared/models/item.model";
import { CartService } from "src/app/shared/services/cart.service";
import { CachingService } from "src/app/shared/services/caching-services";

@Component({
  selector: "sss-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  public rate: number = 3;
  public swatches: Array<ItemModel>;
  public itemModel = new ItemModel();

  public colorSrc: Array<ItemModel>;
  public sizeSrc: Array<ItemModel>;

  public addToCartForm: FormGroup;

  public isWishListed: boolean;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private cahingService: CachingService
  ) {
    this.addToCartForm = this.formBuilder.group({
      color: ["", Validators.required],
      size: ["", Validators.required],
      qty: ["", [Validators.required, Validators.min(1)]]
    });
    this.isWishListed = this.checkIsWishlisted();
  }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: "100%",
        height: "600px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewSwipe: true
      },
      {
        breakpoint: 800,
        width: "100%",
        height: "500px",
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewSwipe: true
      },
      {
        breakpoint: 800,
        width: "100%",
        height: "350px",
        thumbnailsColumns: 3,
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewSwipe: true
      }
    ];
    this.galleryImages = [];
    this.dataService.getImages().subscribe(res => {
      let images = res.gallery.images;
      images.forEach(x => {
        this.galleryImages.push({
          small: x.thumbnail,
          medium: x.large,
          big: x.large
        });
      });
    });

    this.dataService.getSwatches().subscribe(res => {
      this.swatches = res;
      this.colorSrc = res.reduce((unique, x) => {
        if (!unique.some(y => y.color == x.color && y.qty > 0)) {
          unique.push(x);
        }
        return unique;
      }, []);
      this.sizeSrc = res.reduce((unique, x) => {
        if (!unique.some(y => y.size == x.size && y.qty > 0)) {
          unique.push(x);
        }
        return unique;
      }, []);
    });
  }

  onChangeColor(event) {
    if (!this.itemModel.size) {
      this.sizeSrc = this.swatches.filter(x => {
        return x.color == this.itemModel.color;
      });
    }
  }

  onChangeSize(event) {
    if (!this.itemModel.color) {
      this.colorSrc = this.swatches.filter(x => {
        return x.size == this.itemModel.size;
      });
    }
  }

  addToCartSubmit(event) {
    let color = this.itemModel.color;
    let size = this.itemModel.size;
    let qty = this.itemModel.qty;
    let index = this.swatches.findIndex(
      x => x.color == color && x.size == size
    );
    this.itemModel = this.swatches[index];
    this.itemModel.qty = qty;

    this.cartService.addCart(this.itemModel);
  }

  addToWishList() {
    let inWishList = this.checkIsWishlisted();
    if (!inWishList) {
      this.cahingService.storePersistant("wishList", true);
      this.isWishListed = this.checkIsWishlisted();
    }
  }

  checkIsWishlisted(){
    let inWishList = this.cahingService.readPersistant("wishList");
   return inWishList;
  }
}
