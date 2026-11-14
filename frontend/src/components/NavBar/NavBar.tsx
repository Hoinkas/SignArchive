import './NavBar.css'
import LogoLight from '@src/assets/icons/LogoLight.svg'
import LogoDark from '@src/assets/icons/LogoDark.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { isThemeDark } from '@src/utils/isThemeDark'

function NavBar(): React.JSX.Element {
  const navigate = useNavigate()
  const [isDarkTheme] = useState<boolean>(isThemeDark())
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const pages = [
    ['signs', 'Znaki'],
    // ['info', 'Informacje']
  ]

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
        {pages.map((p) => <button  className="secondary" onClick={() => navigate('/' + p[0] + '/')}>{p[1]}</button>)}
      </div>

      {/* Mobile */}
      <div className='mobileNav'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </div>

      {isMenuOpen && (
        <div className='mobileMenu'>
          {pages.map((p, i) => <button key={i} onClick={() => { navigate('/' + p[0] + '/'); setIsMenuOpen(false) }}>{p[1]}</button>)}
        </div>
      )}
    </div>
  )
}

export default NavBar
