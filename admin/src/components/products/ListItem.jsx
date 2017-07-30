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
    this.props.push(`/products/${this.props.product.id}`);
  }

  render() {
    const {product, index, role} = this.props;
    console.log(this.props.hideQuantity)
    return (
      <Grid.Row stretched key={index} style={{cursor: 'pointer'}}>
        <Grid.Column className='companies__title' onClick={this.onItemClick}>
          <div>
            <Image src={product.image || noPhoto} verticalAlign='middle' className='product-image' />
          </div>
        </Grid.Column>
        <Grid.Column onClick={this.onItemClick}>
          <div>{product.created_on}</div>
          <div><strong>{product.title}</strong></div>
          <div>Арт. {product.code}</div>
        </Grid.Column>
        {!this.props.hideQuantity && <Grid.Column onClick={this.onItemClick}>
          {product.quantity}
        </Grid.Column>}
        <Grid.Column onClick={this.onItemClick}>
          {product.price} сом.
        </Grid.Column>
        {role === 'store' && <Grid.Column>
          <Button content='В корзину' color='orange' className='add-to-basket-btn' onClick={this.addToBasket}/>
        </Grid.Column>}
      </Grid.Row>
    )
  }
}

export default connect(null, { push })(ListItem);