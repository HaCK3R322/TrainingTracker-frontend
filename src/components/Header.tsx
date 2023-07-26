import React, {CSSProperties} from 'react';

const Header = () => {
    return (
        <div style={headerStyle}/>
    );
};

const headerStyle: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '50px',

    top: '0',
    left: '0',

    backgroundColor: '#2B2B2B',
}

export default Header