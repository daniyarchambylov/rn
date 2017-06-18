import React from 'react';
import { Grid, Image, Form } from 'semantic-ui-react';
import noPhoto from '../../img/no-photo.png';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.showOrderClick = this.showOrderClick.bind(this);

    this.state = {
      show: false
    }
  }

  showOrderClick() {
    this.setState({
      show: !this.state.show
    })
  }


  render() {
    const {show} = this.state;
    const btnString = show ? 'Свернуть' : 'Развернуть';

    const options = [
      {key: 'init', value: 'init', text: 'В процессе'},
      {key: 'paid', value: 'paid', text: 'Оплачен'},
      {key: 'cancel', value: 'cancel', text: 'Отменить'}
    ]

    return (
      <Grid.Row stretched>
        <Grid.Column>
          123
        </Grid.Column>
        <Grid.Column>
          27.06.2017 16:31
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid.Column width={6}>
            {show && <div className='order-items'>
              <div className='order-item'>
                <Image src={noPhoto} verticalAlign='top' /> <span><span className='product-name'>Coca-Cola Bottlers.</span> Арт.: <strong>123123</strong></span>
              </div>
            </div>}
            <button className='btn--transparent btn-order-toggle' onClick={this.showOrderClick}>{btnString}</button>
          </Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <Form className='order-status order-status--paid'>
            <Form.Field control='select'>
              {options.map((item, index) => {
                return (
                  <option key={index} value={item.value}>{item.text}</option>
                )
              })}
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column>
          29.06.2017 09:31
        </Grid.Column>
        <Grid.Column>
          3000
        </Grid.Column>
      </Grid.Row>

    )
  }
}