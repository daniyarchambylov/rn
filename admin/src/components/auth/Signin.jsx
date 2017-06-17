import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    this.props.getSignInAction({phone, password});
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

function mapToProps(state) {
  return {
    ...state
  }
}

export default connect(mapToProps, {getSignInAction})(SignIn);
