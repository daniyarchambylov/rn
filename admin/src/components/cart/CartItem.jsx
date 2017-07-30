import React from 'react';
import {Grid, Form, Image, Icon, Input} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {removeFromCart as removeFromCartAction, updateQuantity as updateQuantityAction} from '../../actions/cart/creators/cart';
import noPhoto from '../../img/no-photo.png';

class CartItem extends React.Component {
  static PropTypes = {
    product: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    removeClick: React.PropTypes.func.isRequired,
    removeFromCartAction: React.PropTypes.func.isRequired,
    updateQuantityAction: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.quantityChange = this.quantityChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  quantityChange(e, target) {
    const value = target.value;
    const {product} = this.props;

    this.props.updateQuantityAction({product, quantity: +value});
  }

  onRemoveClick() {
    this.props.removeFromCartAction(this.props.product.id);
  }

  render() {
    const {product, index} = this.props;

    return (
      <Grid.Row stretched key={index} style={{cursor: 'pointer'}}>
        <Grid.Column className='companies__title'>
          <div>
            <Image src={product.image || noPhoto} verticalAlign='middle' className='product-image' />
          </div>
        </Grid.Column>
        <Grid.Column>
          <div>{product.created_on}</div>
          <div><strong>{product.title}</strong></div>
          <div>Арт. {product.code}</div>
        </Grid.Column>
        <Grid.Column>
          <Form.Field>
            <Input value={ product.counter } type='number' onChange={this.quantityChange}/>
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          {product.price} сом.
        </Grid.Column>
        <Grid.Column>
          <Icon content='В корзину' color='grey' className='add-to-basket-btn' size='large' name='close' onClick={this.onRemoveClick}/>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

function mapStateToProps(state) {
  const products = state.cart.get('products');
  const totalSum = state.cart.get('totalSum');

  return {
    products,
    totalSum,
  };
}

export default connect(mapStateToProps, {updateQuantityAction, removeFromCartAction})(CartItem);
