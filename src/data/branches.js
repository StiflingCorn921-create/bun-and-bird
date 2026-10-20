import { Branch } from '../models/Branch';

export const branches = [
  new Branch({
    id: 'branch-bgc',
    name: 'BGC High Street Flagship',
    address: 'Unit 102, 7th Ave corner 28th St, Bonifacio High Street, Taguig City, Metro Manila',
    hours: '10:00 AM - 11:00 PM (Daily)',
    phone: '(02) 8812-4567',
  }),
  new Branch({
    id: 'branch-makati',
    name: 'Makati Ayala Central',
    address: 'Ground Floor, Greenbelt 3, Ayala Center, Makati City, Metro Manila',
    hours: '9:00 AM - 10:00 PM (Daily)',
    phone: '(02) 8845-9012',
  }),
  new Branch({
    id: 'branch-qc',
    name: 'Quezon City Tomas Morato',
    address: 'Scout Gandia corner Tomas Morato Avenue, Quezon City, Metro Manila',
    hours: '10:00 AM - 1:00 AM (Late Night Service)',
    phone: '(02) 8923-3344',
  }),
  new Branch({
    id: 'branch-ortigas',
    name: 'Ortigas Center Emerald',
    address: 'Sapphire Road corner Emerald Avenue, Ortigas Center, Pasig City, Metro Manila',
    hours: '10:00 AM - 10:00 PM (Mon-Sat), 11:00 AM - 9:00 PM (Sun)',
    phone: '(02) 8631-7788',
  }),
];

export const branchesMap = new Map(branches.map(b => [b.id, b]));
