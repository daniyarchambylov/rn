import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class extends React.Component {
  render() {
    return (
      <div className='main product'>
        <h1 className='title title--primary'>Контактная форма</h1>
        <h3 className='title title--secondary'>Свяжитесь с нами если у вас возникли проблемы</h3>

        <Form className='common-form'>
          <Form.Input label='Тема' type='text' />
          <div className='field field-double'>
            <Form.Input label='Имя' type='text' />
            <Form.Input label='Email' type='email' />
          </div>
          <Form.TextArea label='Текст сообщения' />
          <Form.Field className='text-center'>
            <Button content='Послать' color='orange' onClick={this.submitAuth} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}