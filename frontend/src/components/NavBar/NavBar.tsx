import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import './NavBar.css'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import Logo from '@src/assets/icons/Logo.svg'

function NavBar(): React.JSX.Element {
  const {isAdmin} = usePermissions()

  return (
    <div className="navBar">
      <div className="logoTitle">
        <img width={50} src={Logo}/>
        <div className='titleBox'>
          <p className='title'>Archiwu</p>
          <p className='title purple'>Mig</p>
        </div>
      </div>
      {isAdmin && <ThemeSwitch />}
    </div>
  )
}

export default NavBar
