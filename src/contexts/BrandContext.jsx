import { createContext, useContext, useState } from 'react'
import { BRANDS } from '../data/loyalty'

const BrandContext = createContext(null)

export function BrandProvider({ children }) {
  const [activeBrandId, setActiveBrandId] = useState(BRANDS[0].id)
  const brand = BRANDS.find(b => b.id === activeBrandId) ?? BRANDS[0]

  return (
    <BrandContext.Provider value={{ brand, brands: BRANDS, setActiveBrandId }}>
      {children}
    </BrandContext.Provider>
  )
}

export function useBrand() {
  return useContext(BrandContext)
}
