import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';
import SignIn from './components/auth/Signin';

import { Provider } from 'react-redux'

import { Route } from 'react-router'

import { ConnectedRouter } from 'react-router-redux'
import store from './store';
import history from './history';
import DevTools from './containers/DevTools';
import Header from './components/Header';
import Products from './components/products/Product';
import Sidebar from './components/Sidebar';
import AboutUs from './components/static-pages/About';
import Agreement from './components/static-pages/Agreement';
import UserProfile from './components/profile/UserProfile';
import CompaniesList from './components/companies/CompaniesList';
import ContactUs from './components/static-pages/ContactUs';
import OrdersList from './components/orders/OrdersList';

ReactDOM.render(
  <Provider store={store}>
    <div className='root-inner'>
      <ConnectedRouter history={history}>
        <div className='router-wrapper'>
          <Header />
          <Route path="/sign-in" component={SignIn}/>
          <div className='content'>
            <Sidebar />
            <Route exact path="/" component={App}/>
            <Route path="/products" component={Products}/>
            <Route path="/about-us" component={AboutUs}/>
            <Route path="/user-agreement" component={Agreement}/>
            <Route path="/user-profile" component={UserProfile} />
            <Route path="/companies" component={CompaniesList} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/orders" component={OrdersList} />
          </div>
        </div>
      </ConnectedRouter>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
