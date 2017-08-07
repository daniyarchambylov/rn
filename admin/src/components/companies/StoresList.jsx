import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import UserItem from "./UserItem"
import {connect} from "react-redux"
import {getStores as getStoresAction} from '../../actions/users/creators/users'

class StoresList extends React.Component {
  static PropTypes = {
    getStoresAction: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = {
      activePage: 1,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.getStoresAction(this.props.token);
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  renderStores = () => Object.values(this.props.stores).map((store, ind) => <UserItem user={store} key={ind} />);

  render() {
    return (
      <div className='main'>
        <h1 className='title title--primary'>Список торговых точек</h1>

        <Grid columns='equal' className='companies list' celled='internally'>
          <Grid.Row stretched className='head-row'>
            <Grid.Column className='companies__title'>Название</Grid.Column>
            <Grid.Column>Телефон</Grid.Column>
            <Grid.Column>Город</Grid.Column>
            <Grid.Column>Адрес</Grid.Column>
          </Grid.Row>
          {this.renderStores()}
        </Grid>

        {/*<Pagination*/}
          {/*activePage={this.state.activePage}*/}
          {/*itemsCountPerPage={10}*/}
          {/*totalItemsCount={450}*/}
          {/*pageRangeDisplayed={5}*/}
          {/*prevPageText='<'*/}
          {/*nextPageText='>'*/}
          {/*onChange={this.handlePageChange}*/}
          {/**/}
        {/*/>*/}
      </div>
    )
  }
}

export default connect((state) => ({
  token: state.auth.token,
  stores: state.users.get('stores').toJS(),
}), {
  getStoresAction,
})(StoresList)
