import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import {getSignIn as getSignInAction} from '../../actions/auth/creators/signIn';

class SignIn extends React.Component {
  static PropTypes = {
    getSignInAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.submitAuth = this.submitAuth.bind(this);
  }

  submitAuth(e) {
    e.preventDefault();
    const phone = '996555992938';
    const password = 'qwerty';
    this.props.getSignInAction({phone, password});
  }

  render() {
    return (
      <Form>
        <Form.Input label='Enter phone' type='phone' />
        <Form.Input label='Enter password' type='phone' />
        <Form.Button content='Confirm' onClick={this.submitAuth} />
      </Form>
    )
  }
}

function mapToProps(state) {
  return {
    ...state
  }
}

export default connect(mapToProps, {getSignInAction})(SignIn);
