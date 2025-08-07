import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import MenuAcc from './components/Layout/MenuAcc';

function App(props) {
  let params1 = useLocation();
  return (
    <>
      <Header />

      <section>
        <div className="container">
          <div className="row">
            {params1['pathname'].includes("account") ? <MenuAcc /> : <MenuLeft />}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
