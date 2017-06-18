import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import noPhoto from '../../img/no-photo.png';
import Pagination from 'react-js-pagination';
import Order1 from './Order1';
import Order2 from './Order2';
import Order3 from './Order3';

export default class extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      activePage: 1,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    return (
      <div className='main'>
        <h1 className='title title--primary'>Список торговых точек</h1>

        <Grid columns='equal' className='list orders' celled='internally'>
          <Grid.Row stretched className='head-row'>
            <Grid.Column>
              Номер заказа
            </Grid.Column>
            <Grid.Column>
              Дата заказа
            </Grid.Column>
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
          <Order1 />
          <Order2 />
          <Order3 />
          <Order3 />
        </Grid>

        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          prevPageText='<'
          nextPageText='>'
          onChange={this.handlePageChange}
        />
      </div>
    )
  }
}