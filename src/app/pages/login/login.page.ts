import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  valForm: FormGroup;

  constructor(public authService: AuthService,
              public fb: FormBuilder,
              public navCtrl: NavController) {
    this.valForm = fb.group({
      email: ['user001@gmail.com', Validators.compose([Validators.required])],
      password: ['Test1234', Validators.required]
    });
  }

  ngOnInit() {
  }

  OnLogin($ev, value: any) {
    this.authService.login(value).subscribe(res => this.navCtrl.navigateRoot('/'));
  }
}
