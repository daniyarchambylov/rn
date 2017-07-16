import React from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import noPhoto from '../../img/no-photo.png';


export default class extends React.Component {
  static PropTypes = {
    product: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    submitClick: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.submitClick(this.props.product);
  }

  render() {
    const {product, index} = this.props;

    return (
      <Grid.Row stretched key={index} onClick={this.onClick} style={{cursor: 'pointer'}}>
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
}
