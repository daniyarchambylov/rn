import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Checkbox, Button} from 'semantic-ui-react'
import { saveCitiesSettings } from '../../actions/location/creators/location';

class UserProfile extends React.Component {
  static PropTypes = {
    saveCitiesSettings: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const filtered_cities = {};
    this.props.filtered_cities.forEach(x => filtered_cities[x] = {id: x, checked: true});
    this.state = {
      filtered_cities,
    };
  }

  onChange = (e, x) => {
    this.setState({
      filtered_cities: {
        ...this.state.filtered_cities,
        [x.value]: {
          checked: x.checked,
          id: x.value,
        },
      }
    });

  };


  onSubmit = (e) => {
    e.preventDefault();
    const { filtered_cities } = this.state;
    const { saveCitiesSettings, token } = this.props;
    saveCitiesSettings(token, Object.values(filtered_cities).filter(x => x.checked).map(x => x.id));
  };

  renderCities(cities) {
    const items = [];
    let { filtered_cities } = this.state;
    filtered_cities = Object.keys(filtered_cities).map(x => +x)

    cities.forEach(city => {
      const regions = Object.values(city.regions);

      if (regions.length > 0) {
        items.push(<div className='field field-label' style={{display: 'block' }}><div className='ui'>{city.text}</div></div>);

        const withBlocks = regions.filter(x => Object.values(x.blocks).length > 0);
        const withOutBlocks = regions.filter(x => Object.values(x.blocks).length === 0);

        items.push(
          withOutBlocks.map(region => <Form.Checkbox value={region.value} label={region.text}  onChange={this.onChange} defaultChecked={filtered_cities.includes(region.value)} />)
        );

        withBlocks.forEach(region => {
          items.push(<div className='field field-label'  style={{display: 'block' }}><div className='ui'>{region.text}</div></div>)
          items.push(Object.values(region.blocks).map(block => <Form.Checkbox value={block.value} label={block.text} defaultChecked={filtered_cities.includes(block.value)} onChange={this.onChange} />));
        });

      } else {
        items.push(<Form.Checkbox label={city.text} onChange={this.onChange} defaultChecked={filtered_cities.includes(city.value)} />)
      }

    });
    return items;
  }

  render() {
    const { location }  = this.props;
    const cities =  Object.values(location);
    if (cities.length < 1) return null;
    return (
      <div className='main main-location-settings location-settings'>
        <h1 className='title title--primary'>Выбрать локации</h1>
        <Form className='common-form'>
          {this.renderCities(cities)}
          <div className='field'>

          </div>
          {/*<Form.Radio label='Нужна ли накладная?' toggle />*/}
          <Form.Field className='text-center' style={ { display: 'block' }}>
            <Button content='Сохранить' color='orange' onClick={this.onSubmit} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}

function mapToProps(state) {
  const token = state.auth.token;
  const filtered_cities = state.auth.profile.filtered_cities;
  const { location } = state.locations;
  return {
    token,
    filtered_cities,
    location,
  }
}

export default connect(mapToProps, {
  saveCitiesSettings,
})(UserProfile);
