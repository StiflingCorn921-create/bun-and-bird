export class User {
  constructor({ id, name, email = '', phone = '', address = '', city = '' }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
  }
}

