import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { redirectOnSignIn as redirectOnSignInAction, getProfile as getProfileAction } from '../actions/auth/creators/signIn';
import { getLocations as getLocationsAction } from '../actions/location/creators/location';
import LazilyLoad, { importLazy } from '../components/LazyLoad';

class SignedInContainer extends React.Component {
  static PropTypes = {
    getProfileAction: PropTypes.func.isRequired,
    redirectOnSignInAction: PropTypes.func.isRequired,
    pushAction: PropTypes.func.isRequired,
    getLocationsAction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { isSignedIn, getLocationsAction } = this.props;
    getLocationsAction();

    if (!isSignedIn) {
      this.handleUnauthorized()
    } else {
      this.props.getProfileAction(this.props.token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isSignedIn) {
      this.handleUnauthorized()
    }
  }

  handleUnauthorized() {
    const { currentURL, redirectOnSignInAction, pushAction } = this.props;
    redirectOnSignInAction(currentURL);
    pushAction('/sign-in');
  }

  render() {
    const { isSignedIn } = this.props;

    if (!isSignedIn) return null;
    return (
      <div style={{ display: 'flex' }}>
        <LazilyLoad modules={{ Sidebar: () => importLazy(import('../components/Sidebar')), }}>
          {({ Sidebar }) => (
            <Sidebar />
          )}
        </LazilyLoad>
        { this.props.children }
      </div>
    );

  }
}

function mapStateToProps(state, ownProps) {
  return {
    isSignedIn: state.auth.signedIn,
    token: state.auth.token,
    currentURL: ownProps.location.pathname,
  }
}

export default connect(mapStateToProps, {
  getProfileAction,
  redirectOnSignInAction,
  getLocationsAction,
  pushAction,
})(SignedInContainer);
