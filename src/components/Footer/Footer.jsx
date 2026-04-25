import { IMAGES } from '../../data/loyalty'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__powered">Powered by</p>
      <div className="footer__logo">
        <img src={IMAGES.mekariQontak} alt="mekari qontak" width={78} height={24} />
      </div>
    </footer>
  )
}
