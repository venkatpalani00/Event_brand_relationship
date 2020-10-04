import React,{useState, useLayoutEffect} from 'react'
import {Button, Segment, Form,Popup,Grid,Radio,Input} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import { useEffect } from 'react'

const Home = (props) =>{

/*useEffect(()=>{
    fetch('/movies').then(response => response.json().then(
        data=>{
            console.log(data);
        }
    ))
},[])*/

const [fl,setFl]=useState(0);
const [fl1,setFl1]=useState(0)
const [sfc,setSfc]=useState("");
const [lsend,setLsend]=useState(0);
const [loguser,setLU]=useState("");
const [logpass,setLP]=useState("")
const [user,setUser]=useState("")
const [password,setPass]=useState("")
const [msg,setMsg]=useState(0)
const [mode,setMode]=useState("")
const [lmsg,setLmsg]=useState(0)
const [users,setUse]=useState({});

useEffect(()=>{
    fetch('/users').then(response => response.json().then(
        data=>{
            setUse(data)
        }
    ))
},[])

const log = () =>{
    setFl1(0)
    setFl(1);
}
const log1 = () =>{
    setFl(0);
    setFl1(1);
}

const login = () =>{
    console.log(loguser)
    sessionStorage.setItem('mine',loguser);
    console.log(logpass)
    loguser=="venkat"?setLsend(1):setLsend(0)
}

return (
    <div>
    {
        lsend==1?<Redirect to='/farm' /> : lsend==2?"":""
    }
    <center>
    {
        msg==1?<div>Successfully signed in... Login to continue</div>:msg==2?<div>Something went wrong...Please try again with alternative username</div>:''
    }
    {
        lmsg==1?<div>Login failed...Try again</div>:''
    }
        <Button onClick={log}> LOGIN</Button>
        <Button onClick={log1}>REGISTER</Button><br/><br/>
        </center>
    {fl==1?
        <center><Segment container raised compact justify='center'>
            <label>LOGIN</label>
            <Form>
                <Form.Field>
                <label>Username</label>
                <input value={loguser} placeholder='UserName' onChange={e => setLU(e.target.value)} />
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input value={logpass} placeholder='Password' onChange={e => setLP(e.target.value)}/>
                </Form.Field>  
                <Button type='submit' 
                onClick={
                    async()=>{
                        const use={loguser,logpass};
                        const response = await fetch("/login",{
                            method:"POST",
                            headers:{
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(use)
                        });
                        if(response.ok){
                            console.log(users[loguser])
                            sessionStorage.setItem('mine',loguser);
                            if(users[loguser]=='farmer')
                                setLsend(1)
                            else
                                setLsend(2)
                        }
                        else{
                           setLmsg(1);
                        }
                    }
                }
                >Go</Button>
            </Form>
        </Segment></center>:
        fl1==1?
        <center>
        <Segment raised compact>
            <Grid divided columns='equal'>
                <Grid.Column>
                <Popup
                    trigger={<Button color='blue' content='Farmer' fluid />}
                    position='top center'
                    size='tiny'
                    on='click'
                    inverted
                >
                 <center><br/><br/><Segment container raised compact justify='center'>
                        <Form>
                        <Form.Field>
                        <label>Username</label>
                        <Input placeholder='UserName' value={user} onChange={e =>setUser(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Password</label>
                        <Input type='password' placeholder='Password' value={password} onChange={e => setPass(e.target.value)}/>
                        </Form.Field>
                        <Button
                            onClick={
                                async()=>{
                                    var mode="farmer"
                                    const use={user,password,mode};
                                    const response = await fetch("/add_user",{
                                        method:"POST",
                                        headers:{
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(use)
                                    });
                                    if(response.ok){
                                        setMsg(1);
                                        setUser('')
                                        setPass('')
                                    }
                                    else{
                                        setMsg(2);
                                        setUser('')
                                        setPass('')
                                    }
                                }
                            }
                        >Go</Button>
                    </Form>
                </Segment></center>
                </Popup>
                </Grid.Column>
                <Grid.Column>
                <Popup
                    trigger={<Button color='red' content='Customer' fluid />}
                    position='top center'
                    size='tiny'
                    on='click'
                    inverted
                >
                 <center><br/><br/><Segment container raised compact justify='center'>
                        <Form>
                        <Form.Field>
                        <label>Username</label>
                        <Input placeholder='UserName' value={user} onChange={e =>setUser(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Password</label>
                        <Input type='password' placeholder='Password' value={password} onChange={e => setPass(e.target.value)}/>
                        </Form.Field>
                        <Button
                            onClick={
                                async()=>{
                                    var mode="customer"
                                    const use={user,password,mode};
                                    const response = await fetch("/add_user",{
                                        method:"POST",
                                        headers:{
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(use)
                                    });

                                    if(response.ok){
                                        setMsg(1);
                                        setUser('')
                                        setPass('')
                                    }
                                    else{
                                        setMsg(2);
                                        setUser('')
                                        setPass('')
                                    }
                                }
                            }
                       >Go</Button>
                    </Form>
                </Segment></center>
                </Popup>
                </Grid.Column>
            </Grid>
            </Segment></center> 
        :''
    }
    
    </div>
)

}
export default Home;