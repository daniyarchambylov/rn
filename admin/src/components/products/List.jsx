import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {Grid, Image, Button} from 'semantic-ui-react';
import {getProductList as getProductListAction} from '../../actions/products/creators/product';
import noPhoto from '../../img/no-photo.png';

class List extends React.Component {
  static PropTypes = {
    products: React.PropTypes.array.isRequired,
    push: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getProductListAction();
  }

  onClick(id, e) {
    this.props.push(`/products/${id}`);
  }

  renderItem(product, index) {
    const click = this.onClick.bind(this, product.id);

    return (
      <Grid.Row stretched key={index} onClick={click} style={{cursor: 'pointer'}}>
        <Grid.Column className='companies__title'>
          <div>
            <Image src={noPhoto} verticalAlign='middle' />
          </div>
        </Grid.Column>
        <Grid.Column>
          <div>{product.created_on}</div>
          <div><strong>{product.title}</strong></div>
          <div>Арт. {product.code}</div>
        </Grid.Column>
        <Grid.Column>
          {product.quantity}
        </Grid.Column>
        <Grid.Column>
          {product.price} сом.
        </Grid.Column>
        <Grid.Column>
          <Button content='В корзину' color='orange' className='add-to-basket-btn'/>
        </Grid.Column>
      </Grid.Row>
    )
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
          {products.map((p, index) => this.renderItem(p, index))}
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

export default connect(mapStateToProps, {push, getProductListAction})(List);