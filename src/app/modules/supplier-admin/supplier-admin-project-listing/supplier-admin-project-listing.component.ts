import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-admin-project-listing',
  templateUrl: './supplier-admin-project-listing.component.html',
  styleUrls: ['./supplier-admin-project-listing.component.scss']
})
export class SupplierAdminProjectListingComponent implements OnInit {
  activeComponent: number = 2;  // 1 : Matched Project , 2 : All Project, 3: Shortlisted, 4: Applied Projects

  constructor(
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.activeComponent = Number(params['type'] || 2)
    });
  }

  changeComponent(componentNumber: number) {
    this.activeComponent = componentNumber;
  }
}
