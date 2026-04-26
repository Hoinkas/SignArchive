import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import './NavBar.css'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import LogoLight from '@src/assets/icons/LogoLight.svg'
import LogoDark from '@src/assets/icons/LogoDark.svg'
import { useState } from 'react'
import ActionButton from '../ActionButton/ActionButton'
import LoginForm from '@src/pages/SignsPage/Forms/LoginForm'
import { useNavigate } from 'react-router-dom'

function NavBar(): React.JSX.Element {
  const {isAdmin, logout} = usePermissions()
  const [isLight, setIsLight] = useState<boolean>(document.documentElement.getAttribute('data-theme') === 'light')
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  function handleSwitch() {
    const next = !isLight
    setIsLight(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <div className="navBar">
      <a className="logoTitle" href='/'>
        <img width={64} src={isLight ? LogoLight : LogoDark}/>
        <div className='titleBox'>
          <p className='title'>Archiwu</p>
          <p className='title purple'>Mig</p>
        </div>
      </a>

      {/* Desktop */}
      <div className='buttonsBox desktopNav'>
        <button onClick={() => navigate('/words/')}>Wszystkie słowa</button>
        <button onClick={() => navigate('/info/')}>Informacje</button>
        <ThemeSwitch isLight={isLight} handleSwitch={handleSwitch}/>
        {isAdmin
          ? <ActionButton text="Wyloguj" buttonAction={logout} />
          : <ActionButton text="Zaloguj" buttonAction={() => setIsFormOpen(true)} />
        }
      </div>

      {/* Mobile */}
      <div className='mobileNav'>
        <ThemeSwitch isLight={isLight} handleSwitch={handleSwitch}/>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </div>

      {isMenuOpen && (
        <div className='mobileMenu'>
          <button onClick={() => { navigate('/words/'); setIsMenuOpen(false) }}>Wszystkie słowa</button>
          <button onClick={() => { navigate('/info/'); setIsMenuOpen(false) }}>informacje</button>
          {isAdmin
            ? <ActionButton text="Wyloguj" buttonAction={logout} />
            : <ActionButton text="Zaloguj" buttonAction={() => { setIsFormOpen(true); setIsMenuOpen(false) }} />
          }
        </div>
      )}

      {isFormOpen && <LoginForm setIsFormOpen={setIsFormOpen} />}
    </div>
  )
}

export default NavBar
