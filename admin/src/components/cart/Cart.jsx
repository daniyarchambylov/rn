import React from 'react';
import {connect} from 'react-redux';
import {Grid, Icon, Message} from 'semantic-ui-react';
import CartItem from './CartItem';
import {removeFromCart as removeFromCartAction, clearCart as clearCartAction} from '../../actions/cart/creators/cart';

class Cart extends React.Component {
  static PropTypes = {
    products: React.PropTypes.object,
    removeFromCartAction: React.PropTypes.func.isRequired,
    clearCartAction: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onClearCart = this.onClearCart.bind(this);
  }

  onRemoveClick(id) {
    this.props.removeFromCartAction(id);
  }

  onClearCart() {
    this.props.clearCartAction();
  }

  render() {
    const {products} = this.props;
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
          {products.map((p, index) => <CartItem product={p} index={index} removeClick={this.onRemoveClick} />)}
        </Grid>
        {products.size > 0 && <Grid.Row stretched className='head-row'>
            <Grid.Column>
              Итого: <span color='orange'>{ products.map(p => 2 * p.price ).reduce((x, y) => x + y) } сом</span>
            </Grid.Column>
          </Grid.Row>}
        {products.size === 0 && <Message content='Пустая корзина' />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const products = state.cart.get('products');

  return {
    products
  };
}

export default connect(mapStateToProps, {removeFromCartAction, clearCartAction})(Cart);