import React from 'react';

const Heading = (props) => {
    return <div>
        <input type="text" onChange={props.onChange} />
        <h1>{props.children}</h1>
    </div>;
}

export default Heading;