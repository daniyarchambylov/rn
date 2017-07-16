import React from 'react';
import {Grid, Form, Image, Icon, Input} from 'semantic-ui-react';
import noPhoto from '../../img/no-photo.png';

export default class extends React.Component {
  static PropTypes = {
    product: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    removeClick: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.quantityChange = this.quantityChange.bind(this);

    this.state = {
      quantity: 1
    };
  }

  quantityChange(e, target) {
    const value = target.value;

    this.setState({
      quantity: value
    });
  }

  onClick() {
    this.props.removeClick(this.props.product.id);
  }

  render() {
    const {product, index} = this.props;
    const {quantity} = this.state;

    return (
      <Grid.Row stretched key={index} style={{cursor: 'pointer'}}>
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
          <Form.Field>
            <Input value={quantity} type='number' onChange={this.quantityChange}/>
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          {product.price} сом.
        </Grid.Column>
        <Grid.Column>
          <Icon content='В корзину' color='gray' className='add-to-basket-btn' size='large' name='close' onClick={this.onClick}/>
        </Grid.Column>
      </Grid.Row>
    )
  }
}
