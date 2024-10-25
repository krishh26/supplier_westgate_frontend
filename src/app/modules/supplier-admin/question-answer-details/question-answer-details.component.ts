import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-answer-details',
  templateUrl: './question-answer-details.component.html',
  styleUrls: ['./question-answer-details.component.scss']
})
export class QuestionAnswerDetailsComponent implements OnInit {
  questionDetails! : any;

  ngOnInit(): void {
    const details = localStorage.getItem('QuestionAnswerDetails');
    if(details) {
      this.questionDetails = JSON.parse(details);
    }
  }
}
