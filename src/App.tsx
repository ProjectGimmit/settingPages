import { Routes, Route } from 'react-router-dom';
import Top from './routes/Top';
import Config from './routes/Config';
import Manual from './routes/Manual';
import NoMatch from './routes/NoMatch';

import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/mon/config" element={<Config day='mon' />} />
          <Route path="/tue/config" element={<Config day='tue' />} />
          <Route path="/wed/config" element={<Config day='wed' />} />
          <Route path="/thu/config" element={<Config day='thu' />} />
          <Route path="/fri/config" element={<Config day='fri' />} />
          <Route path="/sat/config" element={<Config day='sat' />} />
          <Route path="/sun/config" element={<Config day='sun' />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;