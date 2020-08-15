import React from 'react';
import Tag from '../hashtag/DetailedTag'
import plus from '../../containers/plus.jpg'

const FullHash = function(props) {

    const myChangeHandler = (e,i) =>{
        let value=e.target.value
       // console.log(value)
        if(value.endsWith(" ")){
            props.onChange(value.trim(),i)
            e.target.value=""
        }
    }

    return (
        <span>
        {
        props.taglist.map((row,i)=>
        <div style={{borderBottom:"2px solid black",position:"relative"}}>Hashtags:
        <Tag taglist={row} delete={props.Delete} i={i}/>
        <input
        type="text"
          autoFocus
          onChange={(e)=>myChangeHandler(e,i)}
          style={{
            border:"none",
            overflow:"auto",
            outline:"none",
            resize:"none",
            WebkitBoxShadow:"none",
            MozBoxShadow:"none",
            BoxShadow:"none",
            WebkitBoxSizing:"border-box",
            MozBoxSizing:"border-box",
            boxSizing:"border-box",
            width:"25%",
            "&:hover":{
                outline:"none !important"
            }
        }}
        />
        <span>{
        i===props.taglist.length-1?<img src={plus} alt="add" 
        style={{ 
        position:"absolute",
        right:"0",
        bottom:"0" ,
        width:"40px", 
        height:"33px"
        }} 
        onClick={()=>props.addup()}
         />:""
        }
        </span>
        </div>
        )}
        </span>
    )
}

export default FullHash