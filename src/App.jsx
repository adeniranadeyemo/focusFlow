import './App.css';
import './index.css';

import Header from './components/Header';
import ModeSelector from './components/ModeSelectore';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between system-color">
      <header>
        <Header />
      </header>

      <main className="flex flex-col items-center gap-6 px-4 py-8">
        <ModeSelector />
      </main>
    </div>
  );
}

export default App;
