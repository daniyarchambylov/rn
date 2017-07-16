import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProductItem as getProductItemAction} from '../../actions/products/creators/product';
import { Form, Input, Select, Button, Image } from 'semantic-ui-react';
import uploadImg from '../../img/icon-upload.png';
import Product from './Product';

class ProductEdit extends React.Component {
  static PropTypes = {
    getProductItemAction: PropTypes.func.isRequired,
    product: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.onSubmitProduct = this.onSubmitProduct.bind(this);

    this.state = {
      product: this.props.product,
    }
  }

  componentDidMount() {
    this.props.getProductItemAction(this.props.match.params.productId)
      .then(product => {

        this.setState({ product })
      })
  }


  onSubmitProduct(e) {
    e.preventDefault();
    const { title, code, quantity, created_on, expires_on, weight, volume, price, user } = this.state.product;
    const data = { title, code, quantity, created_on, expires_on, weight, volume, price, user };
    console.log(data);
    //
    //this.props.createProductAction(data);
  }


  render() {
    const { product } = this.state;
    console.log(product)
    return (
      <div className='main product'>
        <h1 className='title title--primary'>Редактирование товара</h1>
        <h3 className='title title--secondary'>Здесь вы можете забить необходимые поля для описания товара</h3>
        <Product product={ product } onSubmitProduct={ this.onSubmitProduct } />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const id = +props.match.params.productId;
  const product = state.products.get('products').get(id);
  return {
    product
  };
}

export default connect(mapStateToProps, {
  getProductItemAction,
})(ProductEdit);
