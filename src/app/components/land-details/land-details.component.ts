import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Land } from 'src/app/model/land';
import { LandService } from 'src/app/services/land.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-land-details',
  templateUrl: './land-details.component.html',
  styleUrls: ['./land-details.component.css']
})
export class LandDetailsComponent implements OnInit {

  land!: Land
  constructor(private landService: LandService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getLand();
  }
  getLand() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.landService.getLand(id).subscribe(land => this.land = land!);
  }
  goBack(): void {
    this.location.back();
  }
  save() {
    this.landService.updateLand(this.land)
      .subscribe(() => this.goBack());
  }
}
