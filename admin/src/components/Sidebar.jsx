import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
    static PropTypes = {
        isSidebarToggled: PropTypes.bool.isRequired
    };

    render() {
        const {isSidebarToggled} = this.props;

        const sidebarCls = isSidebarToggled ? ' sidebar--toggled' : '';
        return (
            <aside className={`sidebar${sidebarCls}`}>
                <ul className='sidebar-nav'>
                    <li className='sidebar-nav__item sidebar-nav__item--main'>
                        Навигация
                    </li>
                    <li className='sidebar-nav__item'>
                        <a href='#' className='sidebar-nav__link'>
                            Главная
                        </a>
                    </li>
                    <li className='sidebar-nav__item'>
                        <Link to='/user-profile' className='sidebar-nav__link'>
                            Профиль компании
                        </Link>
                    </li>
                    <li className='sidebar-nav__item'>
                        <Link to='/orders' className='sidebar-nav__link'>
                            Мои заказы
                        </Link>
                    </li>
                    <li className='sidebar-nav__item'>
                        <Link to='/products' className='sidebar-nav__link'>
                            Создание товара
                        </Link>
                    </li>
                    <li className='sidebar-nav__item'>
                        <a href='#' className='sidebar-nav__link'>
                            Списки
                        </a>
                        <ul className='sidebar-dropdown'>
                            <li className='sidebar-dropdown__item'>
                                <Link to='/companies' className='sidebar-dropdown__link'>
                                    Список торговых точек
                                </Link>
                            </li>
                            <li className='sidebar-dropdown__item'>
                                <a href='#' className='sidebar-dropdown__link'>Список складов</a>
                            </li>
                            <li className='sidebar-dropdown__item'>
                                <a href='#' className='sidebar-dropdown__link'>Список товаров</a>
                            </li>
                        </ul>
                    </li>
                    <li className='sidebar-nav__item'>
                        <Link to='/about-us' className='sidebar-nav__link'>
                            О нас
                        </Link>
                    </li>
                    <li className='sidebar-nav__item'>
                        <Link to='/user-agreement' className='sidebar-nav__link'>
                            Пользовательское соглашение
                        </Link>
                    </li>
                    <li className='sidebar-nav__item'>
                        <Link to='/contact-us' className='sidebar-nav__link'>
                            Связаться с нами
                        </Link>
                    </li>
                </ul>
            </aside>
        )
    }
}

function mapToProps(state) {
    const isSidebarToggled = state.application.isSidebarToggled;

    return {
        isSidebarToggled
    }
}

export default connect(mapToProps)(Sidebar);