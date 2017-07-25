import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, Icon } from 'semantic-ui-react';

import imgUser from '../img/user-avatar.png';
import {sidebarToggle as sidebarToggleAction} from '../actions/creators/sidebar';
import {signOut as signOutAction} from '../actions/auth/creators/signIn';

class Header extends React.Component {
    static PropTypes = {
        auth: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        sidebarToggleAction: PropTypes.func.isRequired,
        signOutAction: PropTypes.func.isRequired,
        cart: PropTypes.object.isRequired,
        isSidebarToggled: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.sidebarToggle = this.sidebarToggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.cartClick = this.cartClick.bind(this);
        this.signOutClick = this.signOutClick.bind(this);

        this.state = {
            dropdownToggled: false
        }
    }

    sidebarToggle() {
        const {isSidebarToggled} = this.props;
        this.props.sidebarToggleAction(!isSidebarToggled);
    }

    dropdownToggle() {
        this.setState({
          dropdownToggled: !this.state.dropdownToggled
        })
    }

    cartClick() {
        this.props.push('/cart');
    }

    signOutClick(e) {
        e.preventDefault();
        //this.props.push('/sign-in');
        this.props.signOutAction();
    }

    render() {
        const {auth, cart} = this.props;
        const {dropdownToggled} = this.state;
        const token = auth.token;
        const profile = auth.profile;

        const cartCls = cart.size > 0 ? ' cart-added' : '';

        const settingsCls = dropdownToggled ? ' settings--opened' : '';

        const userName = !profile.first_name && !profile.last_name ? 'Гость' : profile.first_name + ' ' + profile.last_name;

        return (
            <header className='header'>
                <div className='sidebar-header'>
                    <span className='sidebar-header__name'>RN.KG</span>
                    <span className='sidebar-header__slogan'>Группа районых магазов</span>
                </div>
                <button className='sidebar-toggle' onClick={this.sidebarToggle}>
                    <span className='sidebar-toggle__line'/>
                    <span className='sidebar-toggle__line'/>
                    <span className='sidebar-toggle__line'/>
                </button>
                {token && <div className='header-user'>
                    <button className='btn btn--transparent header__item inbox'>
                        <span className='inbox__count'>6</span>
                    </button>
                    <div className='header__item user'>
                        {/*<img className='user__img' src={imgUser} alt='' />*/}
                        {userName}
                    </div>
                    <button className={`header__item cart-btn${cartCls}`} disabled={cart.size === 0} onClick={this.cartClick}>
                        <Icon name='shopping cart' size='big' disabled={cart.size === 0}/>
                    </button>
                    <div className={`header__item header__item settings dropdown--parent${settingsCls}`}>
                        <button className='btn btn--transparent settings__btn' onClick={this.dropdownToggle}/>
                        <nav className='dropdown'>
                            <button className='dropdown__item btn--transparent' onClick={() => (this.props.push('/user-profile/'))}>
                                Редактировать профиль
                            </button>
                            <button className='dropdown__item btn--transparent' onClick={this.signOutClick}>
                                Выход
                            </button>
                        </nav>
                    </div>
                </div>}
            </header>
        )
    }
}

function mapToProps(state) {
    const auth = state.auth;
    const isSidebarToggled = state.application.isSidebarToggled;
    const cart = state.cart.get('products');

    return {
        auth,
        isSidebarToggled,
        cart
    }
}

export default connect(mapToProps, {push, sidebarToggleAction, signOutAction})(Header);