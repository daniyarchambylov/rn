import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProduct as createProductAction } from '../../actions/products/creators/product';
import { Form, Input, Select, Button, Image } from 'semantic-ui-react';
import uploadImg from '../../img/icon-upload.png';
import Product from './Product';

class ProductCreate extends React.Component {
  static PropTypes = {
    createProductAction: PropTypes.func.isRequired,
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


  onSubmitProduct(e) {
    e.preventDefault();
    const { title, code, quantity, created_on, expires_on, weight, volume, price, user } = this.state.product;
    const data = { title, code, quantity, created_on, expires_on, weight, volume, price, user };
    console.log(data);

    this.props.createProductAction(data);
  }

  render() {
    const { product } = this.state;
    return (
      <div className='main product'>
        <h1 className='title title--primary'>Создание товара</h1>
        <h3 className='title title--secondary'>Здесь вы можете забить необходимые поля для описания товара</h3>
        <Product product={ product } onSubmitProduct={ this.onSubmitProduct }/>
      </div>
    );
  }
}
export default connect(null, {
  createProductAction,
})(ProductCreate);
