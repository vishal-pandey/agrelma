import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router }      from '@angular/router';
import { AuthService } from '../../admin/services/auth.service';

import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public aS:AuthService, public router: Router, public cokkie:CookieService) { }

  ngOnInit() {
  }

  query:any = "";
  type:any = 0;
  category:any = "0";


  // categories = ["Cereals","Cheese","Citrus","Coffee","Convenience food/ready meals","Crostacea and Mollusca","Cured Pork","Delicatessen","Drinks","Fish and Seafood","Frozen products","Fruits","Liquors","Meat","Oil","Oil Seeds","Olives","Packed Fisheries","Packed Fruit and Vegetables","Pasta","Preserves","Quality Wine","Sweets and dough products","Table Wine","Vegetables","Vinegar"];
  categories = [
		{
			id:'1',
			name: 'Fruits'
		},
		{
			id:'2',
			name: 'Fish and Seafood'
		},
		{
			id:'3',
			name: 'Cereals'
		},
		{
			id:'4',
			name: 'Quality Wine'
		},
		{
			id:'6',
			name: 'Cheese'
		},
		{
			id:'7',
			name: 'Vegetables'
		},
		{
			id:'8',
			name: 'Citrus'
		},
		{
			id:'9',
			name: 'Table Wine'
		},
		{
			id:'10',
			name:'Crostacea and Mollusca'
		},
		{
			id:'11',
			name:'Drinks'
		},
		{
			id:'12',
			name:'Oil'
		},
		{
			id:'15',
			name:'Meat'
		},
		{
			id:'18',
			name:'Olives'
		},
		{
			id:'19',
			name:'Delicatessen'
		},
		{
			id:'20',
			name:'Packed Fruit and Vegetables'
		},
		{
			id:'21',
			name:'Packed Fisheries'
		},
		{
			id:'22',
			name:'Oil Seeds'
		},
		{
			id:'23',
			name:'Liquors'
		},
		{
			id:'24',
			name:'Cured Pork'
		},
		{
			id:'26',
			name:'Preserves'
		},
		{
			id:'27',
			name:'Pasta'
		},
		{
			id:'28',
			name:'Sweets and dough products'
		},
		{
			id:'29',
			name:'Coffee'
		},
		{
			id:'30',
			name:'Convenience food/ready meals'
		},
		{
			id:'31',
			name:'Vinegar'
		},
		{
			id:'32',
			name:'Frozen products'
		}
	]

  sectors = [
		{
			"id": "1",
			"name": "WINES AND LIQUORS",
			"sub": ["Quality Wine", "Table Wine", "Liquors"]
		},
		{
			"id": "2",
			"name": "OIL AND OLIVES",
			"sub": ["Oil", "Olives", "Oil Seeds"]
		},
		{
			"id": "16",
			"name": "FISH AND SEAFOOD",
			"sub": ["Fish and Seafood", "Crostacea and Mollusca", "Packed Fisheries"]
		},
		{
			"id": "3",
			"name": "MEAT AND CURED PORK",
			"sub": ["Cured Pork", "Meat"]
		},
		{
			"id": "4",
			"name": "FRUITS AND VEGE.",
			"sub": ["Fruits","Citrus","Vegetables","Packed Fruit and Vegetables"]
		},
		{
			"id": "3",
			"name": "PASTA",
			"sub": []
		},
		{
			"id": "4",
			"name": "DELICATESSEN",
			"sub": []
		},
		{
			"id": "7",
			"name": "PRESERVES",
			"sub": []
		},
		{
			"id": "8",
			"name": "SWEETS AND DOUGH PRODUCTS",
			"sub": []
		},
		{
			"id": "9",
			"name": "CHEESE",
			"sub": []
		},
		{
			"id": "10",
			"name": "COFFEE",
			"sub": []
		},
		{
			"id": "11",
			"name": "DRINKS",
			"sub": []
		},
		{
			"id": "12",
			"name": "FROZEN PRODUCTS",
			"sub": []
		},
		{
			"id": "13",
			"name": "CEREALS",
			"sub": []
		},
		{
			"id": "14",
			"name": "CONVENIENCE FOOD/READY MEALS",
			"sub": []
		},
		{
			"id": "15",
			"name": "VINEGAR",
			"sub": []
		}
  ];

  nodisplay = false;


  search(){
  	console.log(this.query);
  	console.log(this.type);
  	console.log(this.category);
  	this.cokkie.set('query', this.query);
  	if (this.type == '1') {
  		this.router.navigate(['/search-result/requestsearch/'+this.category+"/1/0/0/"+this.query])
  	}else{
	  	this.router.navigate(['/search-result/offersearch/'+this.category+"/1/0/0/"+this.query]);
  	}
  }

  openLogin(): void {
    let dialogRef = this.dialog.open(LoginDialog, {
      width: '500px',
      data: { name: "Vishal Pandey", animal: "fkjdshk" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openSignup(): void {
    let dialogRef = this.dialog.open(SignupDialog, {
      width: '500px',
      data: { name: "Vishal Pandey", animal: "fkjdshk" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./header.component.css']
})
export class LoginDialog {

	message:any;

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService, 
    public router: Router, 
    private cookieService:CookieService
    ) {
  		this.message = "Login";
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  key:any;
  config: Config;

  login(id:any, pwd:any) {
    this.message = "Loggin in ... ";
    this.authService.getLogin(id,pwd).subscribe((data:any) => {
      if (data.status == 'true') {
        console.log(data);
        this.message = "Logged In";
        this.cookieService.set("admin",data.HTTP_Authorization,360000,"/");
        this.cookieService.set("admin_type",data.type,360000,"/");
        this.router.navigate(['/admin/producer']);
        this.onNoClick();
      }else{
        console.log(data);
        this.message = data.error;
      }

    })
  }

}

@Component({
  selector: 'signup-dialog',
  templateUrl: 'signup-dialog.html',
  styleUrls: ['./header.component.css']
})
export class SignupDialog {

  constructor(
    public dialogRef: MatDialogRef<SignupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface Config {
  key: string;
  value: string;
}