import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less'
class Swipers extends Component {
    static propTypes = {
        swiperOption:PropTypes.object
    };
    static defaultProps = {
        swiperOption:{}
    };

    componentDidUpdate() {
        let mySwiper = new Swiper('.swiper-container', Object.assign({},{
            freeMode: true,
            freeModeMomentumRatio: 0.5,
            slidesPerView: 'auto'},this.props.swiperOption))
    }

    render() {
        const {children } = this.props;
        return (
            <div className="swiper-container" >
                <div className="swiper-wrapper">
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child);
                    })}
                </div>
            </div>
        );
    }
}

export default Swipers;
