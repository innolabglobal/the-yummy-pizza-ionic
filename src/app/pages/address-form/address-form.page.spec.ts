import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddressFormPage } from './address-form.page';

describe('AddressFormPage', () => {
  let component: AddressFormPage;
  let fixture: ComponentFixture<AddressFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
