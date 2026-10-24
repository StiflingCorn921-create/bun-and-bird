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
    id: 'branch-ayala-cebu',
    name: 'Ayala Center Cebu',
    address: 'Cebu Business Park, Archbishop Reyes Avenue corner Cardinal Rosales Avenue, Barangay Luz, Cebu City',
    hours: '9:00 AM - 10:00 PM (Daily)',
    phone: '(02) 8845-9012',
  }),
  new Branch({
    id: 'branch-qc',
    name: 'Quezon City Tomas Morato',
    address: '8 River Walk',
    hours: 'Mon–Sun · 11:00–22:00',
    phone: '(555) 014-0363',
  }),
  new Branch({
    id: 'branch-seaside-cebu',
    name: 'SM Seaside City Cebu',
    address: 'Cebu South Coastal Road corner F. Vestil Street, South Road Properties (SRP), Brgy. Mambaling, Cebu City',
    hours: 'Mon–Sun · 10:00–23:00',
    phone: '(555) 014-0454',
  }),
];

export const branchesMap = new Map(branches.map(b => [b.id, b]));
