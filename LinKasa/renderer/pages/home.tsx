import React, {useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import { Drawer, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { UserProvider, useUser } from '../session/UserSession'
import Dashboard from './dashboard/Dashboard'
import { page_auth } from './auth/Authorize'

const Root = styled('div')(({ theme }) => {
  return {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  }
})


export default function HomePage() {
  const router = useRouter();
  const { user, login, logout } = useUser();

  useEffect(() => {
    if (user) {
      router.push("./roles-dashboard/" + page_auth[user.role || "default"]);
    }
  }, [router, user]);
  return (
      <React.Fragment>
        <Head>
          <title>LinKasa - Home Page</title>
        </Head>

        {/* <Dashboard>
          
        </Dashboard> */}



        {/* {user && ( 
          <Typography>User ID: {user.uid} {user.role}</Typography>
        )}
        <Button onClick={logout}>logout</Button> */}


      </React.Fragment>
  );
}


