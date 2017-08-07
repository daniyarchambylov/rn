import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import { getOrders as getOrdersAction, getOrderProducts as getOrderProductsAction } from '../../actions/orders/creators/orders';
import noPhoto from '../../img/no-photo.png';
import Pagination from 'react-js-pagination';
import Order from './Order';

class OrdersList extends React.Component {
  static PropTypes = {
    getOrdersAction: PropTypes.func.isRequired,
    getOrderProductsAction: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      activePage: 1,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const {token, role} = this.props;
    this.props.getOrdersAction(token, role === 'storehouse')
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    const {token, role} = this.props;
    const orders = Object.values(this.props.orders);

    return (
      <div className='main'>
        <h1 className='title title--primary'>Список заказов</h1>

        <Grid columns='equal' className='list orders' celled='internally'>
          <Grid.Row stretched className='head-row'>
            <Grid.Column>
              Номер заказа
            </Grid.Column>
            <Grid.Column>
              Дата заказа
            </Grid.Column>
            {role === 'storehouse' && <Grid.Column>
              Торговая точка
            </Grid.Column>}
            <Grid.Column width={6}>
              Товары
            </Grid.Column>
            <Grid.Column>
              Статус
            </Grid.Column>
            <Grid.Column>
              Дата отправки
            </Grid.Column>
            <Grid.Column>
              Общая сумма
            </Grid.Column>
          </Grid.Row>
          {orders.length > 0 && orders.reverse().map((order, index) => {
            return <Order order={order} key={index} token={token} isStoreHouse={role === 'storehouse'} getOrderProductsAction={this.props.getOrderProductsAction} />
          })}
        </Grid>

        {/*<Pagination*/}
          {/*activePage={this.state.activePage}*/}
          {/*itemsCountPerPage={10}*/}
          {/*totalItemsCount={450}*/}
          {/*pageRangeDisplayed={5}*/}
          {/*prevPageText='<'*/}
          {/*nextPageText='>'*/}
          {/*onChange={this.handlePageChange}*/}
        {/*/>*/}
      </div>
    )
  }
}

function mapToProps(state) {
  return {
    token: state.auth.token,
    orders: state.orders.orders,
    role: state.auth.profile.role,
  }
}

export default connect(mapToProps, {
  getOrdersAction,
  getOrderProductsAction,
})(OrdersList);