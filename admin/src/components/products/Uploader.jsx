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
    token: PropTypes.string.isRequired,
    images: PropTypes.any
  };

  static defaultTypes = {
    images: undefined,
  }

  constructor(props) {
    super(props)

    this.state = {
      images: this.props.images || []
    }
  }

  uploadImage = (e, v) => {
    const {productId, token} = this.props;

    const data = {
      product: productId,
      image: e.target.files[0],
    };

    const elId = +e.target.getAttribute('data-imageid')

    this.props.uploadImageAction(data, token)
      .then(action => {
        console.log(action)
        const { images } = this.state;
        const image = action.payload.image;
        if (elId <= (images.length - 1)) {
          images[elId] = image;
        } else {
          images.push(image)
        }

        this.setState({images})
      })
  };

  renderFields = () => {
    const {images} = this.state;
    const fields = []
    for(let i = 0; i < 5; ++i) {
      const elId = `upload-photo-${i}`;
      const f = images[i] === undefined ? (
        <div className='image-uploads__uploader'  key={i}>
          <label htmlFor={elId} className='image-uploads__uploader-btn'/>
          <input type='file' id={elId} data-imageId={ i } onChange={this.uploadImage} />
        </div>) : (
          <div className='image-uploads__uploader' key={i}>
            <Image src={images[i]} style={{maxHeight: '105px'}} />
          </div>
        );
      fields.push(f);
    }

    return fields
  }

  render() {
    return (
      <div className='image-uploads'>
        <Form.Field>
          { this.renderFields() }
        </Form.Field>
        <Form.Field className='text-center'>
          <Button content='Сохранить' color='orange' />
        </Form.Field>
      </div>
    )
  }
}

export default connect((state) => ({token: state.auth.token}), {uploadImageAction})(Uploader)