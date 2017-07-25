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
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      product: this.props.product,
    };
  }

  onControlChange(e, target) {
    const {product} = this.state;
    product[target.name] = target.value
    this.setState({
      product
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmitProduct(this.state.product);
  }

  renderInput(label, type, name, value) {
    return (
      <Form.Input label={label} type={type} name={name} onChange={this.onControlChange} defaultValue={value}/>
    );
  }

  render() {
    const { product } = this.props;

    return (
      <Form className='common-form'>
        {this.renderInput('Наименование товара', 'text', 'title', product.title)}
        <Form.Field >
          <label>Категория товара</label>
          <Select placeholder='Выберите категорию' options={categories} onChange={this.onControlChange} name='category' defaultValue={product.category || ''}/>
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
        <Form.Field className='text-center'>
          <Button content='Далее' color='orange' onClick={this.onSubmit}/>
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
