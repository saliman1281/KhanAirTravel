import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from './services/commonservice/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'khanairservice';

  constructor(private comnService: CommonService) { }
  
  ngOnInit() {
    this.comnService.CreateDBBackUp().subscribe(res=>{
      // statment
    });
  }
  ngOnDestroy(): void {
    this.comnService.CreateDBBackUp().subscribe(res=>{
      // statment
    });
  }

}
