import React, {CSSProperties} from 'react';

import './../css/header.css'

const Header = () => {
    return (
        <div style={headerStyle}>
            <div style={headerTextStyle}>
                TrainingTracker
            </div>
        </div>
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

const headerTextStyle: CSSProperties = {
    position: 'absolute',

    color: 'white',
    fontSize: '12px',
    fontFamily: 'Sans-Serif',

    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))',

    textShadow: '1px 0 0 black,0 1px 0 black,-1px 0 0 black,0 -1px 0 black',

    top: '15px',
    left: '15px',
    height: '20px',
    margin: '0',
    padding: '0',
}

export default Header