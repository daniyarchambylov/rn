import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { Form, Input, Button, Message } from 'semantic-ui-react';
import {getSignIn as getSignInAction} from '../../actions/auth/creators/signIn';

class SignIn extends React.Component {
  static PropTypes = {
    getSignInAction: PropTypes.func.isRequired,
    errors: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.submitAuth = this.submitAuth.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);

    this.state = {
      phone: null,
      password: null
    }
  }

  submitAuth(e) {
    e.preventDefault();
    const {phone, password} = this.state;

    console.log(phone, password);


    this.props.dispatch(this.props.getSignInAction({phone, password}))
      .then(() => {
        this.props.dispatch(push(this.props.redirectTo));
      });
  }

  onChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {errors} = this.props;
    const errorMessages = Object.keys(errors);
    return (
      <div className='auth'>
        <Form className='auth__form'>
          {errorMessages.length > 0 && <Message error style={{display: 'block'}}>Проверьте правильность введенных данных</Message>}
          <Form.Input error={ !!errors.phone || !!errors.non_field_errors } label='Введите телефон' type='phone' name='phone'
                      onChange={this.onChangeInput}
                      placeholder='996555123456' />
          <Form.Field>
            <label>Введите пароль <a href="#" className='forget-password'>Забыли пароль?</a></label>
            <Input type='password' error={ !!errors.password || !!errors.non_field_errors } name='password' onChange={this.onChangeInput} />
          </Form.Field>
          <Form.Field className='text-center'>
            <Button content='Вход' color='orange' onClick={this.submitAuth} />
            <Link className='registration-btn' to='/sign-up'>
              Зарегистрироваться
            </Link>
          </Form.Field>
        </Form>
      </div>

    )
  }
}

function mapStateToProps(state) {
  const errors = state.errors['sign-in/'] || {};
  return {
    isSignedIn: state.auth.signedIn,
    redirectTo: state.auth.redirectTo,
    errors,
    getSignInAction,
  };
}

export default connect(mapStateToProps)(SignIn);
