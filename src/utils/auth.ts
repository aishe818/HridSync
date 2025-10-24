// Simple localStorage-backed auth helpers for development/demo purposes.
// NOTE: This is NOT secure for production. Passwords are base64-encoded only.

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string; // base64-encoded
  userType: 'user' | 'doctor';
};

const STORAGE_KEY = 'hridsync_users_v1';

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch (e) {
    console.error('Failed to load users from localStorage', e);
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function createUser(u: Omit<StoredUser, 'id'> & { id?: string }): StoredUser {
  const users = loadUsers();
  const id = u.id ?? Date.now().toString();
  const user: StoredUser = { ...u, id } as StoredUser;
  users.push(user);
  saveUsers(users);
  return user;
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const users = loadUsers();
  return users.find((x) => x.email.toLowerCase() === email.toLowerCase());
}

export function authenticate(email: string, password: string): StoredUser | null {
  const user = findUserByEmail(email);
  if (!user) return null;
  const encoded = btoa(password);
  return user.password === encoded ? user : null;
}
