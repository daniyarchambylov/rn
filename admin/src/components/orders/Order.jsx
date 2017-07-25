import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Grid, Image } from 'semantic-ui-react';
import noPhoto from '../../img/no-photo.png';

export default class extends React.Component {
  static PropTypes = {
    order: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.showOrderClick = this.showOrderClick.bind(this);

    this.state = {
      show: false
    }
  }

  showOrderClick() {
    this.setState({
      show: !this.state.show
    })
  }


  render() {
    const {order} = this.props;
    const {show} = this.state;
    const btnString = show ? 'Свернуть' : 'Развернуть';
    console.log(moment(order.created).format('YYYY'));

    return (
      <Grid.Row stretched>
        <Grid.Column>
          {order.id}
        </Grid.Column>
        <Grid.Column>
          {moment(order.created).format('YYYY.MM.DD HH:mm')}
        </Grid.Column>
        <Grid.Column width={6}>
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