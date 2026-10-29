import { User } from '../models/User';

const CURRENT_USER_KEY = 'bun_bird_user';
const REGISTERED_USERS_KEY = 'bun_bird_users_db';

export const authService = {
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || !data.name) {
        localStorage.removeItem(CURRENT_USER_KEY);
        return null;
      }
      return new User(data);
    } catch {
      return null;
    }
  },

  getAllUsers() {
    try {
      const raw = localStorage.getItem(REGISTERED_USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  login({ identifier, password }) {
    if (!identifier?.trim()) {
      throw new Error('Please enter your email or phone number.');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }

    const cleanId = identifier.trim().toLowerCase();
    const registered = this.getAllUsers();
    const existing = registered.find(
      (u) =>
        (u.email && u.email.toLowerCase() === cleanId) ||
        (u.phone && u.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, ''))
    );

    let user;
    if (existing) {
      user = new User(existing);
    } else {
      // Frictionless fallback login: creates session with friendly name
      const isEmail = cleanId.includes('@');
      const defaultName = isEmail
        ? cleanId.split('@')[0].replace(/[._-]/g, ' ')
        : 'Bun & Bird Guest';
      const formattedName =
        defaultName.charAt(0).toUpperCase() + defaultName.slice(1);

      user = new User({
        id: `usr_${Date.now()}`,
        name: formattedName,
        email: isEmail ? cleanId : '',
        phone: !isEmail ? identifier.trim() : '0917 123 4567',
        address: '',
        city: 'Taguig',
      });
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  signup({ name, email, phone, password, address = '', city = 'Taguig' }) {
    if (!name?.trim()) {
      throw new Error('Please enter your full name.');
    }
    if (!email?.trim() && !phone?.trim()) {
      throw new Error('Please provide either an email or mobile number.');
    }
    if (!password) {
      throw new Error('Please create a password.');
    }

    const newUser = new User({
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: (email || '').trim().toLowerCase(),
      phone: (phone || '').trim(),
      address: address.trim(),
      city: city.trim(),
    });

    // Save to user registry
    try {
      const users = this.getAllUsers();
      users.push(newUser);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to save user to registry:', e);
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  logout() {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (e) {
      console.warn('Logout error:', e);
    }
  },
};
