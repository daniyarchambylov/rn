import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Grid, Image } from 'semantic-ui-react';
import noPhoto from '../../img/no-photo.png';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import API from '../../api';

class ProductsReport extends React.Component {
  static PropTypes = {
    token: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      activePage: 1,
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
      products: [],
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.fetchReports();
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  onStartDateChange = (e, i) => {
    this.setState({ startDate: i.value }, () => this.fetchReports())
  };

  onEndDateChange = (e, i) => {
    this.setState({ endDate: i.value }, () => this.fetchReports())
  };

  fetchReports = () => {
    const {token} = this.props;
    API.fetch(`/products-report/?start_date=${this.state.startDate}&end_date=${this.state.endDate}`, null, { token })
      .then(products => this.setState({ products }))
    ;
  };

  render() {
    const {token} = this.props;
    const {products} = this.state;

    return (
      <div className='main'>
        <h1 className='title title--primary'>Отчет продаж</h1>
        <Form className='common-form'>
          <div className='field field-double'>
            <Form.Input label={'От'} type='date' name='start_date' onChange={this.onStartDateChange} />
            <Form.Input label={'До'} type='date' name='end_date' onChange={this.onEndDateChange} />
          </div>
        </Form>
        <Grid columns='equal' className='list orders' celled='internally'>
          <Grid.Row stretched className='head-row'>
            <Grid.Column>Название товарв</Grid.Column>
            <Grid.Column>Артикул</Grid.Column>
            <Grid.Column>Количество</Grid.Column>
            <Grid.Column>Общая сумма</Grid.Column>
            <Grid.Column>Покупатель</Grid.Column>
            <Grid.Column>Номер покупателя</Grid.Column>
          </Grid.Row>
          {products.length > 0 && products.map((order, index) => {
            return (
              <Grid.Row stretched>
                <Grid.Column>
                  {order.title}
                </Grid.Column>
                <Grid.Column>
                  {order.code}
                </Grid.Column>
                <Grid.Column>
                  {order.quantity}
                </Grid.Column>
                <Grid.Column>
                  <strong>{order.total_price}</strong>
                </Grid.Column>
                <Grid.Column>
                  {order.user_name}
                </Grid.Column>
                <Grid.Column>
                  {order.user_phone}
                </Grid.Column>
              </Grid.Row>
            )
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
  }
}

export default connect(mapToProps, {
})(ProductsReport);