import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  valForm: FormGroup;

  constructor(public authService: AuthService,
              public fb: FormBuilder,
              public navCtrl: NavController) {
    this.valForm = fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onRegisterBtnClicked($ev, value: any) {
    this.authService.register(value).subscribe(res => this.navCtrl.navigateRoot('/tabs/cart'));
  }
}
