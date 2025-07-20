import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Services";
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import { I18nProvider } from "./i18n/I18nContext";
import { createResource } from "solid-js";

// @ts-ignore
const ApiTest = () => {
  const [apiMessage] = createResource(() =>
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => data.message)
  );

  return (
    <div style={{ "text-align": "center", "padding": "20px", "background-color": "#f0f0f0" }}>
      <h2>A new way to find <strong>{apiMessage.loading ? "Loading..." : apiMessage()}</strong></h2>
    </div>
  );
};

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
      <ApiTest></ApiTest>
    </I18nProvider>
  )
}

export default App
