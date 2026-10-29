export class Branch {
  constructor({ id, name, address, hours, phone, region = 'Metro Manila' }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.hours = hours;
    this.phone = phone;
    this.region = region;
  }
}
