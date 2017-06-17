import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

import imgUser from '../img/user-avatar.png';
import {sidebarToggle as sidebarToggleAction} from '../actions/creators/sidebar';

class Header extends React.Component {
    static PropTypes = {
        auth: PropTypes.object.isRequired,
        sidebarToggleAction: PropTypes.func.isRequired,
        isSidebarToggled: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.sidebarToggle = this.sidebarToggle.bind(this);
    }

    sidebarToggle() {
        const {isSidebarToggled} = this.props;
        const data = !isSidebarToggled;
        this.props.sidebarToggleAction(data);
    }

    render() {
        const {auth} = this.props;
        const token = auth.token;
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
                {!token && <div className='header-user'>
                    <button className='btn btn--transparent header__item inbox'>
                        <span className='inbox__count'>6</span>
                    </button>
                    <div className='header__item user'>
                        <img className='user__img' src={imgUser} alt='' />
                        Екатерина Добрынина
                    </div>
                    <div className='header__item header__item settings settings--opened dropdown--parent'>
                        <button className='btn btn--transparent settings__btn' />
                        <nav className='dropdown'>
                            <a href='#' className='dropdown__item'>
                                Редактировать профиль
                            </a>
                            <a href='#' className='dropdown__item'>
                                Выход
                            </a>
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

    return {
        auth,
        isSidebarToggled
    }
}

export default connect(mapToProps, {sidebarToggleAction})(Header);