import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createProduct as createProductAction } from '../../actions/products/creators/product';
import {Dimmer, Loader} from 'semantic-ui-react';
import Product from './Product';

class ProductCreate extends React.Component {
  static PropTypes = {
    push: PropTypes.func.isRequired,
    createProductAction: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.onSubmitProduct = this.onSubmitProduct.bind(this);

    this.state = {
      product: {
        title: null,
        category: null,
        code: null,
        quantity: null,
        created_on: null,
        expires_on: null,
        weight: null,
        volume: null,
        price: null,
        user: null,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successMessage) {
      this.props.push('/products');
    }
  }

  onSubmitProduct(data) {
    this.props.createProductAction(data, this.props.token);
  }

  render() {
    const { product } = this.state;

    return (
      <div className='main product'>
        <Dimmer active={this.props.fetching}>
          <Loader />
        </Dimmer>
        <h1 className='title title--primary'>Создание товара</h1>
        <h3 className='title title--secondary'>Здесь вы можете забить необходимые поля для описания товара</h3>
        <Product product={ product } onSubmitProduct={ this.onSubmitProduct }/>
      </div>
    );
  }
}

export default connect((state) => ({
  token: state.auth.token,
  successMessage: state.products.get('successMessage'),
  fetching: state.products.get('fetching'),
}), { push, createProductAction, })(ProductCreate);
