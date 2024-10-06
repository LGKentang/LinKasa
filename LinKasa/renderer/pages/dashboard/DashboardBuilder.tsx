import { Grid, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
export function GridItem(children) {
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 'auto',
        }}
      >
        {children}
      </Paper>
    </Grid>
  );
}

export function SidebarItem( title, icon, method, key ) {
  const uniqueKey_1 = `lib-${key}`; 
  const uniqueKey_2 = `lii-${key}`;
  const uniqueKey_3 = `lit-${key}`;
  return (
    <ListItemButton key={uniqueKey_1} onClick={method}>
      <ListItemIcon key={uniqueKey_2} sx={{marginLeft:'4px',marginRight:'-15px'}}> 
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} key={uniqueKey_3} primaryTypographyProps={{ sx: { margin:'0',color: 'grey', fontSize: '12px', fontFamily:"Montserrat" } }}  /> 
    </ListItemButton>
  );
}
