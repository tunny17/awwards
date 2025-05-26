import './global.css';
import Hero from './components/Hero';

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <section className="bg-red-600 z-0 min-h-screen" />
    </main>
  );
};

export default App;
