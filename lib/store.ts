// lib/store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  isSubscription: boolean
  finalPrice: number 
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  isCheckingOut: boolean
  isSuccess: boolean

  // Actions
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, isSubscription: boolean) => void
  updateQuantity: (id: string, isSubscription: boolean, quantity: number) => void
  clearCart: () => void
  setCheckingOut: (val: boolean) => void
  setSuccess: (val: boolean) => void
  syncCartFromServer: () => Promise<void>
}

const SUBSCRIPTION_DISCOUNT = 0.15

const backgroundSyncAdd = async (id: string, qty: number) => {
  fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId: id, quantity: qty }) }).catch(()=>{})
}

const backgroundSyncRemove = async (id: string) => {
  fetch('/api/cart', { method: 'DELETE', body: JSON.stringify({ productId: id }) }).catch(()=>{})
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckingOut: false,
      isSuccess: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (newItem) => {
        const { items } = get()
        const existingIndex = items.findIndex(
          (i) => i.id === newItem.id && i.isSubscription === newItem.isSubscription
        )

        if (existingIndex > -1) {
          const updated = [...items]
          updated[existingIndex].quantity += 1
          set({ items: updated, isOpen: true })
          backgroundSyncAdd(newItem.id, updated[existingIndex].quantity)
        } else {
          const finalPrice = newItem.isSubscription
            ? parseFloat((newItem.price * (1 - SUBSCRIPTION_DISCOUNT)).toFixed(2))
            : newItem.price

          set({
            items: [...items, { ...newItem, quantity: 1, finalPrice }],
            isOpen: true,
          })
          backgroundSyncAdd(newItem.id, 1)
        }
      },

      removeItem: (id, isSubscription) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.isSubscription === isSubscription)
          ),
        }))
        backgroundSyncRemove(id)
      },

      updateQuantity: (id, isSubscription, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, isSubscription)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.isSubscription === isSubscription
              ? { ...i, quantity }
              : i
          ),
        }))
        backgroundSyncAdd(id, quantity)
      },

      clearCart: () => set({ items: [] }),

      setCheckingOut: (val) => set({ isCheckingOut: val }),
      setSuccess: (val) => set({ isSuccess: val }),

      syncCartFromServer: async () => {
        try {
          const res = await fetch('/api/cart')
          const data = await res.json()
          if (data.items && data.items.length > 0) {
             // Basic naive array substitution for imported DB values
             // In full production, this maps exactly across the structure
             // Needs server image payload alignment.
             // We gracefully inject missing fields assuming 1-1 structure sync mapping
             const serverItems: CartItem[] = data.items.map((i: any) => ({
                id: i.id,
                name: i.name,
                price: i.finalPrice,
                finalPrice: i.finalPrice,
                quantity: i.quantity,
                imageUrl: i.image,
                isSubscription: false,
                slug: '' // Can be supplemented internally later
             }))
             const merged = [...get().items]
             
             // Very simple merge: If server has it, overwrite local.
             for(let sItem of serverItems) {
                const idx = merged.findIndex(v => v.id === sItem.id)
                if (idx > -1) merged[idx].quantity = Math.max(merged[idx].quantity, sItem.quantity)
                else merged.push(sItem)
             }
             set({ items: merged })
          }
        } catch {}
      }
    }),
    {
      name: 'glow-india-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)

// Derived selectors
export const cartTotalSelector = (state: CartState) =>
  state.items.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0)

export const cartCountSelector = (state: CartState) =>
  state.items.reduce((acc, item) => acc + item.quantity, 0)
