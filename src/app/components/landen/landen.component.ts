import { Component, OnInit } from '@angular/core';
import { Land } from 'src/app/model/land';
import { LandService } from 'src/app/services/land.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landen',
  templateUrl: './landen.component.html',
  styleUrls: ['./landen.component.css']
})
export class LandenComponent implements OnInit {
  fatrash = faTrash;
  landen!: Land[];
  totalVotes!: number;
  selectedLand!: Land;
  nieuwLand = new Land();

  constructor(private landService: LandService) { }

  ngOnInit(): void {
    this.landService.getLanden().subscribe(landen => this.landen = landen);
  }

  onSelect(land: Land): void {
    this.selectedLand = land;
  }

  onValueChange(event: number) {
    this.totalVotes = event;
  }

  add(): void {
    if (!this.nieuwLand.name.trim() || isNaN(this.nieuwLand.inwoners)) { return; }
    this.landService.addLand({ name: this.nieuwLand.name, inwoners: this.nieuwLand.inwoners } as Land)
      .subscribe(land => {
        this.landen.push(land);
        this.nieuwLand = {} as Land; // of = new Land()
      });
  }

  delete(land: Land): void {
    this.landen = this.landen.filter(l => l !== land);
    this.landService.deleteLand(land).subscribe();
  }
}
