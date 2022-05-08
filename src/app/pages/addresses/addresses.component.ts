import { Component, createPlatform, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../shared/services/address.service';
import { Address } from '../../shared/models/Address';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  addresses: Array<Address> = [];
  user?: User;
  selectedAddresId?: string;
  
  constructor(private formbuilder: FormBuilder, 
    private addressService: AddressService, 
    private userService: UserService,
    private router: Router) {

  }

  addressesForm = this.createForm({
      id: '',
      postal_code: 0,
      city: '',
      street: '',
      house_number: 0,
      gasState: 0,
      date: 0,
      userID: ''
  })

  
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.addressesForm.get('userID')?.setValue(this.user?.id);
    }, error => {
      console.error(error);
    });
    this.addressService.getAddressesByUserId(user.uid).subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  createForm(model: Address) {
    let formGroup = this.formbuilder.group(model);
    formGroup.get('postal_code')?.addValidators([Validators.required, Validators.minLength(4)]);
    formGroup.get('city')?.addValidators([Validators.required]);
    formGroup.get('street')?.addValidators([Validators.required]);
    formGroup.get('house_number')?.addValidators([Validators.required]);
    return formGroup;
  }

  addAddress() {
    if (this.addressesForm.valid) {
      if (this.addressesForm.get('postal_code') && this.addressesForm.get('city') && this.addressesForm.get('street') && this.addressesForm.get('house_number')) {
        this.addressesForm.get('date')?.setValue(new Date().getTime());
        this.addressService.create(this.addressesForm.value).then(_ => {

        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  deleteAddress(id: string) {
    this.addressService.delete(id);
  }
}
