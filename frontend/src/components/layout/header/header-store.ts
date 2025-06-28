import { create } from 'zustand'

interface HeaderState {
   mobileMenuOpen: boolean
   activeDropdown: string | null
   hoveredItem: string | null
   setMobileMenuOpen: (open: boolean) => void
   setActiveDropdown: (dropdown: string | null) => void
   setHoveredItem: (item: string | null) => void
   toggleDropdown: (menu: string) => void
}

export const useHeaderStore = create<HeaderState>(set => ({
   mobileMenuOpen: false,
   activeDropdown: null,
   hoveredItem: null,

   setMobileMenuOpen: open => set({ mobileMenuOpen: open }),

   setActiveDropdown: dropdown => set({ activeDropdown: dropdown }),

   setHoveredItem: item => set({ hoveredItem: item }),

   toggleDropdown: menu =>
      set(state => ({
         activeDropdown: state.activeDropdown === menu ? null : menu,
      })),
}))
