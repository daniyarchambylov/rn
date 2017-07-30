import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {getProductItem as getProductItemAction, editProduct as editProductAction} from '../../actions/products/creators/product';
import { Dimmer, Loader } from 'semantic-ui-react';
import Product from './Product';
import Uploader from './Uploader';

class ProductEdit extends React.Component {
  static PropTypes = {
    push: PropTypes.func.isRequired,
    getProductItemAction: PropTypes.func.isRequired,
    editProductAction: PropTypes.func.isRequired,
    product: PropTypes.any,
    fetching: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSubmitProduct = this.onSubmitProduct.bind(this);

    this.state = {
      product: this.props.product,
    }
  }

  componentDidMount() {
    this.props.getProductItemAction(this.props.match.params.productId, this.props.token)
      .then(product => {
        this.setState({ product })
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successMessage) {
      this.props.push('/products');
    }
  }

  onSubmitProduct(data) {
    this.props.editProductAction(data, this.props.token);
  }

  render() {
    const { product } = this.state;
    if (!product) {
      return null;
    }
    return (
      <div className='main product'>
        <Dimmer active={this.props.fetching}>
          <Loader />
        </Dimmer>
        <h1 className='title title--primary'>Редактирование товара</h1>
        <h3 className='title title--secondary'>Здесь вы можете забить необходимые поля для описания товара</h3>
        <Product product={ product } onSubmitProduct={ this.onSubmitProduct } />
        <Uploader productId={product.id} images={product.images} />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const id = +props.match.params.productId;
  const product = state.products.get('products').get(id);
  const successMessage = state.products.get('successMessage');
  const fetching = state.products.get('fetching');
  return {
    token: state.auth.token,
    product,
    successMessage,
    fetching
  };
}

export default connect(mapStateToProps, {
  push,
  getProductItemAction,
  editProductAction
})(ProductEdit);
