import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Grid, Icon, Message, Button, Form, Header} from 'semantic-ui-react';
import CartItem from './CartItem';
import {clearCart as clearCartAction, createOrder as createOderAction} from '../../actions/cart/creators/cart';

class Cart extends React.Component {
  static PropTypes = {
    products: PropTypes.object,
    push: PropTypes.func.isRequired,
    clearCartAction: PropTypes.func.isRequired,
    createOderAction: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.onClearCart = this.onClearCart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.order !== nextProps.order && nextProps.order.id) {
      this.props.clearCartAction();
      this.props.push('/orders');
    }
  }

  onClearCart() {
    this.props.clearCartAction();
  }

  createOrder = (e) => {
    e.preventDefault();

    const { products, totalSum, token} = this.props;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      products[i].total_price = product.counter * product.price;
      products[i].quantity = product.counter;
    }

    const data = {
      products,
      total_price: totalSum,
      shipment_price: 100,
      shipment_method: 'courier'
    };

    this.props.createOderAction(data, token)
  };

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
        {products.length == 0 && <Message content='Пустая корзина' />}
        {products.length !== 0 && <Grid.Row stretched className='head-row'>
            <Grid.Column>
              Итого: <span color='orange'>{ totalSum } сом</span>
            </Grid.Column>
            <Form className='cart-bottom common-form' style={{margin: '40px auto'}}>
              <Header as='h2' style={{textAlign: 'center'}}>
                Выбор оплаты
              </Header>
              <Form.Input label='Способ оплаты' readOnly value='Наличными курьеру'/>
              <div className='cart-info'>
                <div className=''>
                  Корзина: { totalSum } сом
                </div>
                <div className=''>
                  Доставка: 100 сом
                </div>
                <div className='' style={{color: '#f68236'}}>
                  <strong>Итого: { totalSum + 100 } сом</strong>
                </div>
              </div>
              <Button color='orange' content='Оформить заказ' onClick={this.createOrder} className='confirm-cart' style={{display: 'block', marign: '0 auto'}}/>
            </Form>
          </Grid.Row>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const products = state.cart.get('products').toArray();
  const totalSum = state.cart.get('totalSum');
  const order = state.cart.get('order');
  const token = state.auth.token;

  return {
    products,
    token,
    totalSum,
    order
  };
}

export default connect(mapStateToProps, {push, clearCartAction, createOderAction})(Cart);