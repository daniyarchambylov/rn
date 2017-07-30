import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {Grid, Dimmer, Icon, Header, Modal, Button, Message} from 'semantic-ui-react';
import {getProductList as getProductListAction, dismissMessage as dismissMessageAction} from '../../actions/products/creators/product';
import {addToCart as addToCartAction} from '../../actions/cart/creators/cart';
import noPhoto from '../../img/no-photo.png';
import ListItem from './ListItem';

class List extends React.Component {
  static PropTypes = {
    products: React.PropTypes.array.isRequired,
    cartProducts: React.PropTypes.array.isRequired,
    push: React.PropTypes.func.isRequired,
    getProductListAction: React.PropTypes.func.isRequired,
    addToCartAction: React.PropTypes.func.isRequired,
    dismissMessageAction: React.PropTypes.func.isRequired,
    successMessage: React.PropTypes.string
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.addToCartClick = this.addToCartClick.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onDismissClick = this.onDismissClick.bind(this);

    this._timer = null;

    this.state = {
      showMsg: false,
      showInCartMsg: false
    }
  }

  componentDidMount() {
    this.props.getProductListAction(this.props.token);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.cartProducts !== nextProps.cartProducts) {
      this.setTimer();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  onClick(id, e) {
    this.props.push(`/products/${id}`);
  }

  addToCartClick(data) {
    const id = data.id;
    const isInCart = this.props.cartProducts.has(id);

    if (!isInCart) {
      this.props.addToCartAction(data);

      this.setState({
        showMsg: true,
        showInCartMsg: false
      })
    } else {
      this.setState({
        showInCartMsg: true
      })
    }
  }

  closeModal() {
    this.setState({
      showInCartMsg: false
    });
  }

  onDismissClick() {
    this.props.dismissMessageAction();
  }

  setTimer() {
    this._timer != null ? clearTimeout(this._timer) : null;

    this._timer = setTimeout(function(){
      this.setState({showMsg: false});
      this._timer = null;
    }.bind(this), 1000);
  }

  render() {
    const {products, successMessage, role} = this.props;
    const {showMsg, showInCartMsg} = this.state;

    return (
      <div className='main'>
        {successMessage && <Message positive onDismiss={this.onDismissClick}>{successMessage}</Message>}
        <Dimmer active={showMsg}>
          <Header as='h2' icon inverted>
            <Icon name='shop' />
            Товар добавлен в корзину
          </Header>
        </Dimmer>
        <Modal open={showInCartMsg} basic size='small'>
          <Header icon='archive' content='Товар уже добавлен в корзину' />
          <Modal.Actions>
            <Button color='green' inverted onClick={this.closeModal}>
              <Icon name='checkmark' /> ок
            </Button>
          </Modal.Actions>
        </Modal>

        <h1 className='title title--primary'>Список товаров</h1>
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
              Цена
            </Grid.Column>
            {role === 'store' && <Grid.Column>
              &nbsp;
            </Grid.Column>}
          </Grid.Row>
          {products.map((p, index) => <ListItem product={p} index={index} role={this.props.role} submitClick={this.addToCartClick} />)}
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const products = state.products.get('products');
  const cartProducts = state.cart.get('products');
  const successMessage = state.products.get('successMessage');
  const token = state.auth.token;
  const role = state.auth.profile.role;

  return {
    products,
    cartProducts,
    successMessage,
    token,
    role,
  };
}

export default connect(mapStateToProps, {push, getProductListAction, addToCartAction, dismissMessageAction})(List);