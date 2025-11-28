
import React from 'react'
import './css/course.css'

function Course({ course }) {
    const { id, title, description, price, link, image } = course;
    return (
        <div className='course'>

            <img src={image} width={250} height={150} />
            <h4 className="course-title">{title}</h4>
            <p className='course-desc'>{description}</p>
            <h3 className='course-price'>{price}₺</h3>
            <a href={link} className='course-link'>Satın Almak İçin Tıkla</a>

        </div>
    )
}

export default Course