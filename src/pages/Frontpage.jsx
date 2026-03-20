// Global styles are loaded from src/main.jsx (App.css is imported there)
import Home from '../components/frontpage/home';
import About from '../components/frontpage/about';
import About1 from '../components/frontpage/about1';
import About2 from '../components/frontpage/about2';
import Footer from '../components/frontpage/footer';

function Frontpage() {
  return (
    <div className="App">
      <Home />
      <About />
      <About1 />
      <About2 />
      <Footer />
    </div>
  );
}
export default Frontpage;