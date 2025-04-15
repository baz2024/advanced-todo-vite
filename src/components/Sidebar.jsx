import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({open, onClose}) => {

return (
    <Drawer anchor="left" open={open} onClose={onClose}>
        <List  sx={{ width: 250 }}>
            <ListItem  button onClick={onClose}>
                <ListItemText primary="Close Drawer" />
            </ListItem>
             <ListItem button onClick={() => 
                {
                    localStorage.removeItem('user');
                    localStorage.removeItem('pass');
                    localStorage.clear();
                    window.location.href ="/";
                }
             }>
                <ListItemText primary="Logout" />
             </ListItem>
            </List>
        </Drawer>
)

}// end of arrow function
export default Sidebar;
// This component is a sidebar that uses Material-UI's Drawer component.
// It contains a list with two items: "Close Drawer" and "Logout".
// When "Close Drawer" is clicked, it closes the sidebar.
// When "Logout" is clicked, it clears the local storage and redirects the user to the login page.
// The component is exported as the default export of the module.
// The component uses React hooks to manage the state of the sidebar.