import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn, ClerkProvider } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
    // ... (component body)
    return (
    <Container maxWidth = "100vw">
        <AppBar position="static" sx={{backgroundColor: '#3f51b5'}}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Rate My Professor
                </Typography>
                <Button color="inherit">
                    <Link href="/sign-in" passHref>
                        Login
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link href="/sign-up" passHref>
                        Sign Up
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{textAlign: 'center', my: 4}}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Sign In
            </Typography>
            <ClerkProvider>
                <SignIn />
            </ClerkProvider>
            
        </Box>
    </Container>
    )
    
}





