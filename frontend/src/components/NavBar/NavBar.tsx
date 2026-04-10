import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import './NavBar.css'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import LogoLight from '@src/assets/icons/LogoLight.svg'
import LogoDark from '@src/assets/icons/LogoDark.svg'
import { useState } from 'react'

function NavBar(): React.JSX.Element {
  const {isAdmin} = usePermissions()
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
  )

  function handleSwitch() {
    setIsDark(!isDark)
    document.documentElement.setAttribute('data-theme', !isDark ? 'dark' : 'light')
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
      {isAdmin && <ThemeSwitch isDark={isDark} handleSwitch={handleSwitch}/>}
    </div>
  )
}

export default NavBar
