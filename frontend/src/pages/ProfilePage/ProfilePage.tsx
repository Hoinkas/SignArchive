import { useState } from 'react'
import './ProfilePage.css'

function ProfilePage(): React.JSX.Element {
  const tabs = ['Prośby', 'Nowości', 'Mój wkład', 'Mapa', 'Ostatnio oglądane']

  const [activeTab, setActiveTab] = useState<string>(tabs[0])

  const user = {
    nickname: "ArchiwuMig",
    joinDate: "12.04.2026",
    contact: "archiwumig@proton.me",
    role: "admin",
    howMuchSignSeen: 301,
    howMuchInfoAdded: 301,
    howMuchInfoApproved: 200,
    howMuchRegionsVisited: 16
  }

  const statisticsData = [
    user.howMuchSignSeen + " obejrzanych znaków",
    user.howMuchInfoAdded + " informacji dodanych",
    user.howMuchInfoApproved + " potwierdzeń",
    user.howMuchRegionsVisited + " odwiedzonych województw z 16"
  ]

  const barFill = 20

  function changeTab(newTab: string) {
    setActiveTab(newTab)
  }

  return (
    <div className="page">
      <div className="profileMainInfo">
        <div className="circle">{user.nickname[0]}{user.nickname[1]}</div>
        <div className='profileDetails'>
          <div>{user.nickname}</div>
          <div>{user.contact}</div>
          <div>Archiwum dawnych i regionalnych znaków PJM. Dokumentujemy znaki, które znikają. Odkrywamy pochodzenie i znaczenie znaków.</div>
          <div className='additionalInfo'>Z nami od {user.joinDate}</div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
        <div>Ranga: Strażnik znaków</div>
        <div className="progressBarBox">
          <div className="progressBarFill" style={{width: barFill+'%', borderRadius: barFill == 100 ? '24px' : '24px 0 0 24px'}}/>
        </div>
        <div className='additionalInfo'>34 punkty do rangi Archiwista</div>
      </div>
      <div className='statisticsBox'>
        {statisticsData.map((d) => <div className='statisicBox additionalInfo'>{d}</div>)}
      </div>
      <div className='actionsBox'>
        <div className='actionTabs'>
          {tabs.map((t) =>
          <div
            className={t === activeTab ? 'actionTab active' : 'actionTab'}
            onClick={() => changeTab(t)}
          >
            {t}
          </div>)}
        </div>
        <div className='actionBox'>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage
