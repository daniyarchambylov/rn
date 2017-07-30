import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Button, Message, Image} from 'semantic-ui-react'
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
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profile !== nextProps.profile) {
      const data = { profile: nextProps.profile };

      if (this.props.profile.updated_at !== undefined && this.props.profile.updated_at !== nextProps.profile.updated_at) {
        data.isSaved = true;
      }
      this.setState({...data});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.profile.updated_at !== this.state.profile.updated_at) || nextState.isSaved !== this.state.isSaved;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const profile = {
      ...this.state.profile,
    };

    delete profile.updated_at;
    delete profile.image;
    this.props.updateProfileAction(this.props.token, profile);
  };

  onChange = (e, target) => {
    const {profile} = this.state;

    profile[target.name] = target.value;

    this.setState({
      profile
    });
  };

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
    const {profile, isSaved} = this.state;

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
            <Form.Input label='Город' type='text' defaultValue={profile.city} name='city' onChange={this.onChange}/>
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
  return {
    token,
    profile
  }
}

export default connect(mapToProps, {
  getProfileAction,
  updateProfileAction,
  uploadImageAction,
})(UserProfile);