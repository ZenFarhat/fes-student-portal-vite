import { create } from "zustand"

interface SidePanelStore {
  component: React.ReactNode | null
  header: string | null
  setComponent: (component: React.ReactNode | null, header: string | null) => void
}

const useSidePanelStore = create<SidePanelStore>((set) => ({
  component: null,
  header: null,
  setComponent: (component, header) => set({ component, header }),
}))

export default useSidePanelStore
