import { useNavigate } from 'react-router-dom'
import './PageNotFound.css'

function PageNotFound(): React.JSX.Element {
  const navigate = useNavigate()
  const error = ''

  return (
    <div className="errorPage page">
      <div className="errorCode">
        <span className="errorAccent">4</span>0<span className="errorAccent">4</span>
      </div>
      <div className="errorDivider" />
      <h1 className="errorTitle">{error ?? 'Nie znaleziono strony'}</h1>
      <p className="errorDesc">
        Strona której szukasz nie istnieje lub została przeniesiona w inne miejsce.
      </p>
      <div className="errorActions">
        <button className="btnPrimary primary" onClick={() => navigate('/')}>
          Wróć na stronę główną
        </button>
        <button className="btnSecondary" onClick={() => navigate(-1)}>
          Wróć wstecz
        </button>
      </div>
    </div>
  )
}

export default PageNotFound
