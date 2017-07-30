import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import UserItem from "./UserItem"
import {connect} from "react-redux"
import { push } from 'react-router-redux';
import {getCompanies as getCompaniesAction} from '../../actions/users/creators/users'

class CompaniesList extends React.Component {
  static PropTypes = {
    getCompaniesAction: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      activePage: 1,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.getCompaniesAction()
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  renderCompanies = () => {
    const { companies, push } = this.props;
    return Object.values(companies).map((company, ind) => <UserItem user={company} key={ind} push={push} url={`/companies/${company.id}/products`} />);  }

  render() {
    return (
      <div className='main'>
        <h1 className='title title--primary'>Список фирм</h1>

        <Grid columns='equal' className='companies list' celled='internally'>
          <Grid.Row stretched className='head-row'>
            <Grid.Column className='companies__title'>Название</Grid.Column>
            <Grid.Column>Телефон</Grid.Column>
            <Grid.Column>Город</Grid.Column>
            <Grid.Column>Адрес</Grid.Column>
          </Grid.Row>
          {this.renderCompanies()}
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
  companies: state.users.get('companies').toJS(),
}), {
  getCompaniesAction,
  push,
})(CompaniesList)
