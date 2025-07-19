import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Services";
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import { I18nProvider } from "./i18n/I18nContext";
function App() {
  return (
    <I18nProvider>
      <div>
        <Navbar></Navbar>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Service} />
          <Route path="/contact" component={Home} />
        </Router>
        <Footer></Footer>
      </div>
    </I18nProvider>
  )
}

export default App
