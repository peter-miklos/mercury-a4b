export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(obj?: any) {
    this.street = obj && obj.street || '';
    this.city = obj && obj.city || '';
    this.state = obj && obj.state || '';
    this.zip = obj && obj.zip || '';
  }
}
