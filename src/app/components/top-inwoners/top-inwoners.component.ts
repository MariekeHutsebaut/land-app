import { Component, OnInit } from '@angular/core';
import { Land } from 'src/app/model/land';
import { LandService } from 'src/app/services/land.service';

@Component({
  selector: 'app-top-inwoners',
  templateUrl: './top-inwoners.component.html',
  styleUrls: ['./top-inwoners.component.css']
})
export class TopInwonersComponent implements OnInit {
  landen!: Land[];

  constructor(private landService: LandService) { }

  ngOnInit(): void {
    this.landService.getTopLanden(3).subscribe(toplanden => this.landen = toplanden);

  }
}
