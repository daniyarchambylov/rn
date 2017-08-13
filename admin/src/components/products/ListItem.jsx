import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Grid, Image, Button} from 'semantic-ui-react';
import noPhoto from '../../img/no-photo.png';

class ListItem extends React.Component {
  static PropTypes = {
    product: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    submitClick: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired,
    role: React.PropTypes.string.isRequired,
    hideQuantity: React.PropTypes.boolean,
  };

  constructor(props) {
    super(props);

    this.addToBasket = this.addToBasket.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  addToBasket() {
    const product = this.props.product;
    this.props.submitClick(this.props.product);
  }

  onItemClick() {
    const {role} = this.props;
    if (role === 'storehouse') {
      this.props.push(`/products/${this.props.product.id}`);
    }
  }

  render() {
    const {product, index, role} = this.props;
    return (
      <Grid.Row stretched key={index} style={{cursor: 'pointer'}}>
        <Grid.Column className='companies__title' onClick={this.onItemClick}>
          <div>
            <Image src={product.image || noPhoto} verticalAlign='middle' className='product-image' />
          </div>
        </Grid.Column>
        <Grid.Column className='companies__info'>
          <Grid.Row stretched>
            <Grid.Column onClick={this.onItemClick}>
              <div><span className='mobile-only'>Дата про-во:</span> {product.created_on}</div>
              <div><span className='mobile-only'>Наименование:</span> <strong>{product.title}</strong></div>
              <div><span className='mobile-only'>Арт.:</span> Арт. {product.code}</div>
            </Grid.Column>
            {!this.props.hideQuantity && <Grid.Column onClick={this.onItemClick}>
              <span className='mobile-only'>кол-во:</span> {product.quantity}
            </Grid.Column>}
            <Grid.Column onClick={this.onItemClick}>
              <span className='mobile-only'>цена:</span> {product.price} сом.
            </Grid.Column>
            {role === 'store' && <Grid.Column>
              <Button content='В корзину' color='orange' className='add-to-basket-btn' onClick={this.addToBasket}/>
            </Grid.Column>}
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default connect(null, { push })(ListItem);