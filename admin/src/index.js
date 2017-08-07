import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';
import SignIn from './components/auth/Signin';

import { Provider } from 'react-redux';

import { Route, Switch } from 'react-router';

import { ConnectedRouter } from 'react-router-redux';
import store from './store';
import history from './history';
import ProductCreate from './components/products/ProductCreate';
import ProductEdit from './components/products/ProductEdit';
import Products from './components/products/List';
import CompanyProductList from './components/products/CompanyProductList';
import AboutUs from './components/static-pages/About';
import Agreement from './components/static-pages/Agreement';
import UserProfile from './components/profile/UserProfile';
import CompaniesList from './components/companies/CompaniesList';
import StoresList from './components/companies/StoresList';
import ContactUs from './components/static-pages/ContactUs';
import OrdersList from './components/orders/OrdersList';
import Cart from './components/cart/Cart';
import LazilyLoad, { importLazy } from './components/LazyLoad';
import SignedInContainer from './containers/SignedIn';
import SignUp from './components/auth/Signup';
import StoreLocations from './components/profile/StoreLocations';

ReactDOM.render(
  <Provider store={store}>
    <div className='root-inner'>
      <ConnectedRouter history={history}>
        <div className='router-wrapper'>
          <LazilyLoad modules={{ Header: () => importLazy(import('./components/Header')), }}>
            {({ Header }) => (
              <Header />
            )}
          </LazilyLoad>

          <Switch>
            <Route path="/sign-in" component={SignIn}/>
            <Route path="/sign-up" component={SignUp}/>
            <Route path="/about-us" component={AboutUs}/>
            <Route path="/user-agreement" component={Agreement}/>

            <SignedInContainer>
              <Switch>
                <Route path="/" exact component={App} />
                <Route path="/products" exact component={Products}/>
                <Route path="/products/:productId" exact component={ProductEdit}/>
                <Route path="/products-create/" exact component={ProductCreate}/>
                <Route path="/user-profile" component={UserProfile}/>
                <Route path="/companies" exact component={CompaniesList}/>
                <Route path="/companies/:id/products" exact component={CompanyProductList} />
                <Route path="/stores" component={StoresList}/>
                <Route path="/contact-us" component={ContactUs}/>
                <Route path="/orders" component={OrdersList}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/location-settings" component={StoreLocations}/>
              </Switch>
            </SignedInContainer>
          </Switch>
        </div>
      </ConnectedRouter>
      <LazilyLoad modules={{ DevTools: () => importLazy(import('./containers/DevTools')), }}>
        {({ DevTools }) => (
          <DevTools />
        )}
      </LazilyLoad>
    </div>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
