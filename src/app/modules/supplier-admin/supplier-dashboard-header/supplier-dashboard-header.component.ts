import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier-dashboard-header',
  templateUrl: './supplier-dashboard-header.component.html',
  styleUrls: ['./supplier-dashboard-header.component.scss']
})
export class SupplierDashboardHeaderComponent {

  activeComponent: number = 1; 

  ngOnInit(): void {

  }

  changeComponent(componentNumber: number) {
    this.activeComponent = componentNumber;
  }

}
