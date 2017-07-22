import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'semantic-ui-react';

class Signup extends React.Component {
  render() {
    return (
      <div className='auth'>
        <Form className='auth__form'>
          <Form.Input label='Введите телефон' type='phone' name='phone' onChange={this.onChangeInput} />
          <Form.Field>
            <label>Введите пароль <a href="#" className='forget-password'>Забыли пароль?</a></label>
            <Input type='password' name='password' onChange={this.onChangeInput} />
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
    ...state
  };
}

export default connect(mapStateToProps)(Signup);