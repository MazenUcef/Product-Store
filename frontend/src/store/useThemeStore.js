import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("prefered-theme") || "forest",
    setTheme: (theme) => {
        localStorage.setItem("prefered-theme", theme);
        set({ theme });
    }
}))