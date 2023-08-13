import './App.scss';
import Navigacija from './Komponente/Navigacija/Navigacija';
import Zaglavlje from './Komponente/Zaglavlje/Zaglavlje';
import DnevniZadaci from './Stranice/DnevniZadaci/DnevniZadaci';
import Projekti from './Stranice/Projekti/Projekti';
import TjedniZadaci from './Stranice/TjedniZadaci/TjedniZadaci';
import { TrajniZadaci } from './Stranice/TrajniZadaci/TrajniZadaci';
import { Route, Routes } from 'react-router-dom';

function App() {
  //TODO: 404 putanja i stranica
  return (
    <>
      <Zaglavlje className='zaglavlje' />
      <Navigacija className='navigacija' />
      <main className='stranica'>
        <Routes>
          <Route path="/trajni-zadaci" element={<TrajniZadaci />}/>
          <Route path="/tjedni-zadaci" element={<TjedniZadaci />}/>
          <Route path="/dnevni-zadaci" element={<DnevniZadaci />}/>
          <Route path="/projekti" element={<Projekti />}/>

        </Routes>
      </main>
    </>
  );
}

export default App;