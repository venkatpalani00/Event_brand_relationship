import React,{useState} from 'react';
import FullHash from '../components/hashtag/FullHash';

const MyForm = (props) => {
    const [ar,setar]=useState([[]]);
   const mySubmit=(getlist,ind)=>{
        let newlist = [...ar]
        newlist[ind].push(getlist)
        setar(newlist)
       // console.log("Mine:",ar)
    }
   const closefun = (i,ind) =>{
      let newlist=[...ar] 
      newlist[i].splice(ind,1)
      setar(newlist)
     // console.log(ar)
    }
    const add = () =>{
      let v=[...ar];
      v.push([]);
      setar(v);
      console.log(ar);
    }
      return (
      <FullHash taglist={ar} 
      onChange={mySubmit}
      Delete={closefun}
      addup={add}
      />)
  }
  export default MyForm;