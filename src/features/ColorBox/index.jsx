import React, { useState } from 'react';
import PropTypes from 'prop-types';


ColorBox.propTypes = {

};

function ColorBox(props) {
    const [color, setColor] = useState('white');
    return (
        <div>
            {color}
            <button onClick={() => setColor('white')}>Thây đổi màu trắng</button>
            <button onClick={() => setColor('black')}>Thây đổi màu đen</button>
        </div>
    );
}

export default ColorBox;