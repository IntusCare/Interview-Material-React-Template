import React, { useState } from 'react';
import { GrayscaleBlack50 } from '../colors.js';
import { GrayscaleWhite } from '../colors.js';

const Card = (props) => {
    const [hover, setHover] = useState(false);
    const cardStyle = {
        background: `${GrayscaleWhite}`,
        boxShadow: `0px 0.4px 0.4rem 0.06rem ${GrayscaleBlack50}`,
        boxSizing: 'border-box',
        border: "2px transparent solid",
        borderRadius: '10px',
        padding: "20px",
        ...props.componentStyle,
        ...hover ? props.hoverStyle : {},
    };

    return (
        <div
            style={cardStyle} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
        >
            {props.children}
        </div>
    );
};

export default Card;