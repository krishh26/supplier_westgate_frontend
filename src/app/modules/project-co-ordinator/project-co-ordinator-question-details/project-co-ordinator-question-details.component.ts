import { Component } from '@angular/core';

@Component({
  selector: 'app-project-co-ordinator-question-details',
  templateUrl: './project-co-ordinator-question-details.component.html',
  styleUrls: ['./project-co-ordinator-question-details.component.scss']
})
export class ProjectCoOrdinatorQuestionDetailsComponent {
  questionDetails: any = [];

  constructor(){
    const details = localStorage.getItem('ViewQuestionForCoordinator');
    if(details) {
      this.questionDetails = JSON.parse(details);
    }
  }
}
