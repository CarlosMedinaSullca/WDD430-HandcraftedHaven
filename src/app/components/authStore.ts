// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  UserInterface, 
  ProfileInterface, 
  ArtisanInterface 
} from '@/app/types/interfacesModels';

interface AuthState {
  user: UserInterface | null;
  profile: ProfileInterface | null;
  artisan: ArtisanInterface | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: { first_name: string; last_name: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (profileData: Partial<ProfileInterface>) => void;
  updateUser: (userData: Partial<UserInterface>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      artisan: null,
      isAuthenticated: false,
      isLoading: false, // ← NUEVO: para mostrar loading states
      
      // ✅ ACTUALIZADO: Ahora recibe email/password y llama a la API
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            return { success: false, error: data.error };
          }

          // ✅ Si la API responde éxito, actualizamos el store
          set({ 
            user: data.user, 
            profile: data.profile, 
            artisan: data.artisan || null,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Error de conexión' };
        }
      },

      // ✅ NUEVO: Método para registro
      register: async (userData: { first_name: string; last_name: string; email: string; password: string }) => {
        set({ isLoading: true });
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (!response.ok) {
            return { success: false, error: data.error };
          }

          set({
            user: data.user,
            profile: data.profile,
            artisan: null, // Nuevos usuarios no son artesanos por defecto
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Error de conexión' };
        }
      },
      
      logout: () => set({ 
        user: null, 
        profile: null, 
        artisan: null,
        isAuthenticated: false,
        isLoading: false,
      }),
      
      updateProfile: (profileData) => {
        const { profile } = get();
        if (profile) {
          set({ 
            profile: { ...profile, ...profileData } 
          });
        }
      },
      
      updateUser: (userData) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { ...user, ...userData } 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Hooks derivados útiles
export const useUserRole = () => {
  const { artisan } = useAuthStore();
  return artisan ? 'artisan' : 'client';
};

export const useIsArtisan = () => {
  return useAuthStore((state) => !!state.artisan);
};

export const useUserProfile = () => {
  return useAuthStore((state) => ({
    user: state.user,
    profile: state.profile,
    artisan: state.artisan
  }));
};

export const useAuthLoading = () => {
  return useAuthStore((state) => state.isLoading);
};