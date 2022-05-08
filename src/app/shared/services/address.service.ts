import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  collectionName = 'Addresses';
  addressId?: string;
  
  constructor(private afs: AngularFirestore) {}

  create(address: Address) {
    address.id = this.afs.createId(); 
    return this.afs.collection<Address>(this.collectionName).doc(address.id).set(address);
  }

  getAll() {
    return this.afs.collection<Address>(this.collectionName).valueChanges();
  }

  getAddressesByUserId(userId: string) {
    return this.afs.collection<Address>(this.collectionName, ref => ref.where('userID', '==', userId).orderBy('postal_code','asc')).valueChanges();
  }

  delete(id: string) {
    this.afs.collection<Address>(this.collectionName).doc(id).delete();
  }
}
