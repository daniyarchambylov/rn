import React from 'react'
import {Grid, Image} from 'semantic-ui-react'
import noPhoto from '../../img/no-photo.png'


const UserItem = ({ user, push, url }) => (
  <Grid.Row stretched>
    <Grid.Column className='companies__title'  onClick={() => push(url) }>
      <div>
        <Image src={user.image || noPhoto} verticalAlign='middle' style={{ maxHeight: '50px' }}/>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>{user.name}</span>
      </div>
    </Grid.Column>
    <Grid.Column>{user.phone}</Grid.Column>
    <Grid.Column>{user.city}</Grid.Column>
    <Grid.Column>{user.address}</Grid.Column>
  </Grid.Row>
);

export default UserItem;