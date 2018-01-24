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
  public prViewModel: any;
  public prViewModelArray: any;
  public viewModelArray: any;
  public taskViewModel: any;
  public taskModelArray: any;

  constructor(private http: HttpClient) {

    this.viewModel = {};
    this.prViewModel = {};
    this.taskViewModel = {};

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', 'Basic eGlhby5zaGVuQGNhcGNvLmNvbTpXZWxjb21lMg==')
      .set('Access-Control-Allow-Origin', 'true');

    const filterURL= "project = \"Secure Site: Responsive web\" AND type = Bug AND status not in (Closed, Deferred, Fixed, duplicate, \"Ready to Retest\", Monitor, Reject, Canceled, Cancelled, Rejected) AND assignee in (Xiao.Shen, julien.truchot, Ricardo.Razo, riju.vashisht, Rodrigo.Paixao, Zheng.Fang, donny.ng, yulisa.chang, Sreekumar.Rajan, lucas.alba) OR project = PCFQA AND type = Bug AND \"PCF Stream\" = \"Secure Site: Responsive web\" AND status not in (Closed, Deferred, Fixed, duplicate, \"Ready to Retest\", Monitor, Reject, Canceled, Cancelled, Rejected) AND assignee in (Xiao.Shen, julien.truchot, Ricardo.Razo, riju.vashisht, Rodrigo.Paixao, Zheng.Fang, donny.ng, yulisa.chang, Sreekumar.Rajan, lucas.alba) ORDER BY status DESC","viewUrl":"https://capco-cardinal.atlassian.net/issues/?filter=18342","searchUrl":"https://capco-cardinal.atlassian.net/rest/api/2/search?jql=project+%3D+%22Secure+Site:+Responsive+web%22+AND+type+%3D+Bug+AND+status+not+in+(Closed,+Deferred,+Fixed,+duplicate,+%22Ready+to+Retest%22,+Monitor,+Reject,+Canceled,+Cancelled,+Rejected)+AND+assignee+in+(Xiao.Shen,+julien.truchot,+Ricardo.Razo,+riju.vashisht,+Rodrigo.Paixao,+Zheng.Fang,+donny.ng,+yulisa.chang,+Sreekumar.Rajan,+lucas.alba)+OR+project+%3D+PCFQA+AND+type+%3D+Bug+AND+%22PCF+Stream%22+%3D+%22Secure+Site:+Responsive+web%22+AND+status+not+in+(Closed,+Deferred,+Fixed,+duplicate,+%22Ready+to+Retest%22,+Monitor,+Reject,+Canceled,+Cancelled,+Rejected)+AND+assignee+in+(Xiao.Shen,+julien.truchot,+Ricardo.Razo,+riju.vashisht,+Rodrigo.Paixao,+Zheng.Fang,+donny.ng,+yulisa.chang,+Sreekumar.Rajan,+lucas.alba)+ORDER+BY+status+DESC";
    this.http.get("/api/rest/api/2/search?jql=" + filterURL,     {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic eGlhby5zaGVuQGNhcGNvLmNvbTpXZWxjb21lMg==',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': 'true',
          // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
          // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        }
      })
      .subscribe(data => {
        console.log(data);
        if (!!data && !!data['issues']) {
          for (let i = 0; i < data['issues'].length; i++) {
            var issueData = data['issues'][i];
            var issueKey = issueData.key;
            var assignee = issueData.fields.assignee.name;
            var epicNum = issueData.fields.customfield_10005;
            var severity = issueData.fields.customfield_10900.value;
            var description = issueData.fields.description;
            var summary = issueData.fields.summary;
            var status = issueData.fields.status.name;

            // console.log(data.issues[i].fields.assignee.name);
            if (status.trim() !== "Under Code Review") {
              if (this.viewModel.hasOwnProperty(assignee)) {
                //  already has such assignee in model
                // this.viewModel[assignee]['issueCountNoPR']++;
                this.viewModel[assignee]['issueCount']++;
                this.viewModel[assignee]['issues'].push({key: issueKey, summary: summary, description: description});
              }   else {
                this.viewModel[assignee] = {};
                // if (status.trim() !== "Under Code Review") {
                // this.viewModel[assignee]['issueCountNoPR'] = 1;
                this.viewModel[assignee]['issueCount'] = 1;
                this.viewModel[assignee]['issues'] = [{key: issueKey, summary: summary, description: description}];
                // }
              }
            }

          }
          this.viewModelArray = Object.keys(this.viewModel);
        }

        // console.log(this.viewModel);
      });


    this.http.get("https://bitbucket.org/!api/2.0/repositories/capco-cardinal/cardinal-web-app/pullrequests",
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic eGlhby5zaGVuQGNhcGNvLmNvbTpXZWxjb21lMg==',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': 'true',
          // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
          // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        }
      })
      .subscribe(data => {
        if (!!data && !!data['values']) {
          // console.log(data['values']);
          for (let i = 0; i < data['values'].length; i++) {
            let issueData = data['values'][i];
            let title = issueData['title'];
            let author = issueData['author']['display_name'];
            let id = issueData['id'];

            if (this.prViewModel.hasOwnProperty(author)) {
              //  already has such assignee in model
              this.prViewModel[author]['prCount']++;
              this.prViewModel[author]['prList'].push({title: title, id: id});

            } else {
              this.prViewModel[author] = {};
              this.prViewModel[author]['prCount'] = 1;
              this.prViewModel[author]['prList'] = [{title: title, id: id}];
            }
            this.prViewModelArray = Object.keys(this.prViewModel);

          }


        }
      });

    let taskURL = "project = \"Secure Site: Responsive web\" AND type = \"SSITE Web \" AND status not in (Done, \"Ready for CAPCO QA\", \"Out of Scope (Issue)\")";
    this.http.get("/api/rest/api/2/search?jql=" + taskURL,     {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic eGlhby5zaGVuQGNhcGNvLmNvbTpXZWxjb21lMg==',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      }
    })
      .subscribe(data => {
        console.log(data);
        if (!!data && !!data['issues']) {
          for (let i = 0; i < data['issues'].length; i++) {
            var issueData = data['issues'][i];
            var issueKey = issueData.key;
            var assignee = issueData.fields.assignee.name;
            var epicNum = issueData.fields.customfield_10005;
            // var description = issueData.fields.description;
            var summary = issueData.fields.summary;
            var status = issueData.fields.status.name;

            // console.log(data.issues[i].fields.assignee.name);
            if (status.trim() !== "Under Code Review") {
              if (this.taskViewModel.hasOwnProperty(assignee)) {
                //  already has such assignee in model
                // this.viewModel[assignee]['issueCountNoPR']++;
                this.taskViewModel[assignee]['issueCount']++;
                this.taskViewModel[assignee]['issues'].push({key: issueKey, summary: summary});
              }   else {
                this.taskViewModel[assignee] = {};
                // if (status.trim() !== "Under Code Review") {
                // this.viewModel[assignee]['issueCountNoPR'] = 1;
                this.taskViewModel[assignee]['issueCount'] = 1;
                this.taskViewModel[assignee]['issues'] = [{key: issueKey, summary: summary}];
                // }
              }
            }

          }
          this.taskModelArray = Object.keys(this.taskViewModel);
        }
      });







  }


  showAnswer() {
    this.showSpinner = true;

    setTimeout(() => {
      this.answerDisplay = this.answer;
      this.showSpinner = false;
    }, 2000);
  }
}
