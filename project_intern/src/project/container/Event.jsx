import React,{useState} from 'react';
import { Button, Select, Input,Icon,Form,Message, Popup, Grid } from 'semantic-ui-react'
import Brand from './brand'
    
const Event =(props)=>{
    var final='';
    const [event,setEvent]=useState('');
    const [date,setDate]=useState('')
    const [flag,setFlag]=useState(0);
    const [open,setOpen]=useState(false)
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false);setFlag(0);
    }
    return (
        <span>
            <Form >
                <center>
                    <div>
                        <Input required name='event' value={event} transparent autoFocus size="massive" placeholder="Add Event..." style={{borderBottom:"2px solid black"}} onChange={e => setEvent(e.target.value)} /><br />
                        <Input required name='date' value={date} type='date' transparent focus size="massive" placeholder="Date..." style={{borderBottom:"2px solid black"}} onChange={e => setDate(e.target.value)}/>
                    </div>
                    <br />
             <Popup
                trigger={<Button type='submit' icon labelPosition='right'>Submit<Icon name='arrow right'
                onClick={
                event!='' && date!=''?
                async ()=>{
                const events={event,date};
                const response = await fetch("/add_event",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/text"
                 },
                body:JSON.stringify(events)
                });
                if(response.ok){
                    props.add(event,date)
                    setEvent("")
                    setDate("")
                    setFlag(1)
                 }
                else
                    { console.log("error")
                    setFlag(2)
                    }
                }:""
                }
            />
             </Button>
            }
            content=
            {flag==1?
            <Message info>
                <Icon name='check circle outline' size='large' /> Data Successfully sent...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Icon name='close' onClick={handleClose} />
            </Message>:
            <Message negative>
                <Icon name='dont' size='large' />  Oops...Some error Occurs...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Icon name='close' onClick={handleClose} />
            </Message>
            }
            wide='very'
            on='click'
            size='large'
            position='right center'
            open={flag==1 || flag==2 && open}
            onOpen={handleOpen}
            />
            </center>
        </Form>
    </span>
    )
}

export default Event