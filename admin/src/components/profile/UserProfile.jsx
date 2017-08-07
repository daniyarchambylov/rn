import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Button, Message, Image, Select} from 'semantic-ui-react'
import {
  getProfile as getProfileAction,
  updateProfile as updateProfileAction,
  uploadImage as uploadImageAction,
} from '../../actions/auth/creators/signIn';

class UserProfile extends React.Component {
  static PropTypes = {
    getProfileAction: PropTypes.func.isRequired,
    updateProfileAction: PropTypes.func.isRequired,
    token: PropTypes.any.isRequired,
    profile: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile,
      isSaved: false,
      cities: Object.values(props.location),
      regions: [],
      blocks: [],
      locations: {},
      selectedCity: null,
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.profile !== nextProps.profile) {
      const data = { profile: nextProps.profile };

      if (this.props.profile.updated_at !== undefined && this.props.profile.updated_at !== nextProps.profile.updated_at) {
        data.isSaved = true;
      }
      this.setState({...data});
    } else if (nextProps.location !== this.props.location) {
      const cities = Object.values(nextProps.location).map(x => ({ key: x.key, value: x.value, text: x.text }));
      const regions = nextProps.profile.region ?
        Object.values(nextProps.location[nextProps.profile.city].regions) : [];
      const blocks = nextProps.profile.block ?
        Object
          .values(nextProps.location[nextProps.profile.city].regions[nextProps.profile.region].blocks)
          .map(x => ({ key: x.key, value: x.value, text: x.text })) : []
      ;
      this.setState({
        cities,
        regions,
        blocks,
        locations: nextProps.location,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.profile.updated_at !== this.state.profile.updated_at) ||
      nextState.isSaved !== this.state.isSaved ||
      nextState.cities.length !== this.state.cities.length ||
      nextState.blocks.length !== this.state.blocks.length ||
      nextState.regions.length !== this.state.regions.length;
  }

  updateLocationsState(city, region, block) {

  }

  onSubmit = (e) => {
    e.preventDefault();
    const profile = {
      ...this.state.profile,
      location: this.state.selectedCity,
    };

    delete profile.updated_at;
    delete profile.image;
    delete profile.city;
    delete profile.region;
    delete profile.block;
    this.props.updateProfileAction(this.props.token, profile);
  };

  onChange = (e, target) => {
    const {profile} = this.state;

    profile[target.name] = target.value;

    this.setState({
      profile
    });
  };

  onControlChange = (e, target) => {
    const { locations, profile } = this.state;
    const newState = {};
    switch (target.name) {
      case 'city':
        newState.regions = Object.values(locations[target.value].regions).map(x => ({ key: x.key, value: x.value, text: x.text }));
        newState.blocks = [];
        newState.selectedCity = target.value;

        profile.city = target.value;
        profile.region = null;
        profile.block = null;
        break;
      case 'region':
        newState.blocks = Object.values(locations[profile.city].regions[target.value].blocks).map(x => ({ key: x.key, value: x.value, text: x.text }));
        newState.selectedCity = target.value;
        profile.region = target.value;
        profile.block = null;
        break;
      case 'block':
        newState.selectedCity = target.value;
        profile.block = target.value;
        break;
      default: break;
    }
    this.setState({
      ...newState,
      profile,
    })
  }

  onUploadImage = (e) => {
    const {productId, token} = this.props;

    const data = {
      product: productId,
      image: e.target.files[0],
    };

    this.props.uploadImageAction(data, token)
      .then(action => {
        this.setState({image: action.payload.image})
      })
  }

  renderProfilePic() {
    const { image } = this.state.profile;
    if (image) {
      return (
        <div className='image-uploads__uploader' style={{ marginTop: '40px' }}>
          <Image src={image} style={{maxHeight: '105px'}} />
        </div>
      );
    }
    return (
      <div className='image-uploads__uploader' style={{ marginTop: '40px' }}>
        <label htmlFor='profile-pic' className='image-uploads__uploader-btn'/>
        <input type='file' id='profile-pic' onChange={this.onUploadImage} />
      </div>
    );
  }


  render() {
    const {profile, isSaved, cities, regions, blocks } = this.state;

    if (profile.id === undefined) {
      return null;
    }

    return (
      <div className='main product'>
        <h1 className='title title--primary'>Редактирование профиля</h1>
        <h3 className='title title--secondary'>Здесь вы можете отредактировать ранее заполненные поля</h3>
        { isSaved && <Message content='Профиль сохранен' positive onDismiss={() => (this.setState({ isSaved: false }))} /> }
        {this.renderProfilePic()}
        <Form className='common-form'>
          {(profile.role === 'user') && <div className='field field-double'>
            <Form.Input label='Имя' type='text' defaultValue={profile.first_name} name='first_name' onChange={this.onChange} />
            <Form.Input label='Фамилия' type='text' defaultValue={profile.last_name} name='last_name' onChange={this.onChange}/>
          </div>}
          <Form.Input label='Название компании' type='text' defaultValue={profile.name} name='name' onChange={this.onChange} />
          <Form.Input label='Адрес доставки' type='text' defaultValue={profile.address} name='address' onChange={this.onChange}/>
          <div className='field field-double'>
            <Select placeholder='Город/область' options={ cities } onChange={this.onControlChange} name='city' defaultValue={profile.city || ''} />
            <Select placeholder='Район' options={ regions } onChange={this.onControlChange} name='region' defaultValue={profile.region || ''} />
          </div>
          <div className='field field-double'>
            <Select placeholder='Округ' options={  blocks } onChange={this.onControlChange} name='block' defaultValue={profile.block || ''} />
            {/*<Form.Input label='Город' type='text' defaultValue={profile.city} name='city' onChange={this.onChange}/>*/}
            <Form.Input label='Почтовый индекс' type='text' defaultValue={profile.zip_code} name='zip_code' onChange={this.onChange}/>
          </div>
          <div className='field field-double'>
            <Form.Input label='Номер телефона' type='phone' defaultValue={profile.phone} name='phone' onChange={this.onChange} readOnly />
            <Form.Input label='email' type='email' defaultValue={profile.email} name='email' onChange={this.onChange} />
          </div>
          {/*<Form.Radio label='Нужна ли накладная?' toggle />*/}
          <Form.Field className='text-center'>
            <Button content='Сохранить' color='orange' onClick={this.onSubmit} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}

function mapToProps(state) {
  const token = state.auth.token;
  const profile = state.auth.profile;
  const { location } = state.locations;
  return {
    token,
    profile,
    location,
  }
}

export default connect(mapToProps, {
  getProfileAction,
  updateProfileAction,
  uploadImageAction,
})(UserProfile);