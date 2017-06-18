import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

import noPhoto from '../../img/no-photo.png';
import Pagination from 'react-js-pagination';

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

        <Grid columns='equal' className='companies list' celled='internally'>
          <Grid.Row stretched className='head-row'>
            <Grid.Column className='companies__title'>
              Название
            </Grid.Column>
            <Grid.Column>
              Город
            </Grid.Column>
            <Grid.Column>
              Адрес
            </Grid.Column>
            <Grid.Column>
              Категории
            </Grid.Column>
          </Grid.Row>

          <Grid.Row stretched>
            <Grid.Column className='companies__title'>
              <div>
                <Image src={noPhoto} verticalAlign='middle' /> <span>Coca-Cola Bottlers.</span>
              </div>
            </Grid.Column>
            <Grid.Column>
              Бишкек
            </Grid.Column>
            <Grid.Column>
              Советская 176
            </Grid.Column>
            <Grid.Column>
              Мыломойка, хоз. товары
            </Grid.Column>
          </Grid.Row>

          <Grid.Row stretched>
            <Grid.Column className='companies__title'>
              <div>
                <Image src={noPhoto} verticalAlign='middle' /> <span>Coca-Cola Bottlers.</span>
              </div>
            </Grid.Column>
            <Grid.Column>
              Бишкек
            </Grid.Column>
            <Grid.Column>
              Советская 176
            </Grid.Column>
            <Grid.Column>
              Мыломойка, хоз. товары
            </Grid.Column>
          </Grid.Row>
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