import { User } from '../models/User';

const USER_STORAGE_KEY = 'bun_bird_user';

export const authService = {
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return new User(data);
    } catch {
      return null;
    }
  },

  login({ identifier, password }) {
    if (!identifier || !password) {
      throw new Error('Please enter your email or phone and password.');
    }
    const cleanId = identifier.trim();
    const isEmail = cleanId.includes('@');
    const user = new User({
      id: `usr_${Date.now()}`,
      name: isEmail ? cleanId.split('@')[0] : 'Bun & Bird Guest',
      email: isEmail ? cleanId : '',
      phone: !isEmail ? cleanId : '0917-123-4567',
      address: '',
      city: 'Taguig',
    });
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  signup({ name, email, phone, password, address = '', city = 'Taguig' }) {
    if (!name || !password || (!email && !phone)) {
      throw new Error('Name, password, and email or phone are required.');
    }
    const user = new User({
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      address: address.trim(),
      city: city.trim(),
    });
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.warn('Logout error:', e);
    }
  },
};
