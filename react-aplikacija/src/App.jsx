import './App.scss';
import Navigacija from './Komponente/Navigacija/Navigacija';
import Zaglavlje from './Komponente/Zaglavlje/Zaglavlje';

function App() {
  return (
    <>
      <Zaglavlje />
      <div className='sadrzaj'>
        <Navigacija />
        <div className='stranica'></div>
      </div>
    </>
  );
}

export default App;