import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

interface Technology {
  _id: string;
  name: string;
  isSystem: boolean;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  type: string;
  tags: string[];
  isSystem: boolean;
  createdAt: string;
  subExpertise: any[];
  isMandatory: boolean;
}

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 7;
  profileForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';
  currentDate: string = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  certificationTags: string[] = [];

  // Add business types list
  businessTypesList = [
    { name: 'Private Limited Company', value: 'Private Limited Company' },
    { name: 'Public Limited Company', value: 'Public Limited Company' },
    { name: 'Limited Liability Partnership (LLP)', value: 'Limited Liability Partnership (LLP)' },
    { name: 'Partnership Firm', value: 'Partnership Firm' },
    { name: 'Sole Proprietorship', value: 'Sole Proprietorship' },
    { name: 'One Person Company (OPC)', value: 'One Person Company (OPC)' },
    { name: 'Section 8 Company (Non-Profit)', value: 'Section 8 Company (Non-Profit)' },
    { name: 'Hindu Undivided Family (HUF)', value: 'Hindu Undivided Family (HUF)' },
    { name: 'Cooperative Society', value: 'Cooperative Society' },
    { name: 'Trust', value: 'Trust' }
  ];

  // Add new properties for API data
  technologies: Technology[] = [];
  services: any[] = [];
  products: Product[] = [];
  isLoadingTechnologies = false;
  isLoadingServices = false;
  isLoadingProducts = false;
  showProductDropdown = false;

  // Add properties for each dropdown's data
  cloudPlatformsList: any[] = [];
  devOpsList: any[] = [];
  containerizationList: any[] = [];
  isLoadingDropdownData = false;

  // Add properties for step 4 dropdowns
  networkingList: any[] = [];
  securityList: any[] = [];
  monitoringList: any[] = [];
  apiManagementList: any[] = [];
  eventStreamingList: any[] = [];
  isLoadingStep4Data = false;

  // Add new properties for Other options
  readonly OTHER_OPTION = {
    _id: 'other',
    name: 'Other',
    isSystem: true,
    createdAt: new Date().toISOString(),
    value: 'other'  // Added for compatibility with both dropdowns
  };

  // Add property to store cloud platforms data
  isLoadingCloudPlatforms = false;

  // Add properties for step 5 dropdowns
  databasePlatformsList: any[] = [
    { value: 'PostgreSQL', name: 'PostgreSQL' },
    { value: 'MySQL', name: 'MySQL' },
    { value: 'Microsoft SQL Server', name: 'Microsoft SQL Server' },
    { value: 'MongoDB', name: 'MongoDB' },
    { value: 'Redis', name: 'Redis' },
    { value: 'Cassandra', name: 'Cassandra' },
    { value: 'Amazon Aurora', name: 'Amazon Aurora' },
    { value: 'Oracle DB', name: 'Oracle DB' }
  ];

  dataAnalyticsList: any[] = [
    { value: 'Power BI', name: 'Power BI' },
    { value: 'Tableau', name: 'Tableau' },
    { value: 'Looker', name: 'Looker' },
    { value: 'Qlik Sense', name: 'Qlik Sense' },
    { value: 'Apache Superset', name: 'Apache Superset' },
    { value: 'Snowflake', name: 'Snowflake' },
    { value: 'Databricks', name: 'Databricks' },
    { value: 'Google BigQuery', name: 'Google BigQuery' },
    { value: 'Amazon Redshift', name: 'Amazon Redshift' },
    { value: 'dbt', name: 'dbt' },
    { value: 'Apache Airflow', name: 'Apache Airflow' },
    { value: 'Fivetran', name: 'Fivetran' },
    { value: 'Stitch', name: 'Stitch' },
    { value: 'Talend', name: 'Talend' }
  ];

  aiMlPlatformsList: any[] = [
    { value: 'TensorFlow', name: 'TensorFlow' },
    { value: 'PyTorch', name: 'PyTorch' },
    { value: 'Hugging Face', name: 'Hugging Face' },
    { value: 'Azure ML', name: 'Azure ML' },
    { value: 'AWS SageMaker', name: 'AWS SageMaker' },
    { value: 'Google Vertex AI', name: 'Google Vertex AI' },
    { value: 'MLflow', name: 'MLflow' },
    { value: 'DataRobot', name: 'DataRobot' }
  ];

  // Add properties for step 6 dropdowns
  erpSystemsList: any[] = [
    { value: 'SAP', name: 'SAP' },
    { value: 'Oracle ERP Cloud', name: 'Oracle ERP Cloud' },
    { value: 'NetSuite', name: 'NetSuite' },
    { value: 'Microsoft Dynamics 365', name: 'Microsoft Dynamics 365' },
    { value: 'Workday', name: 'Workday' },
    { value: 'Infor', name: 'Infor' }
  ];

  crmPlatformsList: any[] = [
    { value: 'Salesforce', name: 'Salesforce' },
    { value: 'HubSpot', name: 'HubSpot' },
    { value: 'Zoho CRM', name: 'Zoho CRM' },
    { value: 'Microsoft Dynamics CRM', name: 'Microsoft Dynamics CRM' },
    { value: 'Freshsales', name: 'Freshsales' },
    { value: 'Pipedrive', name: 'Pipedrive' }
  ];

  itsmList: any[] = [
    { value: 'ServiceNow', name: 'ServiceNow' },
    { value: 'BMC Remedy', name: 'BMC Remedy' },
    { value: 'Ivanti', name: 'Ivanti' },
    { value: 'ManageEngine', name: 'ManageEngine' },
    { value: 'Jira Service Management', name: 'Jira Service Management' },
    { value: 'Freshservice', name: 'Freshservice' }
  ];

  businessAppsList: any[] = [
    { value: 'ServiceNow', name: 'ServiceNow' },
    { value: 'BMC Remedy', name: 'BMC Remedy' },
    { value: 'Ivanti', name: 'Ivanti' },
    { value: 'ManageEngine', name: 'ManageEngine' },
    { value: 'Jira Service Management', name: 'Jira Service Management' },
    { value: 'Freshservice', name: 'Freshservice' }
  ];

  // Add properties for step 7 dropdowns
  eCommerceCmsList: any[] = [
    { value: 'Shopify', name: 'Shopify' },
    { value: 'Magento', name: 'Magento' },
    { value: 'WooCommerce', name: 'WooCommerce' },
    { value: 'BigCommerce', name: 'BigCommerce' },
    { value: 'WordPress', name: 'WordPress' },
    { value: 'Wix', name: 'Wix' },
    { value: 'Drupal', name: 'Drupal' },
    { value: 'Adobe Experience Manager (AEM)', name: 'Adobe Experience Manager (AEM)' },
    { value: 'Contentful', name: 'Contentful' }
  ];

  learningHrSystemsList: any[] = [
    { value: 'Moodle', name: 'Moodle' },
    { value: 'Canvas LMS', name: 'Canvas LMS' },
    { value: 'Blackboard', name: 'Blackboard' },
    { value: 'TalentLMS', name: 'TalentLMS' },
    { value: 'SAP SuccessFactors', name: 'SAP SuccessFactors' },
    { value: 'Workday HCM', name: 'Workday HCM' },
    { value: 'BambooHR', name: 'BambooHR' }
  ];

  lowCodeNoCodeList: any[] = [
    { value: 'OutSystems', name: 'OutSystems' },
    { value: 'Mendix', name: 'Mendix' },
    { value: 'Microsoft Power Apps', name: 'Microsoft Power Apps' },
    { value: 'Appian', name: 'Appian' },
    { value: 'Airtable', name: 'Airtable' },
    { value: 'Bubble', name: 'Bubble' }
  ];

  testingQaList: any[] = [
    { value: 'Selenium', name: 'Selenium' },
    { value: 'Cypress', name: 'Cypress' },
    { value: 'Playwright', name: 'Playwright' },
    { value: 'TestCafe', name: 'TestCafe' },
    { value: 'Postman', name: 'Postman' },
    { value: 'Insomnia', name: 'Insomnia' },
    { value: 'Hoppscotch', name: 'Hoppscotch' },
    { value: 'Appium', name: 'Appium' },
    { value: 'Espresso', name: 'Espresso' },
    { value: 'XCUITest', name: 'XCUITest' },
    { value: 'Detox', name: 'Detox' },
    { value: 'Kobiton', name: 'Kobiton' },
    { value: 'Apache JMeter', name: 'Apache JMeter' },
    { value: 'k6', name: 'k6' },
    { value: 'Gatling', name: 'Gatling' },
    { value: 'Locust', name: 'Locust' },
    { value: 'BlazeMeter', name: 'BlazeMeter' },
    { value: 'OWASP ZAP', name: 'OWASP ZAP' },
    { value: 'Burp Suite', name: 'Burp Suite' },
    { value: 'Nikto', name: 'Nikto' },
    { value: 'TestRail', name: 'TestRail' },
    { value: 'Xray', name: 'Xray' },
    { value: 'Zephyr', name: 'Zephyr' },
    { value: 'qTest', name: 'qTest' },
    { value: 'Testim.io', name: 'Testim.io' },
    { value: 'mabl', name: 'mabl' },
    { value: 'Functionize', name: 'Functionize' },
    { value: 'Leapwork', name: 'Leapwork' },
    { value: 'Percy', name: 'Percy' },
    { value: 'Applitools', name: 'Applitools' },
    { value: 'Loki', name: 'Loki' }
  ];

  web3DecentralizedList: any[] = [
    { value: 'Ethereum', name: 'Ethereum' },
    { value: 'Polygon', name: 'Polygon' },
    { value: 'Hyperledger Fabric', name: 'Hyperledger Fabric' },
    { value: 'IPFS', name: 'IPFS' },
    { value: 'Filecoin', name: 'Filecoin' }
  ];

  steps = [
    { number: 1, title: 'Profile Setup', completed: false, active: true },
    { number: 2, title: 'Technology Stack & Services', completed: false, active: false },
    { number: 3, title: 'Core Services & Capabilities', completed: false, active: false },
    { number: 4, title: 'Infrastructure, Integration & Security', completed: false, active: false },
    { number: 5, title: 'Data, Intelligence & Automation', completed: false, active: false },
    { number: 6, title: 'Enterprise Systems & Business Apps', completed: false, active: false },
    { number: 7, title: 'Front-End, Composable & Emerging Tech', completed: false, active: false }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private supplierAdminService: SupplierAdminService,
    private router: Router,
    private modalService: NgbModal,
    private http: HttpClient
  ) {
    this.initForm();
  }

  // Add method to load step 4 dropdowns
  async loadStep4Dropdowns() {
    try {
      this.isLoadingStep4Data = true;

      // Load all step 4 data in parallel
      const [
        networkingResponse,
        securityResponse,
        monitoringResponse,
        apiManagementResponse,
        eventStreamingResponse
      ] = await Promise.all([
        this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list', {
          params: { type: 'Networking & Infrastructure' }
        }).toPromise(),
        this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list', {
          params: { type: 'Security & IAM' }
        }).toPromise(),
        this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list', {
          params: { type: 'Monitoring & Observability' }
        }).toPromise(),
        this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list', {
          params: { type: 'Integration & API Management' }
        }).toPromise(),
        this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list', {
          params: { type: 'Event Streaming & Messaging' }
        }).toPromise()
      ]);

      // Update the lists with the response data
      if (networkingResponse.status && networkingResponse.data) {
        this.networkingList = networkingResponse.data;
      }
      if (securityResponse.status && securityResponse.data) {
        this.securityList = securityResponse.data;
      }
      if (monitoringResponse.status && monitoringResponse.data) {
        this.monitoringList = monitoringResponse.data;
      }
      if (apiManagementResponse.status && apiManagementResponse.data) {
        this.apiManagementList = apiManagementResponse.data;
      }
      if (eventStreamingResponse.status && eventStreamingResponse.data) {
        this.eventStreamingList = eventStreamingResponse.data;
      }

      this.isLoadingStep4Data = false;
    } catch (error) {
      console.error('Error loading step 4 dropdowns:', error);
      this.isLoadingStep4Data = false;
    }
  }

  private initForm() {
    this.profileForm = this.formBuilder.group({
      // Step 1 fields - Only Company Name and POC Details are mandatory
      companyName: ['', Validators.required],
      website: [''],
      companyAddress: [''],
      country: [''],
      email: [''],
      companyContactNumber: [''],
      yearOfEstablishment: [''],
      executiveSummary: [''],
      pocDetails: this.formBuilder.array([this.createPocDetailFormGroup()]),
      typeOfCompany: [[]],
      employeeCount: [''],
      turnover: [''],
      totalProjectsExecuted: [''],
      certifications: [[]],
      resourceSharingSupplier: [false],
      subcontractingSupplier: [false],
      certificationInput: [''],

      // Step 2 fields - All non-mandatory
      services: [[]],
      servicesOther: [{value: '', disabled: true}],
      technologyStack: [[]],
      technologyStackOther: [{value: '', disabled: true}],
      product: [[]],

      // Step 3 fields - All non-mandatory
      cloudPlatforms: [['OVHcloud', 'NTT-Netmagic']],
      cloudPlatformsOther: [{value: '', disabled: true}],
      devOpsAutomation: [[]],
      devOpsAutomationOther: [{value: '', disabled: true}],
      containerizationOrchestration: [[]],
      containerizationOrchestrationOther: [{value: '', disabled: true}],

      // Step 4 fields - All non-mandatory
      networkingInfrastructure: [[]],
      networkingInfrastructureOther: [{value: '', disabled: true}],
      securityIAM: [[]],
      securityIAMOther: [{value: '', disabled: true}],
      monitoringObservability: [[]],
      monitoringObservabilityOther: [{value: '', disabled: true}],
      integrationAPIManagement: [[]],
      integrationAPIManagementOther: [{value: '', disabled: true}],
      eventStreamingMessaging: [[]],
      eventStreamingMessagingOther: [{value: '', disabled: true}],

      // Step 5 fields - All non-mandatory
      databasePlatforms: [[]],
      databasePlatformsOther: [{value: '', disabled: true}],
      dataAnalyticsBI: [[]],
      dataAnalyticsBIOther: [{value: '', disabled: true}],
      aiMLPlatforms: [[]],
      aiMLPlatformsOther: [{value: '', disabled: true}],

      // Step 6 fields - All non-mandatory
      erpEnterpriseSystems: [[]],
      erpEnterpriseSystemsOther: [{value: '', disabled: true}],
      crmCustomerPlatforms: [[]],
      crmCustomerPlatformsOther: [{value: '', disabled: true}],
      itsmITOperations: [[]],
      itsmITOperationsOther: [{value: '', disabled: true}],
      businessAppsProductivity: [[]],
      businessAppsProductivityOther: [{value: '', disabled: true}],

      // Step 7 fields - All non-mandatory
      eCommerceCMS: [[]],
      eCommerceCMSOther: [{value: '', disabled: true}],
      learningHRSystems: [[]],
      learningHRSystemsOther: [{value: '', disabled: true}],
      lowCodeNoCodePlatforms: [[]],
      lowCodeNoCodePlatformsOther: [{value: '', disabled: true}],
      testingQA: [[]],
      testingQAOther: [{value: '', disabled: true}],
      web3DecentralizedTech: [[]],
      web3DecentralizedTechOther: [{value: '', disabled: true}]
    });
  }

  private createPocDetailFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  private saveFormData() {
    localStorage.setItem('profileSetupFormData', JSON.stringify(this.profileForm.value));
    localStorage.setItem('profileSetupCurrentStep', this.currentStep.toString());
  }

  ngOnInit(): void {
    this.initForm();
    this.loadTechnologies();
    this.loadServices();
    this.loadProducts();
    this.loadCloudPlatforms();
    this.loadStep3Dropdowns();
    this.loadStep4Dropdowns();

    // Set initial values for all dropdowns
    this.setInitialDropdownValues();

    // Setup subscriptions for "Other" field management
    this.setupOtherFieldSubscriptions();

    // Subscribe to technology stack changes
    this.profileForm.get('technologyStack')?.valueChanges.subscribe(selectedTech => {
      const hasOther = selectedTech?.includes('Other');
      const otherInput = this.profileForm.get('technologyStackOther');

      if (!hasOther) {
        otherInput?.disable();
        otherInput?.setValue('');
        otherInput?.clearValidators();
        otherInput?.markAsUntouched();
      } else {
        otherInput?.enable();
        otherInput?.setValidators([Validators.required]);
        otherInput?.markAsTouched();
      }
      otherInput?.updateValueAndValidity();
    });

    // Subscribe to services changes
    this.profileForm.get('services')?.valueChanges.subscribe(selectedServices => {
      // Handle Pre-Built Software Solutions
      const hasPreBuiltSolutions = selectedServices?.includes('Pre-Built Software Solutions');

      if (hasPreBuiltSolutions && !this.showProductDropdown) {
        this.showProductDropdown = true;
        this.loadProducts();
        // Make products required when Pre-Built Software Solutions is selected
        this.profileForm.get('product')?.setValidators([Validators.required]);
        this.profileForm.get('product')?.updateValueAndValidity();
      } else if (!hasPreBuiltSolutions && this.showProductDropdown) {
        this.showProductDropdown = false;
        this.profileForm.get('product')?.clearValidators();
        this.profileForm.get('product')?.updateValueAndValidity();
        this.profileForm.get('product')?.setValue([]);
      }

      // Handle "Other" option for services
      const hasOther = selectedServices?.includes('Other');
      const otherInput = this.profileForm.get('servicesOther');
      if (!hasOther) {
        otherInput?.disable();
        otherInput?.setValue('');
        otherInput?.clearValidators();
        otherInput?.markAsUntouched();
      } else {
        otherInput?.enable();
        otherInput?.setValidators([Validators.required]);
        otherInput?.markAsTouched();
      }
      otherInput?.updateValueAndValidity();
    });

    // Subscribe to step changes
    this.profileForm.valueChanges.subscribe(() => {
      // Load data when reaching step 3
      if (this.currentStep === 3) {
        this.loadStep3Dropdowns();
      }
      // Load step 4 data when reaching step 4
      if (this.currentStep === 4) {
        this.loadStep4Dropdowns();
      }
    });
  }

  private setInitialDropdownValues() {
    const initialValues = {
      cloudPlatforms: ['OVHcloud', 'NTT-Netmagic'],
      devOpsAutomation: [],
      containerizationOrchestration: [],
      networkingInfrastructure: [],
      securityIAM: [],
      monitoringObservability: [],
      integrationAPIManagement: [],
      eventStreamingMessaging: [],
      databasePlatforms: [],
      dataAnalyticsBI: [],
      aiMLPlatforms: [],
      erpEnterpriseSystems: [],
      crmCustomerPlatforms: [],
      itsmITOperations: [],
      businessAppsProductivity: [],
      eCommerceCMS: [],
      learningHRSystems: [],
      lowCodeNoCodePlatforms: [],
      testingQA: [],
      web3DecentralizedTech: [],
      product: [],
      certifications: []
    };

    // Set each value in the form
    Object.entries(initialValues).forEach(([key, value]) => {
      const control = this.profileForm.get(key);
      if (control) {
        control.setValue(value);
      }
    });
  }

  // Add methods to load data from APIs
  loadTechnologies() {
    this.isLoadingTechnologies = true;
    this.supplierAdminService.getTechnologies().subscribe({
      next: (response) => {
        // Add Other option to technologies
        this.technologies = [...response.data, this.OTHER_OPTION];
        this.isLoadingTechnologies = false;
      },
      error: (error) => {
        console.error('Error loading technologies:', error);
        this.isLoadingTechnologies = false;
      }
    });
  }

  loadServices() {
    this.isLoadingServices = true;
    this.http.get<any>('https://api.westgateithub.com/api/v1/tags?search=')
      .subscribe({
        next: (response) => {
          if (response.status && response.data?.tags) {
            // Add Other option to services
            this.services = [...response.data.tags, this.OTHER_OPTION];
          }
          this.isLoadingServices = false;
        },
        error: (error) => {
          console.error('Error loading services:', error);
          this.isLoadingServices = false;
        }
      });
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  loadProducts() {
    this.isLoadingProducts = true;
    this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list?type=Product')
      .subscribe({
        next: (response) => {
          if (response.status && response.data) {
            this.products = response.data;
          }
          this.isLoadingProducts = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isLoadingProducts = false;
        }
      });
  }

  // Add method to load dropdown data by type
  loadDropdownData(type: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.isLoadingDropdownData = true;
      this.http.get<any>(`https://api.westgateithub.com/api/v1/web-user/drop-down-list?type=${type}`)
        .subscribe({
          next: (response) => {
            this.isLoadingDropdownData = false;
            if (response.status && response.data) {
              resolve(response.data);
            } else {
              resolve([]);
            }
          },
          error: (error) => {
            console.error(`Error loading ${type} data:`, error);
            this.isLoadingDropdownData = false;
            reject(error);
          }
        });
    });
  }

  // Method to load all dropdowns for step 3
  async loadStep3Dropdowns() {
    try {
      // Load DevOps & Automation data
      this.isLoadingDropdownData = true;
      const devOpsResponse = await this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list', {
        params: { type: 'DevOps & Automation' }
      }).toPromise();

      if (devOpsResponse.status && devOpsResponse.data) {
        this.devOpsList = devOpsResponse.data;
      }

      // Load Containerization & Orchestration data
      const containerizationResponse = await this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list', {
        params: { type: 'Containerization & Orchestration' }
      }).toPromise();

      if (containerizationResponse.status && containerizationResponse.data) {
        this.containerizationList = containerizationResponse.data;
      }

      this.isLoadingDropdownData = false;
    } catch (error) {
      console.error('Error loading step 3 dropdowns:', error);
      this.isLoadingDropdownData = false;
    }
  }

  // Add method to load cloud platforms
  loadCloudPlatforms() {
    this.isLoadingCloudPlatforms = true;
    this.http.get<any>('https://api.westgateithub.com/api/v1/web-user/drop-down-list', {
      params: { type: 'Cloud Platforms' }
    }).subscribe({
      next: (response) => {
        console.log('Cloud Platforms response:', response);
        if (response.status && response.data) {
          this.cloudPlatformsList = response.data;
        }
        this.isLoadingCloudPlatforms = false;
      },
      error: (error) => {
        console.error('Error loading cloud platforms:', error);
        this.isLoadingCloudPlatforms = false;
      }
    });
  }

  // Update existing nextStep method to load cloud platforms data
  nextStep() {
    console.log('Next Step clicked - Current step:', this.currentStep);
    this.submitted = true;

    // Check if current step form is valid
    const isValid = this.isCurrentStepValid();
    console.log('Current step validation result:', isValid);

    if (isValid) {
      if (this.currentStep < this.totalSteps) {
        this.steps[this.currentStep - 1].completed = true;
        this.steps[this.currentStep - 1].active = false;
        this.currentStep++;
        this.steps[this.currentStep - 1].active = true;
        this.submitted = false;

        // Load cloud platforms data when reaching step 3
        if (this.currentStep === 3) {
          this.loadCloudPlatforms();
        }
        // Load step 4 data when reaching step 4
        if (this.currentStep === 4) {
          this.loadStep4Dropdowns();
        }

        this.saveFormData(); // Save after step change
        console.log('Moving to step:', this.currentStep);
      }
    } else {
      console.log('Form validation failed. Current form values:', this.profileForm.value);
      console.log('Form validation errors:', this.getFormValidationErrors());
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.steps[this.currentStep - 1].active = false;
      this.currentStep--;
      this.steps[this.currentStep - 1].active = true;
      this.submitted = false;
      this.saveFormData(); // Save after step change
    }
  }

  // ... rest of the component code ...

    isCurrentStepValid(): boolean {
    console.log('Checking validation for step:', this.currentStep);
    console.log('Form valid state:', this.profileForm.valid);
    console.log('Loading state:', this.loading);

    // Only validate mandatory fields: Company Name, POC Details, and at least one supplier type
    if (this.currentStep === 1) {
      const companyNameValid = this.profileForm.get('companyName')?.valid ?? false;
      const pocDetailsValid = this.validatePocDetails();
      const supplierTypeValid = this.validateSupplierType();

      console.log('Step 1 validation:', {
        companyNameValid,
        pocDetailsValid,
        supplierTypeValid
      });

      return companyNameValid && pocDetailsValid && supplierTypeValid;
    }

    // For all other steps, no validation required
    return true;
  }

  private validatePocDetails(): boolean {
    const pocDetailsArray = this.profileForm.get('pocDetails') as FormArray;
    if (pocDetailsArray.length === 0) {
      return false;
    }

    // Check if at least one POC detail is valid
    for (let i = 0; i < pocDetailsArray.length; i++) {
      const pocGroup = pocDetailsArray.at(i) as FormGroup;
      if (pocGroup.get('name')?.valid &&
          pocGroup.get('phone')?.valid &&
          pocGroup.get('email')?.valid &&
          pocGroup.get('role')?.valid) {
        return true;
      }
    }
    return false;
  }

    validateSupplierType(): boolean {
    const resourceSharing = this.profileForm.get('resourceSharingSupplier')?.value;
    const subcontracting = this.profileForm.get('subcontractingSupplier')?.value;

    // At least one of the supplier types must be selected
    return resourceSharing || subcontracting;
  }

  getProgressPercentage(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  onSubmit() {
    // Log button state first
    this.logButtonState();

    console.log('Submit button clicked');
    console.log('Form valid:', this.profileForm.valid);
    console.log('Current step valid:', this.isCurrentStepValid());
    console.log('Loading state:', this.loading);
    console.log('Current step:', this.currentStep);
    console.log('Total steps:', this.totalSteps);
    console.log('Form values:', this.profileForm.value);
    console.log('Form errors:', this.getFormValidationErrors());

    this.submitted = true;

    // Check both step validation and form validation
    if (this.profileForm.valid && this.isCurrentStepValid()) {
      this.loading = true;

      // Get the form values (including disabled controls)
      const formData = { ...this.profileForm.getRawValue() };

      // Create the registration data structure
      const registrationData = {
        ...formData,
        services: this.combineMainAndOther(formData.services, formData.servicesOther),
        product: formData.product || [],

        // Core services fields
        cloudPlatforms: this.combineMainAndOther(formData.cloudPlatforms, formData.cloudPlatformsOther),
        devOpsAutomation: this.combineMainAndOther(formData.devOpsAutomation, formData.devOpsAutomationOther),
        containerizationOrchestration: this.combineMainAndOther(formData.containerizationOrchestration, formData.containerizationOrchestrationOther),

        // Infrastructure fields
        networkingInfrastructure: this.combineMainAndOther(formData.networkingInfrastructure, formData.networkingInfrastructureOther),
        securityIAM: this.combineMainAndOther(formData.securityIAM, formData.securityIAMOther),
        monitoringObservability: this.combineMainAndOther(formData.monitoringObservability, formData.monitoringObservabilityOther),
        integrationAPIManagement: this.combineMainAndOther(formData.integrationAPIManagement, formData.integrationAPIManagementOther),
        eventStreamingMessaging: this.combineMainAndOther(formData.eventStreamingMessaging, formData.eventStreamingMessagingOther),

        // Data and intelligence fields
        databasePlatforms: this.combineMainAndOther(formData.databasePlatforms, formData.databasePlatformsOther),
        dataAnalyticsBI: this.combineMainAndOther(formData.dataAnalyticsBI, formData.dataAnalyticsBIOther),
        aiMLPlatforms: this.combineMainAndOther(formData.aiMLPlatforms, formData.aiMLPlatformsOther),

        // Enterprise systems fields
        erpEnterpriseSystems: this.combineMainAndOther(formData.erpEnterpriseSystems, formData.erpEnterpriseSystemsOther),
        crmCustomerPlatforms: this.combineMainAndOther(formData.crmCustomerPlatforms, formData.crmCustomerPlatformsOther),
        itsmITOperations: this.combineMainAndOther(formData.itsmITOperations, formData.itsmITOperationsOther),
        businessAppsProductivity: this.combineMainAndOther(formData.businessAppsProductivity, formData.businessAppsProductivityOther),

        // Front-end and emerging tech fields
        eCommerceCMS: this.combineMainAndOther(formData.eCommerceCMS, formData.eCommerceCMSOther),
        learningHRSystems: this.combineMainAndOther(formData.learningHRSystems, formData.learningHRSystemsOther),
        lowCodeNoCodePlatforms: this.combineMainAndOther(formData.lowCodeNoCodePlatforms, formData.lowCodeNoCodePlatformsOther),
        testingQA: this.combineMainAndOther(formData.testingQA, formData.testingQAOther),
        web3DecentralizedTech: this.combineMainAndOther(formData.web3DecentralizedTech, formData.web3DecentralizedTechOther),

        // Basic fields
        companyName: formData.companyName,
        website: formData.website,
        companyAddress: formData.companyAddress,
        country: formData.country,
        email: formData.email,
        companyContactNumber: formData.companyContactNumber,
        yearOfEstablishment: formData.yearOfEstablishment,
        executiveSummary: formData.executiveSummary,
        pocDetails: formData.pocDetails,
        employeeCount: Number(formData.employeeCount),
        turnover: Number(formData.turnover),
        totalProjectsExecuted: Number(formData.totalProjectsExecuted),
        certifications: this.certificationTags,
        resourceSharingSupplier: formData.resourceSharingSupplier,
        subcontractingSupplier: formData.subcontractingSupplier,
        typeOfCompany: formData.typeOfCompany,
        technologyStack: this.combineMainAndOther(formData.technologyStack, formData.technologyStackOther)
      };

      // Call the API to save the data
      this.supplierAdminService.submitProfileSetup(registrationData).subscribe(
        (response: any) => {
          this.loading = false;
          this.successMessage = 'Registration completed successfully!';
          // Clear form data from localStorage
          localStorage.removeItem('profileSetupFormData');
          localStorage.removeItem('profileSetupCurrentStep');
        },
        (error: Error) => {
          this.loading = false;
          this.errorMessage = 'An error occurred while registering. Please try again.';
          console.error('Error during registration:', error);
        }
      );
    } else {
      console.log('Form validation failed');
      console.log('Form validation errors:', this.getFormValidationErrors());
      console.log('Step validation result:', this.isCurrentStepValid());
    }
  }

  // Helper method to combine main field values with other field value
  private combineMainAndOther(mainValues: string[], otherValue: string): string[] {
    if (!mainValues) mainValues = [];
    if (otherValue && otherValue.trim()) {
      return [...mainValues, otherValue.trim()];
    }
    return mainValues;
  }

  // Update the setupOtherFieldSubscriptions method to handle all fields
  private setupOtherFieldSubscriptions() {
    const fieldsWithOther = {
      cloudPlatforms: 'cloudPlatformsOther',
      devOpsAutomation: 'devOpsAutomationOther',
      containerizationOrchestration: 'containerizationOrchestrationOther',
      networkingInfrastructure: 'networkingInfrastructureOther',
      securityIAM: 'securityIAMOther',
      monitoringObservability: 'monitoringObservabilityOther',
      integrationAPIManagement: 'integrationAPIManagementOther',
      eventStreamingMessaging: 'eventStreamingMessagingOther',
      databasePlatforms: 'databasePlatformsOther',
      dataAnalyticsBI: 'dataAnalyticsBIOther',
      aiMLPlatforms: 'aiMLPlatformsOther',
      erpEnterpriseSystems: 'erpEnterpriseSystemsOther',
      crmCustomerPlatforms: 'crmCustomerPlatformsOther',
      itsmITOperations: 'itsmITOperationsOther',
      businessAppsProductivity: 'businessAppsProductivityOther',
      eCommerceCMS: 'eCommerceCMSOther',
      learningHRSystems: 'learningHRSystemsOther',
      lowCodeNoCodePlatforms: 'lowCodeNoCodePlatformsOther',
      testingQA: 'testingQAOther',
      web3DecentralizedTech: 'web3DecentralizedTechOther'
    };

    Object.entries(fieldsWithOther).forEach(([mainField, otherField]) => {
      const control = this.profileForm.get(mainField);
      const otherControl = this.profileForm.get(otherField);

      if (control && otherControl) {
        // Initially disable the "Other" field
        otherControl.disable();
        otherControl.setValue('');

        // Subscribe to main field changes
        control.valueChanges.subscribe(values => {
          if (values?.includes('other')) {
            otherControl.enable();
            otherControl.setValidators([Validators.required]);
            otherControl.markAsTouched(); // Mark as touched to show validation immediately
          } else {
            otherControl.disable();
            otherControl.setValue('');
            otherControl.clearValidators();
            otherControl.markAsUntouched();
          }
          otherControl.updateValueAndValidity();
        });
      }
    });
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched || this.submitted)) : false;
  }

  // Add POC details methods
  addPocDetail() {
    const pocFormGroup = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: ['', [Validators.email]],
      role: ['']
    });

    const pocDetails = this.profileForm.get('pocDetails') as FormArray;
    pocDetails.push(pocFormGroup);
  }

  removePocDetail(index: number) {
    const pocDetails = this.profileForm.get('pocDetails') as FormArray;
    if (pocDetails.length > 1) { // Keep at least one POC
      pocDetails.removeAt(index);
    }
  }

  getPocDetails() {
    return (this.profileForm.get('pocDetails') as FormArray)?.controls || [];
  }

  addTag(event: any) {
    const input = event.target;
    const value = input.value.trim();
    if (value) {
      this.certificationTags.push(value);
      input.value = '';
    }
  }

  removeTag(index: number) {
    this.certificationTags.splice(index, 1);
  }

  // Add helper method to get form validation errors
  getFormValidationErrors() {
    const errors: any = {};
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  logButtonState() {
    console.log('Button clicked');
    console.log('Disabled state:', this.loading || !this.isCurrentStepValid());
    console.log('Loading:', this.loading);
    console.log('Step valid:', this.isCurrentStepValid());
    console.log('Current step:', this.currentStep);
    console.log('Total steps:', this.totalSteps);
  }
}
