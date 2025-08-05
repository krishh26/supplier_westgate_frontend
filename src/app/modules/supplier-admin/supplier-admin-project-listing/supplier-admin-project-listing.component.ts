import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-supplier-admin-project-listing',
  templateUrl: './supplier-admin-project-listing.component.html',
  styleUrls: ['./supplier-admin-project-listing.component.scss']
})
export class SupplierAdminProjectListingComponent implements OnInit {
  activeComponent: number = 2;  // 1 : Matched Project , 2 : All Project, 3: Shortlisted, 4: Work In Progress, 5: Submitted, 6: Register Interest
  loginUser: any;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   this.activeComponent = Number(params['type'] || 2)
    // });
    this.activeComponent = this.activeComponent = this.getOrSetActiveComponent('activeComponent', 2);
  }

  changeComponent(componentNumber: number) {
    this.activeComponent = componentNumber;
    sessionStorage.setItem('activeComponent', componentNumber.toString());
  }

  getOrSetActiveComponent(key: string, defaultValue: number): number {
    const storedValue = sessionStorage.getItem(key);

    // Check if the key exists in sessionStorage
    if (storedValue !== null) {
      return parseInt(storedValue, 10);
    }

    // If key doesn't exist, set it to the default value and return it
    sessionStorage.setItem(key, defaultValue.toString());
    return defaultValue;
  }
}

