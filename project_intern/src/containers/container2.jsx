import React from 'react';
import Heading from '../components/heading/Heading';
const container2 = (props) => {
    const changeHandler = (event) =>{
        console.log("typed", event.target.value);
    }
    return <div><h1>Hi inside container 2</h1>
        <Heading onChange={changeHandler} rep="hi its a rep"> this is a child</Heading>
    </div>;
}

export default container2;