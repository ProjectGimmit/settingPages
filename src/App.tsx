import { Routes, Route } from 'react-router-dom';
import Top from './routes/Top';
import Config from './routes/Config';
import Manual from './routes/Manual';
import NoMatch from './routes/NoMatch';

import Wire from './componets/wire';
import Toggle from './componets/toggle';
import Key from './componets/key';
import Level from './componets/level';
import LightsOut from './componets/lightsOut';
import { RecoilRoot } from 'recoil';
// import About from './routes/about';
// import Contact from './routes/contact';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/config" element={<Config />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/config/wire" element={<Wire />} />
          <Route path="/config/toggle" element={<Toggle />} />
          <Route path="/config/key" element={<Key />} />
          <Route path="/config/level" element={<Level />} />
          <Route path="/config/lightsOut" element={<LightsOut />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;