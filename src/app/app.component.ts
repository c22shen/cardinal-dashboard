import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  answer: string = '';
  answerDisplay: string = '';
  showSpinner: boolean = false;
  public viewModel: any;
  public viewModelArray: any;

  constructor(private http: HttpClient) {

    this.viewModel = {};

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', 'Basic eGlhby5zaGVuQGNhcGNvLmNvbTpXZWxjb21lMg==')
      .set('Access-Control-Allow-Origin', 'true');


    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic eGlhby5zaGVuQGNhcGNvLmNvbTpXZWxjb21lMg==', 'Access-Control-Allow-Origin' : 'true' })
    // };

    this.http.get("https://capco-cardinal.atlassian.net/rest/api/2/search?jql=project+%3D+PCFQA+AND+%22Vendor+List%22+%3D+Capco+AND+%22PCF+Stream%22+%3D+%22Secure+Site:+Responsive+web%22+AND+status+not+in+(%22Ready+to+Retest%22,+Closed,+%22Capco+QA%22,+Cancelled,+Canceled,+Rejected,+Deferred,+%22Need+More+Info%22,+Duplicate,+draft,+Monitor,+Fixed)+AND+priority+in+(%221-+Urgent%22,+%222-+High%22,+%223-+Medium%22)+AND+assignee+in+(riju.vashisht,+Ricardo.Razo,+Rodrigo.Paixao,+julien.truchot,+Sreekumar.Rajan,+lucas.alba,+Xiao.Shen,+zeyu.dang,+yulisa.chang,+donny.ng,+Zheng.Fang,+Dae.Hee.Jeon)+OR+project+%3D+SSITE+AND+type+%3D+Bug+AND+assignee+in+(riju.vashisht,+Ricardo.Razo,+Rodrigo.Paixao,+julien.truchot,+Sreekumar.Rajan,+lucas.alba,+Xiao.Shen,+zeyu.dang,+yulisa.chang,+donny.ng,+Zheng.Fang,+Dae.Hee.Jeon)+AND+status+not+in+(%22Ready+to+Retest%22,+Closed,+%22Capco+QA%22,+Cancelled,+Canceled,+Rejected,+Deferred,+%22Need+More+Info%22,+Duplicate,+draft,+Monitor,+Fixed)+AND+Severity+in+(%221+-+Critical%22,+%222+-+Major%22,+%223+-+Minor%22)",
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic eGlhby5zaGVuQGNhcGNvLmNvbTpXZWxjb21lMg==',
          'Access-Control-Allow-Origin': 'true'
        }
      })
      .subscribe(data => {
        if (!!data && !!data.issues) {
          // console.log(data.issues);
          for (let i=0; i< data.issues.length; i++){
            var issueData = data.issues[i];
            var issueKey = issueData.key;
            var assignee = issueData.fields.assignee.name;
            var epicNum = issueData.fields.customfield_10005;
            var severity = issueData.fields.customfield_10900.value;
            var description = issueData.fields.description;
            var summary = issueData.fields.summary;
            // console.log(data.issues[i].fields.assignee.name);
            if (this.viewModel.hasOwnProperty(assignee)) {
            //  already has such assignee in model
              this.viewModel[assignee]['issueCount']++;
              this.viewModel[assignee]['issues'].push({key: issueKey, summary: summary, description: description });

            } else {
              this.viewModel[assignee] = {};
              this.viewModel[assignee]['issueCount'] = 1;
              this.viewModel[assignee]['issues'] = [{key: issueKey, summary: summary, description: description }];
            }

          }
          this.viewModelArray = Object.keys(this.viewModel);
        }

        console.log(this.viewModel);
      });


  }


  getKeyArray() {

  }

  showAnswer() {
    this.showSpinner = true;

    setTimeout(() => {
      this.answerDisplay = this.answer;
      this.showSpinner = false;
    }, 2000);
  }
}
