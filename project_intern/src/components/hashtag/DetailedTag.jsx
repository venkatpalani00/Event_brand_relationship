import React from 'react';
import close from '../../containers/del.png'

const DetailedTag = function(props){
    return(
        <span>
        {props.taglist.map((taglist,index) => 
            <div style={{
                display: "inline-block",
                backgroundColor:"red",
                margin:"5px",
                border:"1px solid red",
                padding: "1px 5px 1px 5px",
                borderRadius: "0.5em"
            }} >
                #{taglist}&nbsp;
                <img src={close} alt='close' width='15px' height='15px' onClick={()=>props.delete(props.i,index)}/>
            </div>)}</span>
    )
}

export default DetailedTag