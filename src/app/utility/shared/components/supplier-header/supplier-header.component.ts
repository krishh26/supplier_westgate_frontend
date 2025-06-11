import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectNotificationService } from 'src/app/services/project-notification-service/project-notification.service';

@Component({
  selector: 'app-supplier-header',
  templateUrl: './supplier-header.component.html',
  styleUrls: ['./supplier-header.component.scss']
})
export class SupplierHeaderComponent implements OnInit {
  loginUser: any;
  clicked: boolean = false;
  projectNotificationList: any = [];
  projectNotificationCount: any = [];
  routerSubscription: Subscription | null = null;
  navUrlArr: any[] = [];
  isMobileNavOpen = false;
  isDropdownOpen = false;


  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    public router: Router,
    private projectNotificationService: ProjectNotificationService,
    private notificationService: NotificationService
  ) {
    this.loginUser = this.localStorageService.getLogger();
    if (this?.loginUser?.subcontractingSupplier) {
      this.navUrlArr = [
        { title: 'Dashboard', route: '/supplier-admin/supplier-dashboard-header' },
        { title: 'Projects', route: '/supplier-admin/project-list' },
        { title: 'Case Studies', route: '/supplier-admin/case-studies-list' },
        // { title: 'My Projects', route: '/supplier-admin/my-projects' },
        { title: 'Resources', route: '/supplier-admin/role-wise-resources-list' },
      ];
    } else {
      this.navUrlArr = [
        // { title: 'Dashboard', route: '/supplier-admin/supplier-dashboard-header' },
        { title: 'Projects', route: '/supplier-admin/project-list' },
        // { title: 'Case Studies', route: '/supplier-admin/case-studies-list' },
        // { title: 'My Projects', route: '/supplier-admin/my-projects' },
        { title: 'Resources', route: '/supplier-admin/role-wise-resources-list' },
      ];
    }
  }



  ngOnInit(): void {
    this.getNotificationList();
    this.getNotificationcount();

    //this.firstFourNotifications = this.projectNotificationList.slice(0, 4);

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeDropdown();
      }
    });

  }

  get firstFourNotifications() {
    return this.projectNotificationList.slice(0, 4);
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileNav();
  }

  // Close Mobile Navigation when clicking a link
  closeMobileNav() {
    this.isMobileNavOpen = false;
    this.isDropdownOpen = false;
  }

    // Toggle Mobile Navigation
    toggleMobileNav() {
      this.isMobileNavOpen = !this.isMobileNavOpen;
    }

  // Toggle Dropdown Menu
  toggleDropdown(event: Event) {
    event.stopPropagation(); // Prevents event bubbling
    this.clicked = !this.clicked;
  }

  // Toggle User Dropdown Menu
  toggleUserDropdown(event: Event) {
    event.stopPropagation(); // Prevents event bubbling
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.clicked = false;
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  // get list notification
  getNotificationList() {
    this.projectNotificationService.getNotificationList().subscribe((response) => {
      this.projectNotificationList = [];
      if (response?.status) {
        this.projectNotificationList = response?.data;
      } else {
        return this.notificationService.showError(response?.message || 'Something Went Wrong!');
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.message || 'Something Went Wrong!');
    })
  }

  // get list notification
  getNotificationcount() {
    this.projectNotificationService.getNotificationNotification().subscribe((response) => {
      this.projectNotificationCount = [];
      if (response?.status) {
        this.projectNotificationCount = response?.data;
      } else {
        return this.notificationService.showError(response?.message || 'Something Went Wrong!');
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.message || 'Something Went Wrong!');
    })
  }

}
