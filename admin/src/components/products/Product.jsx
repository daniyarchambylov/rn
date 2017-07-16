import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Button, Image } from 'semantic-ui-react';
import uploadImg from '../../img/icon-upload.png';


class Product extends React.Component {
  static PropTypes = {
    createProductAction: PropTypes.func.isRequired,
    getProductItemAction: PropTypes.func.isRequired,
    product: PropTypes.any,
    onSubmitProduct: PropTypes.func.isRequired,
  };

  static defaultProps = {
    product: {}
  };

  constructor(props) {
    super(props);

    this.onControlChange = this.onControlChange.bind(this);

    this.state = {
      product: this.props.product,
    };
  }

  onControlChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderInput(label, type, name, value) {
    return (
      <Form.Input label={label} type={type} name={name} onChange={this.onControlChange} value={value}/>
    );
  }

  render() {
    const { product } = this.props;
    console.log(product.category);

    return (
      <Form className='common-form'>
        {this.renderInput('Наименование товара', 'text', 'title', product.title)}
        <Form.Field >
          <label>Категория товара</label>
          <Select placeholder='Выберите категорию' options={categories} onChange={this.onControlChange} name='category' value={product.category}/>
        </Form.Field>
        {this.renderInput('Артикуль (штрих-код)', 'text', 'code', product.code)}
        <div className='field field-double'>
          {this.renderInput('Количество', 'number', 'quantity', product.quantity)}
          {this.renderInput('Дата-производства', 'date', 'created_on', product.created_on)}
        </div>
        <div className='field field-double'>
          {this.renderInput('Срок хранения', 'date', 'expires_on', product.expires_on)}
          {this.renderInput('Вес', 'number', 'weight', product.weight)}
        </div>
        <div className='field field-double'>
          {this.renderInput('Объем', 'text', 'volume', product.volume)}
          {this.renderInput('Цена', 'number', 'price', product.price)}
        </div>
        <Form.Field className='image-uploads'>
          <button className='image-uploads__uploader' type='button'>
            <Image src={uploadImg}/>
          </button>
          <button className='image-uploads__uploader' type='button'>
            <Image src={uploadImg}/>
          </button>
          <button className='image-uploads__uploader' type='button'>
            <Image src={uploadImg}/>
          </button>
          <button className='image-uploads__uploader' type='button'>
            <Image src={uploadImg}/>
          </button>
          <button className='image-uploads__uploader' type='button'>
            <Image src={uploadImg}/>
          </button>
        </Form.Field>
        <Form.Field className='text-center'>
          <Button content='Сохранить' color='orange' onClick={this.props.onSubmitProduct}/>
        </Form.Field>
      </Form>
    );
  }
}

const categories = [
  { key: 0, text: '-', value: 0 },
  { key: 1, text: 'Мыломойка', value: 1 },
  { key: 2, text: 'Хоз. товары', value: 2 },
];

export default Product;
