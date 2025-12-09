
import * as React from 'react';

import Badge from '@mui/material/Badge';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';


export default function Notifications() {


  const [count, setCount] = React.useState(1);
  


  return (
   
      <div>
        <Badge color="Notifications" badgeContent={count}>
          <MailIcon />
        </Badge>
     
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        
      </div>
 
  
  );
}

