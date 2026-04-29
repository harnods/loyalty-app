import { useEffect, useState } from 'react'
import { IMAGES } from '../../data/loyalty'
import './BrandPicker.css'

export default function BrandPicker({ brands, activeBrandId, onSelect, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  function handleSelect(id) {
    onSelect(id)
    handleClose()
  }

  return (
    <div
      className={`bp-overlay${visible ? ' bp-overlay--open' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`bp-sheet${visible ? ' bp-sheet--open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="bp-header">
          <p className="bp-title">Select brand</p>
          <button className="bp-close" onClick={handleClose} aria-label="Close">
            <span className="bp-close__path">
              <img src={IMAGES.closeIcon} alt="" />
            </span>
          </button>
        </div>

        <ul className="bp-list">
          {brands.map(brand => {
            const isActive = brand.id === activeBrandId
            return (
              <li key={brand.id}>
                <button
                  className={`bp-item${isActive ? ' bp-item--active' : ''}`}
                  onClick={() => handleSelect(brand.id)}
                >
                  <div className="bp-item__info">
                    <p className="bp-item__name">{brand.name}</p>
                    <div className="bp-item__meta">
                      <img src={IMAGES.crown} alt="" width={14} height={14} />
                      <span>{brand.tier}</span>
                      <span className="bp-item__dot" />
                      <span>{brand.points}</span>
                    </div>
                  </div>
                  {isActive && (
                    <span className="bp-item__check">
                      <img src={IMAGES.doneIcon} alt="" />
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
