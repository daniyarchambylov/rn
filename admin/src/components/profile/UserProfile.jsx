import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class extends React.Component {
  render() {
    return (
      <div className='main product'>
        <h1 className='title title--primary'>Редактирование профиля</h1>
        <h3 className='title title--secondary'>Здесь вы можете отредактировать ранее заполненные поля</h3>

        <Form className='common-form'>
          <div className='field field-double'>
            <Form.Input label='Имя' type='text' />
            <Form.Input label='Фамилия' type='text' />
          </div>
          <Form.Input label='Название компании' type='text' />
          <Form.Input label='Адрес доставки' type='text' />
          <div className='field field-double'>
            <Form.Input label='Город' type='text' />
            <Form.Input label='Почтовый индекс' type='text' />
          </div>
          <div className='field field-double'>
            <Form.Input label='Номер телефона' type='phone' />
            <Form.Input label='email' type='email' />
          </div>
          <Form.Radio label='Нужна ли накладная?' toggle />
          <Form.Field className='text-center'>
            <Button content='Сохранить' color='orange' onClick={this.submitAuth} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}