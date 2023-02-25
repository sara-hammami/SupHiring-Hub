import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Offer } from '../service/offer';
import { OfferService } from '../service/offer.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  public offers: Offer[];
  
  show=false;

  constructor(private offerService: OfferService , private router : Router){}

  ngOnInit() {
    this.getOffers();
  }

  public getOffers(): void {
    this.offerService.getOffers().subscribe(
      (response: Offer[]) => {
        this.offers = response;
        console.log(this.offers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public searchOffres(key: string): void {
    console.log(key);
    const results: Offer[] = [];
    for (const offer of this.offers) {
      if (offer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offer.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offer.company.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offer.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(offer);
      }
    }
    this.offers = results;
    if (results.length === 0 || !key) {
      this.getOffers();
    }
  }

   public deleteOffer(id: number){
    this.offerService.deleteOffer(id).subscribe( data => {
      console.log(data);
      this.getOffers();
    })
  }
  updateOffer(id : number){
    this.router.navigate(['updateoffer',id])
  }

  


}
