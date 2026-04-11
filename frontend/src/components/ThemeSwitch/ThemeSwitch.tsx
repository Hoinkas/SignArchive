import './ThemeSwitch.css'

interface ThemeSwitchProps {
  isDark: boolean
  handleSwitch(): void
}

function ThemeSwitch({isDark, handleSwitch}: ThemeSwitchProps): React.JSX.Element {
  return (
    <label className="switch">
      <input className="switch__input" type="checkbox" checked={!isDark} onChange={handleSwitch} />
      <span className="switch__icon">
        <span className="switch__icon-part switch__icon-part--1"></span>
        <span className="switch__icon-part switch__icon-part--2"></span>
        <span className="switch__icon-part switch__icon-part--3"></span>
        <span className="switch__icon-part switch__icon-part--4"></span>
        <span className="switch__icon-part switch__icon-part--5"></span>
        <span className="switch__icon-part switch__icon-part--6"></span>
        <span className="switch__icon-part switch__icon-part--7"></span>
        <span className="switch__icon-part switch__icon-part--8"></span>
        <span className="switch__icon-part switch__icon-part--9"></span>
        <span className="switch__icon-part switch__icon-part--10"></span>
        <span className="switch__icon-part switch__icon-part--11"></span>
      </span>
      <span className="switch__sr">Tryb jasny</span>
    </label>
  )
}

export default ThemeSwitch
