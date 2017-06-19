import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { redirectOnSignIn } from '../actions/auth/creators/signIn';
import LazilyLoad, { importLazy } from '../components/LazyLoad';

class SignedInContainer extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL, isSignedIn } = this.props;

    if (!isSignedIn) {
      dispatch(redirectOnSignIn(currentURL));
      dispatch(push('/sign-in'));
    }
  }

  render() {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      return <div style={{ display: 'flex' }}>
        <LazilyLoad modules={{ Sidebar: () => importLazy(import('../components/Sidebar')), }}>
          {({ Sidebar }) => (
            <Sidebar />
          )}
        </LazilyLoad>
        { this.props.children }
        </div>;
    } else {
      return null;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isSignedIn: state.auth.signedIn,
    currentURL: ownProps.location.pathname,
  }
}

SignedInContainer.PropTypes = {
  redirectOnSignIn: React.PropTypes.func.isRequired,
};


export default connect(mapStateToProps)(SignedInContainer);
