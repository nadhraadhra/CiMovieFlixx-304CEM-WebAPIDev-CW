import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            backgroundColor: 'black', color:'rgb(168, 0, 65)'
        }}>
           <p> CiMovieFlix 2020  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
