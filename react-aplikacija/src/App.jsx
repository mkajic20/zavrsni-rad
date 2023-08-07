import './App.scss';
import Navigacija from './Komponente/Navigacija/Navigacija';
import Zaglavlje from './Komponente/Zaglavlje/Zaglavlje';
import { TrajniZadaci } from './Stranice/TrajniZadaci/TrajniZadaci';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Zaglavlje className='zaglavlje' />
        <Navigacija className='navigacija' />
        <main className='stranica'>
          <Routes>
            <Route path="/trajni-zadaci" element={<TrajniZadaci />}/>
          </Routes>
        </main>
    </>
  );
}

export default App;