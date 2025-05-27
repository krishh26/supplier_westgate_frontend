import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

interface Expertise {
  name: string;
  type?: string;
  itemId?: string | null;
  subExpertise: string[];
}

interface ExpertiseItem {
  name: string;
  type?: string;
  itemId?: any;
  value: string;
  subExpertise?: string[];
  originalType?: string;
}

interface SubExpertise {
  _id: string;
  name: string;
}

interface ServiceItem {
  name: string;
  value: string;
}

@Component({
  selector: 'app-register-new-supplier',
  templateUrl: './register-new-supplier.component.html',
  styleUrls: ['./register-new-supplier.component.css']
})
export class RegisterNewSupplierComponent implements OnInit {
  companyForm: any = {};
  showLoader: boolean = false;
  showSupplierTypeError: boolean = false;
  currentExpertise: string = '';
  currentSubExpertise: string = '';
  selectedExpertise: ExpertiseItem | null = null;
  selectedSubExpertise: string[] = [];
  selectedSubExpertiseMap: { [key: number]: string[] } = {};
  selectedExpertiseName: string = '';
  currentExpertiseIndex: number = -1;
  subExpertiseOptions: string[] = [];
  subExpertiseInput$ = new Subject<string>();
  randomString: string = '';
  today: string = new Date().toISOString().split('T')[0];
  expertiseDropdownOptions: ExpertiseItem[] = [];
  expertiseGroupedOptions: ExpertiseItem[] = [];
  selectedExpertiseItems: ExpertiseItem[] = [];
  inHoldComment: string = '';
  categoryDomains: any[] = [];
  selectedCategories: string[] = [];
  technologiesList: any[] = [];
  selectedTechnologies: string[] = [];
  industryList: any[] = [];
  selectedIndustries: string[] = [];

  // Services properties
  servicesList: ServiceItem[] = [];
  selectedServices: ServiceItem[] = [];

  // Properties for I Can Do field
  selectedExpertiseICanDoItems: ExpertiseItem[] = [];
  selectedSubExpertiseICanDoMap: { [key: number]: string[] } = {};
  newExpertiseICanDoType: string = 'technologies';

  // Properties for expertise modal
  showExpertiseModal: boolean = false;
  newExpertiseName: string = '';
  newExpertiseType: string = 'technologies'; // Changed to lowercase to match the expertise-list component
  addExpertiseTag = false; // Disabling automatic tag addition

  // Separate properties for I Can Do
  expertiseICanDoDropdownOptions: ExpertiseItem[] = [];
  selectedExpertiseICanDo: ExpertiseItem | null = null;
  selectedSubExpertiseICanDo: string[] = [];
  selectedExpertiseICanDoName: string = '';
  currentExpertiseICanDoIndex: number = -1;
  subExpertiseICanDoOptions: string[] = [];
  subExpertiseICanDoInput$ = new Subject<string>();

  // Add this property
  addingNewSubExpertise: boolean = false;

  supplierWebUserId!: string;

  constructor(
    private superadminService: SuperadminService,
    private notificationService: NotificationService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.supplierWebUserId = params['id'];
      if (!this.supplierWebUserId) {
        this.router.navigateByUrl('/link-expired');
      } // Outputs: darshandumaraliya@gmail.com
    });

    console.log("sdjkfksjhdf", this.supplierWebUserId);

    // Generate a random string to prevent form autofill
    this.randomString = Math.random().toString(36).substring(2, 15);

    // Setup typeahead for sub-expertise search
    this.subExpertiseInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.showLoader = true;
        return this.superadminService.getSubExpertiseDropdownList(term);
      })
    ).subscribe(response => {
      this.showLoader = false;
      if (response?.status) {
        this.subExpertiseOptions = response.data || [];
      }
    });

    // Setup typeahead for I Can Do sub-expertise search
    this.subExpertiseICanDoInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.showLoader = true;
        return this.superadminService.getSubExpertiseDropdownList(term);
      })
    ).subscribe(response => {
      this.showLoader = false;
      if (response?.status) {
        this.subExpertiseICanDoOptions = response.data || [];
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getExpertiseDropdownData();
    this.getExpertiseICanDoDropdownData();
    this.getSubExpertiseDropdownData();
    this.getSubExpertiseICanDoDropdownData();
    this.getCategoryDomains();
    this.getTechnologiesList();
    this.getIndustryList();
    this.geSupplierPublicDetails();

    // Initialize services list
    this.servicesList = [
      { name: 'Pre-Built Software Solutions', value: 'Pre-Built Software Solutions' },
      { name: 'Custom Software Development', value: 'Custom Software Development' },
      { name: 'Hosting & Infrastructure', value: 'Hosting & Infrastructure' },
      { name: 'IT Consulting & System Integration', value: 'IT Consulting & System Integration' },
      { name: 'Support & Maintenance', value: 'Support & Maintenance' },
      { name: 'Analytics & Reporting', value: 'Analytics & Reporting' },
      { name: 'Security & Compliance', value: 'Security & Compliance' },
      { name: 'Logos, UI/UX', value: 'Logos, UI/UX' },
      { name: 'Digital Marketing & SEO', value: 'Digital Marketing & SEO' },
      { name: 'DevOps & Automation', value: 'DevOps & Automation' },
      { name: 'AI & Machine Learning', value: 'AI & Machine Learning' },
      { name: 'Data Migration & Legacy Modernisation', value: 'Data Migration & Legacy Modernisation' },
      { name: 'Quality Assurance and Software Testing', value: 'Quality Assurance and Software Testing' },
      { name: 'Blockchain Development', value: 'Blockchain Development' },
      { name: 'IoT Development', value: 'IoT Development' }
    ];

    // Add fallback options for both expertise and I Can Do
    if (this.subExpertiseOptions.length === 0) {
      this.addFallbackSubExpertiseOptions();
    }
    if (this.subExpertiseICanDoOptions.length === 0) {
      this.addFallbackSubExpertiseICanDoOptions();
    }

    // Initialize expertiseDropdownOptions with value property
    this.expertiseDropdownOptions = this.expertiseDropdownOptions.map(item => ({
      ...item,
      value: item.name
    }));
  }

  geSupplierPublicDetails() {
    this.superadminService.getWebUserPublicDetails(this.supplierWebUserId).subscribe((response) => {
      if (!response?.data?.isPOCUserUpdate) {
        this.companyForm = {
          companyName: response?.data?.companyName,
          website: response?.data?.website || '',
          companyAddress: response?.data?.companyAddress || '',
          country: response?.data?.country || '',
          email: response?.data?.email || '',
          companyContactNumber: response?.data?.companyContactNumber || '',
          yearOfEstablishment: response?.data?.yearOfEstablishment || '',
          executiveSummary: response?.data?.executiveSummary || '',
          poc_name: response?.data?.poc_name || '',
          poc_phone: response?.data?.poc_phone || '',
          poc_email: response?.data?.poc_email || '',
          poc_role: response?.data?.poc_role || '',
          typeOfCompany: response?.data?.typeOfCompany || [],
          industry_Sector: response?.data?.industry_Sector || [],
          employeeCount: response?.data?.employeeCount || '',
          turnover: response?.data?.turnover || '',
          totalProjectsExecuted: response?.data?.totalProjectsExecuted || '',
          certifications: response?.data?.certifications || [],
          expertise: response?.data?.expertise || [],
          expertiseICanDo: response?.data?.expertiseICanDo || [],
          categoryList: response?.data?.categoryList || [],
          technologyStack: response?.data?.technologyStack || [],
          keyClients: response?.data?.keyClients || [],
          resourceSharingSupplier: response?.data?.resourceSharingSupplier || false,
          subcontractingSupplier: response?.data?.subcontractingSupplier || false,
          inHoldComment: response?.data?.inHoldComment || [],
          icando: response?.data?.icando || []
        };
      } else {
        this.router.navigateByUrl('/link-expired');
      }
    });
  }

  initializeForm() {
    this.companyForm = {
      companyName: '',
      website: '',
      companyAddress: '',
      country: '',
      email: '',
      companyContactNumber: '',
      yearOfEstablishment: '',
      executiveSummary: '',
      poc_name: '',
      poc_phone: '',
      poc_email: '',
      poc_role: '',
      typeOfCompany: [],
      industry_Sector: [],
      employeeCount: '',
      turnover: '',
      totalProjectsExecuted: '',
      certifications: [],
      expertise: [],
      expertiseICanDo: [],
      categoryList: [],
      technologyStack: [],
      keyClients: [],
      resourceSharingSupplier: false,
      subcontractingSupplier: false,
      inHoldComment: [],
      icando: []
    };
  }

  addFallbackSubExpertiseOptions() {
    // This is just for testing if the dropdown works with data
    this.subExpertiseOptions = [
      'Banking',
      'Information Technology (IT)',
      'Education',
      'Healthcare',
      'Insurance'
    ];
  }

  getExpertiseDropdownData() {
    this.showLoader = true;
    const url = `${environment.baseUrl}/web-user/public/drop-down-list`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response?.status && response?.data) {
          const data = response.data || [];

          // Define the 6 specific types we want to display
          const typeGroups: { [key: string]: ExpertiseItem[] } = {
            'product': [],
            'domain': [],
            'technologies': [],
            'product-other': [],
            'domain-other': [],
            'technologies-other': []
          };

          // Process grouped data from the API
          data.forEach((group: any) => {
            if (!group || Object.keys(group).length === 0) {
              return; // Skip empty groups
            }

            // Each group is an object with a single key (the type) and array value
            const groupType = Object.keys(group)[0];
            const items = group[groupType] || [];

            // Check if this is one of our tracked types
            if (groupType in typeGroups) {
              // Process items in this group
              items.forEach((item: any) => {
                typeGroups[groupType].push({
                  itemId: item._id,
                  name: item.name,
                  type: groupType,
                  originalType: groupType,
                  value: item.name
                });
              });
            }
          });

          // Combine all items into a single array in the desired order
          let allItems: ExpertiseItem[] = [];
          // First add the 3 main types
          allItems = allItems.concat(
            typeGroups['product'],
            typeGroups['domain'],
            typeGroups['technologies']
          );

          // Then add the 3 "other" types
          allItems = allItems.concat(
            typeGroups['product-other'],
            typeGroups['domain-other'],
            typeGroups['technologies-other']
          );

          this.expertiseDropdownOptions = allItems;
          this.expertiseGroupedOptions = allItems;
        } else {
          console.error('Failed to fetch expertise data:', response?.message);
          this.notificationService.showError('Failed to fetch expertise data');
          this.expertiseDropdownOptions = [];
          this.expertiseGroupedOptions = [];
        }
        this.showLoader = false;
      },
      (error) => {
        console.error('Error fetching expertise data:', error);
        this.notificationService.showError('Error fetching expertise data');
        this.showLoader = false;
        this.expertiseDropdownOptions = [];
        this.expertiseGroupedOptions = [];
      }
    );
  }

  getSubExpertiseDropdownData(searchText: string = '') {
    this.showLoader = true;

    this.superadminService.getSubExpertiseDropdownList(searchText).subscribe(
      (response) => {

        if (response?.status) {
          // Handle the array of strings directly
          this.subExpertiseOptions = response.data || [];
        } else {
          console.error('Failed to fetch sub-expertise dropdown data:', response?.message);
          this.notificationService.showError('Failed to fetch sub-expertise dropdown data');
        }
        this.showLoader = false;
      },
      (error) => {
        console.error('Error fetching sub-expertise dropdown data:', error);
        this.notificationService.showError('Error fetching sub-expertise dropdown data');
        this.showLoader = false;
      }
    );
  }

  addExpertise() {
    if (this.currentExpertise) {
      this.companyForm.expertise.push({
        name: this.currentExpertise.trim(),
        subExpertise: []
      });
      this.currentExpertise = '';
    }
  }

  addSubExpertise(expertiseIndex: number) {
    if (this.currentSubExpertise) {
      this.companyForm.expertise[expertiseIndex].subExpertise.push(this.currentSubExpertise.trim());
      this.currentSubExpertise = '';
    }
  }

  removeExpertise(index: number) {
    this.companyForm.expertise.splice(index, 1);
  }

  removeSubExpertise(expertiseIndex: number, subExpertiseIndex: number) {
    this.companyForm.expertise[expertiseIndex].subExpertise.splice(subExpertiseIndex, 1);
  }

  addArrayItem(arrayName: string, value: string) {
    if (value.trim()) {
      if (!this.companyForm[arrayName]) {
        this.companyForm[arrayName] = [];
      }
      this.companyForm[arrayName].push(value.trim());
      value = '';
    }
  }

  removeArrayItem(arrayName: string, index: number) {
    this.companyForm[arrayName].splice(index, 1);
  }

  submitForm() {
    // Check required fields
    if (!this.companyForm.companyName || !this.companyForm.poc_name || !this.companyForm.poc_phone) {
      this.notificationService.showError('Please fill in all required fields: Company Name, POC Name, and POC Phone');
      return;
    }

    // Check at least one supplier type is selected
    if (!this.companyForm.resourceSharingSupplier && !this.companyForm.subcontractingSupplier) {
      this.showSupplierTypeError = true;
      this.notificationService.showError('Please select at least one supplier type');
      return;
    } else {
      this.showSupplierTypeError = false;
    }

    // Check if all expertise items have at least one sub-expertise
    if (this.companyForm.expertise.length > 0) {
      const missingSubExpertise = this.companyForm.expertise.some((expertise: any) =>
        !expertise.subExpertise || expertise.subExpertise.length === 0
      );

      if (missingSubExpertise) {
        this.notificationService.showError('Each expertise must have at least one sub-expertise');
        return;
      }
    }

    // Check if all I Can Do items have at least one sub-expertise
    if (this.companyForm.expertiseICanDo.length > 0) {
      const missingSubExpertise = this.companyForm.expertiseICanDo.some((expertise: any) =>
        !expertise.subExpertise || expertise.subExpertise.length === 0
      );

      if (missingSubExpertise) {
        this.notificationService.showError('Each I Can Do item must have at least one sub-expertise');
        return;
      }
    }

    // Ensure selected categories, industries, and technologies are in the form data
    this.onCategoryChange();
    this.onIndustryChange();
    this.onTechnologiesChange();

    // Create a copy of the form data
    const formData = { ...this.companyForm };

    // Remove empty email field
    if (!formData.email) {
      delete formData.email;
    }

    // Remove empty POC email field
    if (!formData.poc_email) {
      delete formData.poc_email;
    }

    // Prepare year of establishment
    if (formData.yearOfEstablishment) {
      const date = new Date(formData.yearOfEstablishment);
      formData.yearOfEstablishment = date.toISOString().split('T')[0];
    }

    // If expertise is empty, initialize it
    if (!formData.expertise) {
      formData.expertise = [];
    }

    // If expertiseICanDo is empty, initialize it
    if (!formData.expertiseICanDo) {
      formData.expertiseICanDo = [];
    }

    // Add inHoldComment in the required format
    if (this.inHoldComment.trim()) {
      formData.inHoldComment = [
        {
          comment: this.inHoldComment.trim()
        }
      ];
    }

    this.spinner.show();
    this.superadminService.updateUserPublic(this.supplierWebUserId, formData).subscribe((response) => {
      if (response?.status === true) {
        this.showLoader = false;
        this.notificationService.showSuccess('Supplier update successfully.');
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
      this.spinner.hide();
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
      this.spinner.hide();
    });
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  handleEnterKey(event: Event, arrayName: string) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    if (input.value.trim()) {
      this.addArrayItem(arrayName, input.value);
      input.value = '';
    }
  }

  checkSupplierTypeSelection() {
    // Hide error message if at least one supplier type is selected
    this.showSupplierTypeError = !this.companyForm.resourceSharingSupplier && !this.companyForm.subcontractingSupplier;
  }

  hasInvalidExpertise(): boolean {
    return this.companyForm.expertise.some((expertise: ExpertiseItem) =>
      !expertise.subExpertise || expertise.subExpertise.length === 0
    ) || this.companyForm.expertiseICanDo.some((expertise: ExpertiseItem) =>
      !expertise.subExpertise || expertise.subExpertise.length === 0
    );
  }

  toggleSelectAllExpertise(event: any) {
    if (event.target.checked) {
      this.selectedExpertiseItems = [...this.expertiseDropdownOptions];
    } else {
      this.selectedExpertiseItems = [];
    }
  }

  toggleSelectAllServices(event: any) {
    if (event.target.checked) {
      this.selectedServices = [...this.servicesList];
    } else {
      this.selectedServices = [];
    }
    // Update the form's icando field
    this.companyForm.icando = this.selectedServices.map(service => service.name);
  }

  toggleSelectAllExpertiseICanDo(event: any) {
    if (event.target.checked) {
      this.selectedExpertiseICanDoItems = [...this.expertiseDropdownOptions];
    } else {
      this.selectedExpertiseICanDoItems = [];
    }
  }

  addMultipleSubExpertise(expertiseIndex: number) {

    // Get the selected sub-expertise for this expertise index
    const selectedItems = this.selectedSubExpertiseMap[expertiseIndex] || [];

    if (selectedItems && selectedItems.length > 0) {
      // Get existing sub-expertise as a Set for faster lookup
      const existingSubExpertise = new Set(this.companyForm.expertise[expertiseIndex].subExpertise);

      // Add each selected sub-expertise that doesn't already exist
      for (const subExp of selectedItems) {
        if (!existingSubExpertise.has(subExp)) {
          this.companyForm.expertise[expertiseIndex].subExpertise.push(subExp);
        }
      }

      // Clear the selection
      this.selectedSubExpertiseMap[expertiseIndex] = [];
    }
  }

  // Method to toggle select all for sub-expertise
  toggleSelectAllSubExpertise(expertiseIndex: number, event: any) {
    if (event.target.checked) {
      this.selectedSubExpertiseMap[expertiseIndex] = [...this.subExpertiseOptions];
    } else {
      this.selectedSubExpertiseMap[expertiseIndex] = [];
    }
  }

  // Method to handle selection changes for sub-expertise
  onSubExpertiseChange(expertiseIndex: number, selected: string[] | any) {
    // Update the map with the new selection
    this.selectedSubExpertiseMap[expertiseIndex] = [...selected];
  }

  addExpertiseFromDropdown() {
    if (this.selectedExpertise) {
      // Check if this expertise already exists in the list
      const exists = this.companyForm.expertise.some((item: any) =>
        item.name === this.selectedExpertise?.name
      );

      if (!exists) {
        this.companyForm.expertise.push({
          name: this.selectedExpertise.name,
          type: this.selectedExpertise.type || 'technologies',
          itemId: this.selectedExpertise.itemId,
          subExpertise: []
        });
      }
      // Clear the selection
      this.selectedExpertise = null;
    }
  }

  addExpertiseFromSelection() {
    if (this.selectedExpertiseName) {
      // Find the selected expertise from the dropdown options
      const selectedExp = this.expertiseDropdownOptions.find(exp => exp.name === this.selectedExpertiseName);

      if (selectedExp) {
        // Check if this expertise already exists in the list
        const exists = this.companyForm.expertise.some((item: any) =>
          item.name === this.selectedExpertiseName
        );

        if (!exists) {
          this.companyForm.expertise.push({
            name: selectedExp.name,
            type: selectedExp.type || 'technologies',
            itemId: selectedExp.itemId,
            subExpertise: []
          });

        }
      }
      // Clear the selection
      this.selectedExpertiseName = '';
    }
  }

  getCategoryDomains() {
    this.showLoader = true;
    const url = `${environment.baseUrl}/web-user/public/drop-down?type=domain`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response?.status) {
          // Check if the data is an array of objects or simple strings
          if (response.data && response.data.length > 0) {
            if (typeof response.data[0] === 'object') {
              // If data contains objects, transform to format compatible with ng-select
              this.categoryDomains = response.data.map((item: any) => {
                // For ng-select, we need objects with consistent properties
                // If item already has name/value, use it
                if (item.name && item.value) {
                  return item;
                }

                // Try different property names that might exist
                const value = item.name || item.value || item.domain || item.category || JSON.stringify(item);
                return {
                  name: value,
                  value: value
                };
              });
            } else {
              // If data is already an array of strings, convert to objects for ng-select
              this.categoryDomains = response.data.map((item: string) => {
                return {
                  name: item,
                  value: item
                };
              });
            }
          } else {
            this.categoryDomains = [];
          }
        } else {
          console.error('Failed to fetch category domains:', response?.message);
          this.notificationService.showError('Failed to fetch category domains');
          this.categoryDomains = [];
        }
        this.showLoader = false;
      },
      (error) => {
        console.error('Error fetching category domains:', error);
        this.notificationService.showError('Error fetching category domains');
        this.showLoader = false;
        this.categoryDomains = [];
      }
    );
  }

  // Updated method to handle changes in the category ng-select component
  onCategoryChange() {
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      // Extract just the values/names directly to the form array
      this.companyForm.categoryList = [...this.selectedCategories];
    } else {
      this.companyForm.categoryList = [];
    }
  }

  // Add method for adding custom items
  onItemAddCategory(event: any) {
    if (event) {
      // If it's a string from addTag
      if (typeof event === 'string') {
        // Check if the object with this value already exists
        const exists = this.categoryDomains.some(item => item.value === event);
        if (!exists) {
          this.categoryDomains.push({ name: event, value: event });
        }
      } else if (event && event.value) {
        // It's an object from the selection
        const exists = this.categoryDomains.some(item => item.value === event.value);
        if (!exists) {
          this.categoryDomains.push(event);
        }
      }
    }
  }

  getTechnologiesList() {
    this.showLoader = true;
    const url = `${environment.baseUrl}/roles/public/get-technologies`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response?.status || response?.data) {
          // Extract data from response
          const data = response.data || response;

          // Process the data to make it compatible with ng-select
          if (Array.isArray(data)) {
            if (data.length > 0) {
              if (typeof data[0] === 'object') {
                // If data contains objects, transform to format compatible with ng-select
                this.technologiesList = data.map((item: any) => {
                  // For ng-select, we need objects with consistent properties
                  const value = item.name || item.value || item.technology || JSON.stringify(item);
                  return {
                    name: value,
                    value: value
                  };
                });
              } else {
                // If data is already an array of strings, convert to objects for ng-select
                this.technologiesList = data.map((item: string) => {
                  return {
                    name: item,
                    value: item
                  };
                });
              }
            }
          } else {
            // Handle case where data might be an object with arrays inside
            this.technologiesList = [];
            for (const key in data) {
              if (Array.isArray(data[key])) {
                data[key].forEach((item: any) => {
                  const value = typeof item === 'object' ?
                    (item.name || item.value || item.technology || JSON.stringify(item)) :
                    item;
                  this.technologiesList.push({
                    name: value,
                    value: value
                  });
                });
              }
            }
          }

        } else {
          console.error('Failed to fetch technologies data:', response?.message);
          this.notificationService.showError('Failed to fetch technologies data');
          this.technologiesList = [];
        }
        this.showLoader = false;
      },
      (error) => {
        console.error('Error fetching technologies data:', error);
        this.notificationService.showError('Error fetching technologies data');
        this.showLoader = false;
        this.technologiesList = [];
      }
    );
  }

  // Updated method to handle changes in the technologies ng-select component
  onTechnologiesChange() {
    if (this.selectedTechnologies && this.selectedTechnologies.length > 0) {
      // Extract just the values/names directly to the form array
      this.companyForm.technologyStack = [...this.selectedTechnologies];
    } else {
      this.companyForm.technologyStack = [];
    }
  }

  // Renamed method for adding custom technology items
  onItemAddTechnology(event: any) {
    if (event) {
      // If it's a string from addTag
      if (typeof event === 'string') {
        // Call API to create new technology
        this.showLoader = true;
        const url = `${environment.baseUrl}/tech-language/technologies`;
        const payload = { name: event };

        this.http.post(url, payload).subscribe({
          next: (response: any) => {
            if (response?.status) {
              // Add to local list if API call successful
              this.technologiesList.push({ name: event, value: event });
              this.notificationService.showSuccess('Technology added successfully');
            } else {
              this.notificationService.showError(response?.message || 'Failed to add technology');
            }
            this.showLoader = false;
          },
          error: (error: any) => {
            this.notificationService.showError(error?.message || 'Failed to add technology');
            this.showLoader = false;
          }
        });
      } else if (event && event.value) {
        // It's an object from the selection
        const exists = this.technologiesList.some(item => item.value === event.value);
        if (!exists) {
          this.technologiesList.push(event);
        }
      }
    }
  }

  getIndustryList() {
    this.showLoader = true;
    const url = `${environment.baseUrl}/web-user/public/sub-expertise/list`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response?.status) {
          // Process the data
          if (response.data && Array.isArray(response.data)) {
            if (response.data.length > 0) {
              if (typeof response.data[0] === 'object') {
                // If response.data contains objects, format them for ng-select
                this.industryList = response.data.map((item: any) => {
                  return {
                    name: item.name || item.value || item.subExpertise || item.expertise || JSON.stringify(item),
                    value: item.name || item.value || item.subExpertise || item.expertise || JSON.stringify(item)
                  };
                });
              } else {
                // If data is already an array of strings
                this.industryList = response.data.map((item: string) => {
                  return {
                    name: item,
                    value: item
                  };
                });
              }
            }
          } else {
            this.industryList = [];
          }
        } else {
          console.error('Failed to fetch industry data:', response?.message);
          this.notificationService.showError('Failed to fetch industry data');
          this.industryList = [];
        }
        this.showLoader = false;
      },
      (error) => {
        console.error('Error fetching industry data:', error);
        this.notificationService.showError('Error fetching industry data');
        this.showLoader = false;
        this.industryList = [];
      }
    );
  }

  // Updated method to handle changes in the industry ng-select component
  onIndustryChange() {
    if (this.selectedIndustries && this.selectedIndustries.length > 0) {
      // Extract just the values/names directly to the form array
      this.companyForm.industry_Sector = [...this.selectedIndustries];
    } else {
      this.companyForm.industry_Sector = [];
    }
  }

  // Add method for adding custom industry items
  onItemAddIndustry(event: any) {
    if (event) {
      // If it's a string from addTag
      if (typeof event === 'string') {
        // Check if the object with this value already exists
        const exists = this.industryList.some(item => item.value === event);
        if (!exists) {
          this.industryList.push({ name: event, value: event });
        }
      } else if (event && event.value) {
        // It's an object from the selection
        const exists = this.industryList.some(item => item.value === event.value);
        if (!exists) {
          this.industryList.push(event);
        }
      }
    }
  }

  // Update to use ng-select for expertise
  onExpertiseChange() {
    // This will be triggered when the expertise selection changes in ng-select
  }

  // Add expertise from ng-select dropdown
  addSelectedExpertise() {
    if (this.selectedExpertiseItems && this.selectedExpertiseItems.length > 0) {
      this.selectedExpertiseItems.forEach(item => {
        this.companyForm.expertise.push({
          name: item.name,
          type: this.newExpertiseType,
          itemId: item.itemId,
          value: item.value,
          subExpertise: []
        });
      });
      this.selectedExpertiseItems = [];
    }
  }

  // Method to handle adding custom expertise items if needed
  onItemAddExpertise(item: any) {
    // If this method is called directly, use the default type
    if (!item.type) {
      item.type = 'Technologies';
    }

    // Add to dropdown options if it doesn't exist
    if (!this.expertiseDropdownOptions.some(e => e.name === item.name)) {
      this.expertiseDropdownOptions.push({
        name: item.name,
        value: item.name,
        type: item.type,
        itemId: item.itemId
      });
    }
  }

  // Implementation of onAddTag for adding expertise with type selection
  onAddTag = (term: string) => {
    if (!this.newExpertiseType) {
      this.notificationService.showError('Please select expertise type');
      return null;
    }

    const expertiseType = this.newExpertiseType;
    const newExpertise = {
      name: term,
      value: term,
      type: expertiseType,
      itemId: null
    };

    this.showLoader = true;
    this.superadminService.createCustomExpertise({
      name: term,
      value: term,
      type: expertiseType
    }).subscribe(
      (response: any) => {
        if (response?.status) {
          newExpertise.itemId = response.data._id;
          this.expertiseDropdownOptions = [...this.expertiseDropdownOptions, newExpertise];
          this.notificationService.showSuccess('Expertise added successfully');
        } else {
          this.notificationService.showError(response?.message || 'Failed to add expertise');
        }
        this.showLoader = false;
      },
      (error: any) => {
        this.notificationService.showError(error?.message || 'Failed to add expertise');
        this.showLoader = false;
      }
    );

    return newExpertise;
  }

  // Add this method to handle adding new technologies
  addTechnology = (name: string) => {
    return new Promise<any>((resolve) => {
      this.showLoader = true;
      const url = `${environment.baseUrl}/tech-language/technologies`;
      const payload = { name: name, value: name };

      this.http.post(url, payload).subscribe({
        next: (response: any) => {
          if (response?.status) {
            const newTech = { name: name, value: name };
            this.technologiesList = [...this.technologiesList, newTech];
            this.notificationService.showSuccess('Technology added successfully');
            resolve(newTech);
          } else {
            this.notificationService.showError(response?.message || 'Failed to add technology');
            resolve(null);
          }
          this.showLoader = false;
        },
        error: (error: any) => {
          this.notificationService.showError(error?.message || 'Failed to add technology');
          this.showLoader = false;
          resolve(null);
        }
      });
    });
  }

  // Add methods for I Can Do functionality
  removeExpertiseICanDo(index: number) {
    this.companyForm.expertiseICanDo.splice(index, 1);
    delete this.selectedSubExpertiseICanDoMap[index];
  }

  removeSubExpertiseICanDo(expertiseIndex: number, subIndex: number) {
    this.companyForm.expertiseICanDo[expertiseIndex].subExpertise.splice(subIndex, 1);
  }

  onSubExpertiseICanDoChange(index: number, selected: string[]) {
    this.selectedSubExpertiseICanDoMap[index] = [...selected];
  }

  addMultipleSubExpertiseICanDo(index: number) {
    const selectedItems = this.selectedSubExpertiseICanDoMap[index] || [];
    if (selectedItems && selectedItems.length > 0) {
      const existingSubExpertise = new Set(this.companyForm.expertiseICanDo[index].subExpertise);
      for (const subExp of selectedItems) {
        if (!existingSubExpertise.has(subExp)) {
          this.companyForm.expertiseICanDo[index].subExpertise.push(subExp);
        }
      }
      this.selectedSubExpertiseICanDoMap[index] = [];
    }
  }

  onAddTagICanDo = (term: string) => {
    if (!this.newExpertiseICanDoType) {
      this.notificationService.showError('Please select I Can Do expertise type');
      return null;
    }

    const expertiseType = this.newExpertiseICanDoType;
    const newExpertise = {
      name: term,
      value: term,
      type: expertiseType,
      itemId: null
    };

    this.showLoader = true;
    this.superadminService.createCustomExpertise({
      name: term,
      value: term,
      type: expertiseType
    }).subscribe(
      (response: any) => {
        if (response?.status) {
          newExpertise.itemId = response.data._id;
          this.expertiseICanDoDropdownOptions = [...this.expertiseICanDoDropdownOptions, newExpertise];
          this.notificationService.showSuccess('I Can Do expertise added successfully');
        } else {
          this.notificationService.showError(response?.message || 'Failed to add I Can Do expertise');
        }
        this.showLoader = false;
      },
      (error: any) => {
        this.notificationService.showError(error?.message || 'Failed to add I Can Do expertise');
        this.showLoader = false;
      }
    );

    return newExpertise;
  }

  addSelectedExpertiseICanDo() {
    if (this.selectedExpertiseICanDoItems && this.selectedExpertiseICanDoItems.length > 0) {
      this.selectedExpertiseICanDoItems.forEach(item => {
        this.companyForm.expertiseICanDo.push({
          name: item.name,
          type: this.newExpertiseICanDoType,
          itemId: item.itemId,
          value: item.value,
          subExpertise: []
        });
      });
      this.selectedExpertiseICanDoItems = [];
    }
  }

  loadExpertises() {
    this.showLoader = true;
    this.superadminService.getExpertiseList().subscribe(
      (response: any) => {
        if (response?.status) {
          this.expertiseDropdownOptions = response.data.map((item: any) => ({
            name: item.name,
            value: item.name,
            type: item.type,
            itemId: item._id
          }));
        } else {
          this.notificationService.showError(response?.message || 'Failed to load expertise list');
        }
        this.showLoader = false;
      },
      (error: any) => {
        this.notificationService.showError(error?.message || 'Failed to load expertise list');
        this.showLoader = false;
      }
    );
  }

  // Separate methods for I Can Do functionality
  getExpertiseICanDoDropdownData() {
    this.showLoader = true;
    const url = `${environment.baseUrl}/web-user/public/drop-down-list`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response?.status && response?.data) {
          const data = response.data || [];

          // Define the 6 specific types we want to display
          const typeGroups: { [key: string]: ExpertiseItem[] } = {
            'product': [],
            'domain': [],
            'technologies': [],
            'product-other': [],
            'domain-other': [],
            'technologies-other': []
          };

          // Process grouped data from the API
          data.forEach((group: any) => {
            if (!group || Object.keys(group).length === 0) {
              return; // Skip empty groups
            }

            // Each group is an object with a single key (the type) and array value
            const groupType = Object.keys(group)[0];
            const items = group[groupType] || [];

            // Check if this is one of our tracked types
            if (groupType in typeGroups) {
              // Process items in this group
              items.forEach((item: any) => {
                typeGroups[groupType].push({
                  itemId: item._id,
                  name: item.name,
                  type: groupType,
                  originalType: groupType,
                  value: item.name
                });
              });
            }
          });

          // Combine all items into a single array in the desired order
          let allItems: ExpertiseItem[] = [];
          // First add the 3 main types
          allItems = allItems.concat(
            typeGroups['product'],
            typeGroups['domain'],
            typeGroups['technologies']
          );

          // Then add the 3 "other" types
          allItems = allItems.concat(
            typeGroups['product-other'],
            typeGroups['domain-other'],
            typeGroups['technologies-other']
          );

          this.expertiseICanDoDropdownOptions = allItems;
        } else {
          console.error('Failed to fetch I Can Do expertise data:', response?.message);
          this.notificationService.showError('Failed to fetch I Can Do expertise data');
          this.expertiseICanDoDropdownOptions = [];
        }
        this.showLoader = false;
      },
      (error) => {
        console.error('Error fetching I Can Do expertise data:', error);
        this.notificationService.showError('Error fetching I Can Do expertise data');
        this.showLoader = false;
        this.expertiseICanDoDropdownOptions = [];
      }
    );
  }

  getSubExpertiseICanDoDropdownData(searchText: string = '') {
    this.showLoader = true;
    this.superadminService.getSubExpertiseDropdownList(searchText).subscribe(
      (response) => {
        if (response?.status) {
          this.subExpertiseICanDoOptions = response.data || [];
        } else {
          this.notificationService.showError('Failed to fetch I Can Do sub-expertise dropdown data');
        }
        this.showLoader = false;
      },
      (error) => {
        this.notificationService.showError('Error fetching I Can Do sub-expertise dropdown data');
        this.showLoader = false;
      }
    );
  }

  addFallbackSubExpertiseICanDoOptions() {
    this.subExpertiseICanDoOptions = [
      'Banking',
      'Information Technology (IT)',
      'Education',
      'Healthcare',
      'Insurance'
    ];
  }

  onExpertiseICanDoChange() {
  }

  onItemAddExpertiseICanDo(item: any) {
    if (!item.type) {
      item.type = 'Technologies';
    }

    if (!this.expertiseICanDoDropdownOptions.some(e => e.name === item.name)) {
      this.expertiseICanDoDropdownOptions.push({
        name: item.name,
        value: item.name,
        type: item.type,
        itemId: item.itemId
      });
    }
  }

  // Method to toggle select all for I Can Do sub-expertise
  toggleSelectAllSubExpertiseICanDo(expertiseIndex: number, event: any) {
    if (event.target.checked) {
      this.selectedSubExpertiseICanDoMap[expertiseIndex] = [...this.subExpertiseICanDoOptions];
    } else {
      this.selectedSubExpertiseICanDoMap[expertiseIndex] = [];
    }
  }

  // Add a method to handle adding a new sub-expertise tag
  onAddTagSubExpertise = (name: string) => {
    if (!name.trim()) {
      return null;
    }

    this.addingNewSubExpertise = true;
    const newSubExpertise = name.trim();

    // Show loader
    this.showLoader = true;

    // Call the API to add the new sub-expertise
    this.superadminService.addSubExpertiseByName(newSubExpertise).subscribe({
      next: (response: any) => {
        if (response?.status) {
          // Add to both local options arrays to ensure they are in sync
          if (!this.subExpertiseOptions.includes(newSubExpertise)) {
            this.subExpertiseOptions.push(newSubExpertise);
          }
          if (!this.subExpertiseICanDoOptions.includes(newSubExpertise)) {
            this.subExpertiseICanDoOptions.push(newSubExpertise);
          }
          this.notificationService.showSuccess('Sub-expertise added successfully');
        } else {
          this.notificationService.showError(response?.message || 'Failed to add sub-expertise');
        }
        this.showLoader = false;
        this.addingNewSubExpertise = false;
      },
      error: (error: any) => {
        this.notificationService.showError(error?.message || 'Failed to add sub-expertise');
        this.showLoader = false;
        this.addingNewSubExpertise = false;
      }
    });

    // Return the new sub-expertise so it appears in the dropdown immediately
    return newSubExpertise;
  }

  // Add a method for I Can Do sub-expertise
  onAddTagSubExpertiseICanDo = (name: string) => {
    return this.onAddTagSubExpertise(name); // Reuse the same implementation
  }

  // Add method to handle services selection changes
  onServicesChange() {
    if (this.selectedServices && this.selectedServices.length > 0) {
      this.companyForm.icando = this.selectedServices.map(service => service.name);
    } else {
      this.companyForm.icando = [];
    }
  }
}
