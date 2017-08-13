import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Grid, Image } from 'semantic-ui-react';

export default class extends React.Component {
  static PropTypes = {
    getOrderProductsAction: React.PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    isStoreHouse: PropTypes.bool.isRequired,
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
    const {order, isStoreHouse} = this.props;
    const {show} = this.state;
    const btnString = show ? 'Свернуть' : 'Развернуть';

    return (
      <Grid.Row stretched>
        <Grid.Column>
          <Grid.Row stretched className='orders__column-row'>
            <Grid.Column className='orders__id'>
              <span className='mobile-only'># заказа:</span> {order.id}
            </Grid.Column>
            <Grid.Column>
              <span className='mobile-only'>дата заказа:</span> {moment(order.created).format('YYYY.MM.DD HH:mm')}
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row stretched className='orders__column-row'>
            {isStoreHouse && <Grid.Column>
              <span className='mobile-only'>торг. точка:</span> {order.user_name}
            </Grid.Column>}
            <Grid.Column>
              <strong>
                <span className='mobile-only'>статус:</span> Обрабатывается
              </strong>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column className='orders__products'>
          <Grid.Row stretched className='orders__column-row orders__column-row--products'>
            <Grid.Column>
              {show && <div className='order-items'>
                {this.renderProducts()}
              </div>}
              <button className='btn--transparent btn-order-toggle' onClick={this.showOrderClick}>{btnString}</button>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row stretched className='orders__column-row'>
            <Grid.Column>
              <span className='mobile-only'>Дата отпр.:</span> {order.shipment_date}
            </Grid.Column>
            <Grid.Column>
              <span className='mobile-only'>Общ. сумма:</span> {order.total_price}
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    )
  }
}
