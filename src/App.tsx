import { Router, Route } from '@solidjs/router';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Services';
import eCommerceService from './pages/products/Ecommerce';
import EnterpriseService from './pages/products/Enterprise';
import AutomationService from './pages/products/Automation';
import CustomService from './pages/products/Custom';
import NotFound from './pages/404';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Blog from './pages/Blog';
import BlogList from './pages/BlogList';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Partnership from './pages/Partnership';
import { I18nProvider } from './i18n/I18nContext';
import { AuthProvider } from './context/auth.context';

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
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
            <Route path="/verify-email" component={VerifyEmail} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/partnership" component={Partnership} />
            <Route path="*" component={NotFound} />
          </Router>
          <Footer></Footer>
          {import.meta.env.DEV ? <div>DEV ENVIRONMENT</div> : <div></div>}
        </div>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
