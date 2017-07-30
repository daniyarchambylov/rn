import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Grid, Image } from 'semantic-ui-react';

export default class extends React.Component {
  static PropTypes = {
    getOrderProductsAction: React.PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.showOrderClick = this.showOrderClick.bind(this);

    this.state = {
      show: false,
      isFetched: false,
      products: [],
    }
  }

  showOrderClick() {
    const { show, isFetched } = this.state;
    const {getOrderProductsAction, order, token} = this.props

    if (!isFetched) {
      getOrderProductsAction(order.id, token)
        .then((data) => {
          this.setState({
            show: !show,
            isFetched: true,
            products: data,
          })
        })
    } else {
      this.setState({
        show: !show
      });
    }
  }

  renderProducts = () =>
    this.state.products.map(product => (
      <div className='order-item' key={product.id}>
        <Image src={product.image} verticalAlign='top'/>
        &nbsp;
        <span>
          <span className='product-name'>{product.title}</span>
          &nbsp;
          Арт.: <strong>{product.code}</strong>
          &nbsp;
          Кол-во: <strong>{product.quantity}</strong>

        </span>
      </div>
    ));



  render() {
    const {order} = this.props;
    const {show} = this.state;
    const btnString = show ? 'Свернуть' : 'Развернуть';

    return (
      <Grid.Row stretched>
        <Grid.Column>
          {order.id}
        </Grid.Column>
        <Grid.Column>
          {moment(order.created).format('YYYY.MM.DD HH:mm')}
        </Grid.Column>
        <Grid.Column>
          {order.user_name}
        </Grid.Column>
        <Grid.Column width={6}>
          {show && <div className='order-items'>
            {this.renderProducts()}
          </div>}
          <button className='btn--transparent btn-order-toggle' onClick={this.showOrderClick}>{btnString}</button>
        </Grid.Column>
        <Grid.Column>
          <strong>
            Обрабатывается
          </strong>
        </Grid.Column>
        <Grid.Column>
          {order.shipment_date}
        </Grid.Column>
        <Grid.Column>
          {order.total_price}
        </Grid.Column>
      </Grid.Row>
    )
  }
}
