import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Icon, Message} from 'semantic-ui-react';
import CartItem from './CartItem';
import {clearCart as clearCartAction} from '../../actions/cart/creators/cart';

class Cart extends React.Component {
  static PropTypes = {
    products: PropTypes.object,
    clearCartAction: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onClearCart = this.onClearCart.bind(this);
  }

  onClearCart() {
    this.props.clearCartAction();
  }

  render() {
    const {products, totalSum} = this.props;

    return (
      <div className='main product'>
        <h1 className='title title--primary'>Создание товара</h1>
        <h3 className='title title--secondary'>Здесь вы можете забить необходимые поля для описания товара</h3>
        <Grid columns='equal' className='companies list' celled='internally'>
          <Grid.Row stretched className='head-row'>
            <Grid.Column className='companies__title'>
              Товар
            </Grid.Column>
            <Grid.Column>
              Описание
            </Grid.Column>
            <Grid.Column>
              Кол-во
            </Grid.Column>
            <Grid.Column>
              Сумма
            </Grid.Column>
            <Grid.Column>
              {products.size > 0 && <Icon color='grey' name='close' onClick={this.onClearCart} size='large'/>}
            </Grid.Column>
          </Grid.Row>
          {products.map((p, index) => <CartItem product={p} key={index} />)}
        </Grid>
        {products.size > 0 && <Grid.Row stretched className='head-row'>
            <Grid.Column>
              Итого: <span color='orange'>{ totalSum }  сом</span>
            </Grid.Column>
          </Grid.Row>}
        {products.size === 0 && <Message content='Пустая корзина' />}
      </div>
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

export default connect(mapStateToProps, {clearCartAction})(Cart);