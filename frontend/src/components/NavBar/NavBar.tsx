import './NavBar.css'
import LogoLight from '@src/assets/icons/LogoLight.svg'
import LogoDark from '@src/assets/icons/LogoDark.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { isThemeDark } from '@src/utils/isThemeDark'

function NavBar(): React.JSX.Element {
  const navigate = useNavigate()
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(isThemeDark())
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <div className="navBar">
      <a className="logoTitle" href='/'>
        <img width={64} src={isDarkTheme ? LogoDark : LogoLight}/>
        <div className='titleBox'>
          <p className='title'>Archiwu</p>
          <p className='title purple'>Mig</p>
        </div>
      </a>

      {/* Desktop */}
      <div className='buttonsBox desktopNav'>
        <button onClick={() => navigate('/words/')}>Wszystkie słowa</button>
        <button onClick={() => navigate('/info/')}>Informacje</button>
      </div>

      {/* Mobile */}
      <div className='mobileNav'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </div>

      {isMenuOpen && (
        <div className='mobileMenu'>
          <button onClick={() => { navigate('/words/'); setIsMenuOpen(false) }}>Wszystkie słowa</button>
          <button onClick={() => { navigate('/info/'); setIsMenuOpen(false) }}>Informacje</button>
        </div>
      )}
    </div>
  )
}

export default NavBar
