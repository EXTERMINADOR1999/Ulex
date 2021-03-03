import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token: string = null;

  constructor(private router: Router, private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    let token = this.localstorageService.cacheGet('token')
    if(token != null && token != undefined){
      this.router.navigate(['home/productos']);
    }
  }

    LocalStorage(click: boolean){
      let c: any;
      c = click
      this.localstorageService.cacheSet('token', c);
      this.ngOnInit();
    }
}
