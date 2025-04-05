import {Button, Grid, Typography} from "@mui/material";
import { useEffect, useState } from "react";

const UserForm = ({addUser, updateUser, submitted, data,  isEdit}) => {

const [id, setid] = useState(0);
const [name, setname] = useState('');

useEffect(() => {
    if(!submitted){
        setid(0);
        setname('');
    }
}, [submitted]);

useEffect(() => {
    if( data?.id && data.id !==0 ){
        setid(data.id);
        setname(data.name)
    }
}, [data]);

    return(
      <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: '#ffffff',
        marginBottom: '30px',
        display: 'block'

      }}
      >
            <Grid item xs={12}>
                <Typography component={'h1'} sx={{ color: '#000000' }}> User Form......................................... </Typography>    
            </Grid>

            <Grid item xs={12} sm={6} sx={{display: 'flex'}}>
                <Typography 
                    component={'label'}
                    htmlFor="id"
                    sx={{
                        color: '#000000',
                        marginRight: '20px',
                        fontSize: '16px',
                        width: '100px',
                        display: 'block',
                    }}
                 >
                    ID
                </Typography>
                <input 
                    type="number"
                    id="id"
                    name="id"
                    sx={{ with: '400px'}}
                    value={id}
                    onChange={e => setid(e.target.value)}

                />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display: 'flex'}}>
                <Typography 
                    component={'label'}
                    htmlFor="id"
                    sx={{
                        color: '#000000',
                        marginRight: '20px',
                        fontSize: '16px',
                        width: '100px',
                        display: 'block',
                    }}
                 >
                    Name
                </Typography>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    sx={{ with: '400px'}}
                    value={name}
                    onChange={e => setname(e.target.value)}

                />
            </Grid>

            <Button
                sx={{
                    margin: 'auto',
                    marginBottom: '20px',
                    backgroundColor: '#00c6e6',
                    color: '#000000',
                    marginLeft: '15px',
                    marginTop: '20px',
                    '&:hover':{
                        opacity: '0.7',
                        backgroundColor: '#00c6e6'
                    }
                }}
                onClick={() => isEdit ? updateUser({id, name}) : addUser({ id, name })}
            >
                {
                    isEdit ? 'Update' : 'Add'
                }
            </Button>
      </Grid>  
    );
}

export default UserForm;