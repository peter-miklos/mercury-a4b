import { Address } from './address.model';

export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {
    this.id = obj && Number(obj.id) || null;
    this.name = obj && obj.name || '';
    this.phone = obj && obj.phone || '';
    this.address = obj && obj.address || '';
  }
}
