import './App.css';
import Navbar from './Navbar'
import Searchcomponent from './Searchcomponent'
require('es6-promise').polyfill();
require('isomorphic-fetch');

function App() {
  return (
  <div>
    <Navbar/>
    <Searchcomponent/>
  </div>
  );
}

export default App;
