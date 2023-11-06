import { Routes, Route } from 'react-router-dom';
import Top from './routes/Top';
import Config from './routes/Config';
import Manual from './routes/Manual';
import Nomatch from './routes/Nomatch';
// import About from './routes/about';
// import Contact from './routes/contact';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/config" element={<Config />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </div>
  );
}

export default App;