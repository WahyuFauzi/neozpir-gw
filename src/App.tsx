import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Services";
import eCommerceService from "./pages/products/Ecommerce";
import EnterpriseService from "./pages/products/Enterprise";
import AutomationService from "./pages/products/Automation";
import CustomService from "./pages/products/Custom";
import NotFound from "./pages/404";
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import Blog from "./pages/Blog";
import BlogList from "./pages/BlogList";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
          <Route path="/products/custom" component={CustomService} />
          <Route path="/blog" component={BlogList} />
          <Route path="/blog/:langkey" component={BlogList} />
          <Route path="/blog/:langkey/:title" component={Blog} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*" component={NotFound} />
        </Router>
        <Footer></Footer>
      </div>
    </I18nProvider>
  )
}

export default App
