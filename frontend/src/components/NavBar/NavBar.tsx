import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import './NavBar.css'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import LogoLight from '@src/assets/icons/LogoLight.svg'
import LogoDark from '@src/assets/icons/LogoDark.svg'
import { useState } from 'react'
import LoginForm from '../Form/Forms/LoginForm'
import ActionButton from '../ActionButton/ActionButton'

function NavBar(): React.JSX.Element {
  const {isAdmin, logout} = usePermissions()
  const [isDark, setIsDark] = useState<boolean>(document.documentElement.getAttribute('data-theme') === 'dark')
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  function handleSwitch() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <div className="navBar">
      <a className="logoTitle" href='/'>
        <img width={64} src={isDark ? LogoDark : LogoLight}/>
        <div className='titleBox'>
          <p className='title'>Archiwu</p>
          <p className='title purple'>Mig</p>
        </div>
      </a>
      <div className='buttonsBox'>
        <ThemeSwitch isDark={isDark} handleSwitch={handleSwitch}/>
        {isAdmin ? <ActionButton text="Wyloguj" buttonAction={() => logout()} /> : <ActionButton text="Zaloguj" buttonAction={() => setIsFormOpen(true)} /> }
        {isFormOpen && <LoginForm setIsFormOpen={setIsFormOpen} />}
      </div>
    </div>
  )
}

export default NavBar
