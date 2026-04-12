import { useWord } from '@src/hooks/WordContext/useWord'
import './LandingPage.css'
import SidePanel from '@src/components/SidePanel/SidePanel'
import { signCountText } from '@src/utils/namesHelpers'

function LandingPage(): React.JSX.Element {
  const {allWords} = useWord()

  return (
    <div style={{display: 'flex'}}>
      <SidePanel />
      <div className='landingPage'>
        <p>
          <br/>Obecnie w bazie mamy: {signCountText(allWords.length)}
          <br/>
          <br/>Na razie strona internetowa nie umożliwia samodzielnego dodawania słów, znaków, źródeł czy definicji. Będzie to możliwe w przyszłości.
          <br/>
          <br/>O postępie projektu i planach informujemy na bieżąco na naszym Instagramie: <a href='https://www.instagram.com/archiwumig/' target="_blank">@archiwumig</a>
          <br/>Wszelkie zapytania, uwagi czy znaki prosimy wysyłać na e-mail <a href='mailto:archiwumig@proton.me'>archiwumig@proton.me</a>
          <br/>
          <br/>Nawet jeśli znak już jest w bazie to możesz wysłać swoją wersję migania. Tworzymy bazę znaków PJM, aby umożliwić osobom studenckim, i innym chętnym, tworzenie własnego oprogramowania na podstawie bazy z wieloma nagraniami znaków.
          <br/>Często do tych technicznych projektów studenckich potrzeba kilkaset filmów, w którym różne osoby migają ten sam znak. Nie ma jednej dużej bazy i każda osoba musi sama pozyskiwać znaki i prosić innych o nagranie.
          <br/>Chcieliśmy to ułatwić tworząc taką bazę plików.
          <br/>
          <br/>

          <hr/>

          <br/>
          <h2>Ispiracje i polecane projekty</h2>
          <br/>Zachęcamy do przeglądania innych projektów, które nas zainspirowały:
          <br/>- <a href='https://www.instagram.com/natalia_rudkiewicz/' target="_blank">Natalia Rudkiewicz</a> (instagram z dawnymi znakami i regionalizmami)
          <br/>- <a href='https://www.facebook.com/people/%C5%9Al%C4%85ski-Migowy' target="_blank">Śląski Migowy</a> (facebook ze śląskimi znakami migowego tworzone przez <a href='https://www.facebook.com/boldysrafal' target="_blank">Rafał Bodys</a>)
          <br/>- <a href='https://www.slownikpjm.uw.edu.pl/en' target="_blank">Korpusowy Słownik PJM</a> (strona autorstwa <a href='https://www.plm.uw.edu.pl' target="_blank">Pracowni Lingwistyki Migowej</a> na UW)
          <br/>- <a href='https://www.prawopjm.uw.edu.pl/' target="_blank">Słownik Terminów Prawnych PJM</a> (strona autorstwa <a href='https://www.plm.uw.edu.pl' target="_blank">Pracowni Lingwistyki Migowej</a> na UW)
          <br/>- <a href='https://www.medycynapjm.uw.edu.pl/' target="_blank">Słownik Terminów Medycznych PJM</a> (strona autorstwa <a href='https://www.plm.uw.edu.pl' target="_blank">Pracowni Lingwistyki Migowej</a> na UW)
          <br/>- <a href='https://jawor.wzks.uj.edu.pl/20_palonek/znajdz_znak/search?q=ciekawo%C5%9B%C4%87' target="_blank">Znajdź Znak</a> (wyszukiwarka znaków z istniejących słowników stworzone przez Polę Palonek z UJ)
          <br/>- <a href='http://www.gag.art.pl/leksykon-lexicon/' target="_blank">Leksykon sztuki w PJM</a> (strona autorstwa GAG - Grupy Artystów Głuchych)
          <br/>- <a href='https://www.spreadthesign.com/pl' target="_blank">SpreadTheSign</a> (strona ze znakami języków migowych różnych krajów)
          <br/>- <a href='https://www.youtube.com/@akademiagluchych' target="_blank">Akademia Głuchych</a> (youtube z nowymi znakami migowymi na słowa, które ich nie miały, wraz z ich wyjaśnieniem)
          <br/>
          <br/>
          <hr/>

          <br/>
          <h2>Obecny postęp</h2>
          <br/>
          <h3>Wersja 1.0</h3>
          [x] Wyświetlanie listy słów
          <br/>[x] Wyświetlanie szczegółów słowa. Dodawanie, modyfikacja i usuwanie słowa.
          <br/>[x] Wyświetlanie listy znaków w słowie
          <br/>[x] Wyświetlanie szczegółów znaku. Dodawanie, modyfikacja i usuwanie znaku.
          <br/>[x] Wyświetlanie listy źródeł w znaku
          <br/>[x] Wyświetlanie szczegółów źródła. Dodawanie, modyfikacja i usuwanie źródła.
          <br/>[x] Wyświetlanie listy definicji w znaku
          <br/>[x] Wyświetlanie szczegółów definicji. Dodawanie, modyfikacja i usuwanie definicji.
          <br/>[x] Wyświeltanie listy kategorii w definicji. Dodawanie i usuwanie kategorii
          <br/>[x] Wyświeltanie listy tagów w znaku. Dodawanie i usuwanie tagów
          <br/>[x] Sortowanie listy słów alfabetycznie rosnąco i malejąco
          <br/>[x] Sortowanie listy słów przez kategorie i regiony użycia
          <br/>[x] Wersja ciemnego i jasnego tła strony
          <br/>[x] Wyświetlanie wymaganych pól i błędów w formularzach dodawania, modyfikacji i edycji obiektów
          <br/>[x] Przepisanie kodu z aplikacji komputerowej na stronę internetową (React.js, Typescript, Node.js, Express, Axios)
          <br/>[x] Strona startowa z linkami, inspiracjami i podziękowaniami
          <br/>[x] Dodanie odpowiedników w języku polskim pisanym do danego źródła. Niektóre znaki w dawnych latach oznaczały co innego, a dziś oznaczają co innego
          <br/>[x] W podlinku do strony można użyć nazwy słowa i je załaduje od razu
          <br/>[ ] Dodanie strony błędu dla nieistniejących podstron
          <br/>[ ] Możliwość dodania starego znaku do nowego słowa i tworzenie nowych słów na podstawie definicji w znakach
          <br/>[ ] Konto admina
          <br/>
          <br/>

          <hr/>
          <br/>
          <h2>Co planujemy?</h2>
          <br/>
          <h3>Wersja 2.0</h3>
          [ ] Zakładka liczebników dla danego słowa (godziny, przystanki, dokładki itp.)
          <br/>[ ] Zakładka nazw własnych do słów (ulic, dzielnic, budynków itp.)
          <br/>[ ] Widok na telefony oraz usprawniony widok na wszystkie szerokości ekranu
          <br/>[ ] Możliwość zwiększania i zmniejszania rozmiaru tekstu na stronie
          <br/>[ ] Wsparcie dla osób które korzystają tylko z klawiatury bez myszki
          <br/>[ ] Wyświetlanie informacji zwrotnej przy dodawaniu, modyfikacji i usuwaniu obiektów (niepowodzenia, powodzenia, błędy itp.)
          <br/>[ ] Dostosowanie strony pod czytniki ekranu dla osób niewidomych i niedowidzących. Dodanie tekstów alternatywnych
          <br/>[ ] Pobieranie surowych danych (plik .json) z zawartością słowa, jego znaków, definicji i źródeł
          <br/>[ ] Ocena częstotliwości użycia znaku oraz jego poprawności (czy g/Głusi faktycznie używali tego znaku, czy tylko słyszący go wymyślili i nagrali?)
          <br/>
          <br/>
          <h3>Wersja 3.0</h3>
          [ ] Automatyczne tworzenie miniatur wideo, które będą pokazywać półprzeźroczysty ruch
          <br/>[ ] Tworzenie plików punktami orientacyjnymi (mediapipe) z filmów do pobrania
          <br/>[ ] Wyświetlanie modelu 3D która będzie się poruszać bazując na stwirzonych punktach orientacyjnych (Three.js)
          <br/>[ ] Rozpoznawanie znaku z kamerki online, lub filmiku, i wyświetlanie przypisanych mu słów
          <br/>[ ] Notacja HamNoSys do każdego znaku
          <br/>[ ] Przechowywanie wielu filmów dla tego samego znaku aby udostępnić osobom do ich technicznych projektów (np. MachineLearning)
          <br/>[ ] Konta dla użytkowników z możliwością propozycji, modyfikacji słów, znaków, definicji, źródeł, komentowania zmian itp.
        </p>
      </div>
    </div>
  )
}

export default LandingPage
