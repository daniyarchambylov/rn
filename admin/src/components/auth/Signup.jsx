import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Input, Button, Message} from 'semantic-ui-react';
import {signUp as signUpAction} from '../../actions/auth/creators/signIn';
import { push as pushAction } from 'react-router-redux';

class Signup extends React.Component {
  static PropTypes = {
    signUpAction: PropTypes.func.isRequired,
    errors: PropTypes.any,
    pushAction: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      phone: null,
      password: null,
      phoneError: false,
      passwordError: false
    }
  }

  componentDidMount() {
    if (this.props.token !== undefined) {
      this.props.pushAction(this.props.redirectTo);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== undefined) {
      nextProps.pushAction(nextProps.redirectTo);
    }
  }

  onChange = (e, target) => {
    this.setState({
      [target.name]: target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {phone, password} = this.state;
    this.props.signUpAction({phone, password});
  };

  render() {
    const { errors } = this.props;

    const errorMessages = Object.keys(errors);

    return (
      <div className='auth'>
        <Form className='auth__form'>
          {errorMessages.length > 0 && <Message error style={{display: 'block'}}>Проверьте правильность введенных данных</Message>}
          <Form.Input label='Телефон' error={ !!errors.phone } type='tel' name='phone' onChange={this.onChange} placeholder='996555123456'/>
          <Form.Input label='Пароль' error={ !!errors.password } type='password' name='password' onChange={this.onChange}/>
          <Form.Field className='text-center'>
            <Button content='Зарегистрироваться' color='orange' onClick={this.onSubmit} />
            <a href="#" className='registration-btn'>Авторизоваться</a>
          </Form.Field>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const errors = state.errors['sign-up/'] || {};
  const { token, redirectTo } = state.auth;

  console.log(redirectTo)
  return {
    errors,
    token,
    redirectTo,
  };
}

export default connect(mapStateToProps, {
  signUpAction,
  pushAction,
})(Signup);