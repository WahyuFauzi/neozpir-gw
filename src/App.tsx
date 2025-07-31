import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Services";
import eCommerceService from "./pages/products/Ecommerce";
import EnterpriseService from "./pages/products/Enterprise";
import AutomationService from "./pages/products/Automation";
import NotFound from "./pages/404";
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
          <Route path="/products" component={Service} />
          <Route path="/products/ecommerce" component={eCommerceService} />
          <Route path="/products/enterprise" component={EnterpriseService} />
          <Route path="/products/automation" component={AutomationService} />
          <Route path="/contact" component={Home} />
          <Route path="*" component={NotFound} />
        </Router>
        <Footer></Footer>
      </div>
    </I18nProvider>
  )
}

export default App
