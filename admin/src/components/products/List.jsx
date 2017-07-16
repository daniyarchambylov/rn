import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {Grid, Image, Button} from 'semantic-ui-react';
import {getProductList as getProductListAction} from '../../actions/products/creators/product';
import {addToCart as addToCartAction} from '../../actions/cart/creators/cart';
import noPhoto from '../../img/no-photo.png';
import ListItem from './ListItem';

class List extends React.Component {
  static PropTypes = {
    products: React.PropTypes.array.isRequired,
    push: React.PropTypes.func.isRequired,
    getProductListAction: React.PropTypes.func.isRequired,
    addToCartAction: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.addToCartClick = this.addToCartClick.bind(this);
  }

  componentDidMount() {
    this.props.getProductListAction();
  }

  onClick(id, e) {
    this.props.push(`/products/${id}`);
  }

  addToCartClick(data) {
    this.props.addToCartAction(data);
  }

  render() {
    const {products} = this.props;

    return (
      <div className='main'>
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
            <Grid.Column>
              &nbsp;
            </Grid.Column>
          </Grid.Row>
          {products.map((p, index) => <ListItem product={p} index={index} submitClick={this.addToCartClick} />)}
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const products = state.products.get('products');

  return {
    products
  };
}

export default connect(mapStateToProps, {push, getProductListAction, addToCartAction})(List);