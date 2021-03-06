import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../admin/services/auth.service';
declare var $:any;

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  private router: Router,
  private mS:MainService,
  public aS:AuthService) { }

  requestId:any;
  request:any;

  description:any;

  company:any;


  ngOnInit() {
  	this.route.paramMap.subscribe((r:any)=>{
  		console.log(r.params.id);
  		this.requestId = r.params.id;
  		this.mS.getOffer(this.requestId).subscribe((r:any)=>{
  			this.request = r[0];
  			this.description = r[0].descrizione;
  			this.description = this.description.replace(/&#34;/g, '"');
	        this.description = this.description.replace(/&#60;/g, '<');
	        this.description = this.description.replace(/&lt;/g, '<');
	        this.description = this.description.replace(/&#62;/g, '>');
	        this.description = this.description.replace(/&gt;/g, '>');
	        this.description = this.description.replace(/&amp;/g, '&');
  			console.log(r[0]);
        if (this.aS.isProducer()) {
          this.mS.getRequestDetail(r[0].iddomoff).subscribe((r:any)=>{
            console.log(r);
            this.company = r[0];
          })
        }
  		})
  	})
  }

}
