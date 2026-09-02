import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user, role: user?.role || null }),
  setRole: (role) => set({ role }),
  logout: () => set({ user: null, role: null }),
}));

export default useAuthStore;
