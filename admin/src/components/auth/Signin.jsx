import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { Form, Input, Button } from 'semantic-ui-react';
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


    this.props.dispatch(this.props.getSignInAction({phone, password}))
      .then(() => {
        this.props.dispatch(push(this.props.redirectTo));
      });
  }

  render() {
    return (
      <div className='auth'>
        <Form className='auth__form'>
          <Form.Input label='Введите телефон' type='phone' />
          <Form.Field>
            <label>Введите пароль <a href="#" className='forget-password'>Забыли пароль?</a></label>
            <Input type='password' />
          </Form.Field>
          <Form.Field className='text-center'>
            <Button content='Вход' color='orange' onClick={this.submitAuth} />
            <a href="#" className='registration-btn'>Зарегистрироваться</a>
          </Form.Field>
        </Form>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.signedIn,
    redirectTo: state.auth.redirectTo || '/',
    getSignInAction,
  };
}

export default connect(mapStateToProps)(SignIn);
