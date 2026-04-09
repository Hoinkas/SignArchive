import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import './NavBar.css'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'

function NavBar(): React.JSX.Element {
  const {isAdmin} = usePermissions()

  return (
    <div className="navBar">
      <div className="logoTitle">
        <a className="logo" href="/">LOGO</a>
        <p className='titleText'>ArchiwuMig</p>
      </div>
      {isAdmin && <ThemeSwitch />}
    </div>
  )
}

export default NavBar
