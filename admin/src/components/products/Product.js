import React from 'react';
import { Form, Input, Select, Button, Image } from 'semantic-ui-react';
import uploadImg from '../../img/icon-upload.png';

export default class extends React.Component {
  render() {
    return (
      <div className='main product'>
        <h1 className='title title--primary'>Создание товара</h1>
        <h3 className='title title--secondary'>Здесь вы можете забить необходимые поля для описания товара</h3>

        <Form className='common-form'>
          <Form.Input label='Наименование товара' type='text' />
          <Form.Field label='Категория товара' control='select'>
            <option value='male'>Хоз. товары</option>
            <option value='female'>Мыломойка</option>
          </Form.Field>
          <Form.Input label='Артикуль (штрих-код)' type='text' />
          <div className='field field-double'>
            <Form.Input label='Количество' type='number' />
            <Form.Input label='Дата-производства' type='date' />
          </div>
          <div className='field field-double'>
            <Form.Input label='Срок хранения' type='date' />
            <Form.Input label='Вес' type='number' step='any' />
          </div>
          <div className='field field-double'>
            <Form.Input label='Объем' type='text' />
            <Form.Input label='Цена' type='number' />
          </div>
          <Form.Field className='image-uploads'>
            <button className='image-uploads__uploader' type='button'>
              <Image src={uploadImg} />
            </button>
            <button className='image-uploads__uploader' type='button'>
              <Image src={uploadImg} />
            </button>
            <button className='image-uploads__uploader' type='button'>
              <Image src={uploadImg} />
            </button>
            <button className='image-uploads__uploader' type='button'>
              <Image src={uploadImg} />
            </button>
            <button className='image-uploads__uploader' type='button'>
              <Image src={uploadImg} />
            </button>
          </Form.Field>
          <Form.Field className='text-center'>
            <Button content='Создать' color='orange' onClick={this.submitAuth} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}