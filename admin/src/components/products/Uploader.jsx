import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Select, Button, Image } from 'semantic-ui-react';
import uploadImg from '../../img/icon-upload.png';
import {uploadImage as uploadImageAction} from '../../actions/products/creators/product';

class Uploader extends React.Component {
  static PropTypes = {
    uploadImageAction: PropTypes.func.isRequired,
    productId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired
  };

  uploadImage = (e) => {
    const {productId, token} = this.props;

    const data = {
      product: productId,
      image: e.target.files[0],
    };

    this.props.uploadImageAction(data, token)
  };

  render() {
    return (
      <div className='image-uploads'>
        <Form.Field>
          <div className='image-uploads__uploader'>
            <label htmlFor='upload-photo-1' className='image-uploads__uploader-btn'/>
            <input type='file' id='upload-photo-1' onChange={this.uploadImage} />
          </div>
          <div className='image-uploads__uploader'>
            <label htmlFor='upload-photo-1' className='image-uploads__uploader-btn'/>
            <input type='file' id='upload-photo-1' onChange={this.uploadImage} />
          </div>
          <div className='image-uploads__uploader'>
            <label htmlFor='upload-photo-1' className='image-uploads__uploader-btn'/>
            <input type='file' id='upload-photo-1' onChange={this.uploadImage} />
          </div>
          <div className='image-uploads__uploader'>
            <label htmlFor='upload-photo-1' className='image-uploads__uploader-btn'/>
            <input type='file' id='upload-photo-1' onChange={this.uploadImage} />
          </div>
        </Form.Field>
        <Form.Field className='text-center'>
          <Button content='Сохранить' color='orange' />
        </Form.Field>
      </div>
    )
  }
}

export default connect((state) => ({token: state.auth.token}), {uploadImageAction})(Uploader)