import React, { useState, useEffect } from 'react'
import Swiper from 'swiper'
import "swiper/css/swiper.css";
import './index.scss'
interface bannerListItem {
    imageUrl: string
}

interface iProps {
    bannerList: bannerListItem[]
}

const Slider: React.FC<iProps> = ({ bannerList }) => {
    const [sliderSwiper, setSliderSwiper] = useState(null)

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let sliderSwiper = new Swiper('.slider-container', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                }
            })
            setSliderSwiper(sliderSwiper)
        }
    }, [bannerList.length, sliderSwiper])

    return (
        <div className='sliderContainer'>
            <div className="before"></div>
            <div className="slider-container">
                <div className='swiper-wrapper'>
                    {
                        bannerList.map((slider, index) => {
                            return (
                                <div className='swiper-slide' key={index}>
                                    <div className='slider-nav'>
                                        <img src={slider.imageUrl} width='100%' height='100%' alt="" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    )
}

export default React.memo(Slider)