'use client'
import Image from "next/image";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  AppBar, 
  Toolbar, 
  Grid,
  Stack,
  CircularProgress, Collapse
} from '@mui/material'
import { useState, React, useRef, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton, ClerkProvider } from "@clerk/nextjs";
import Head from 'next/head'
import { AccountCircle, SupportAgent } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion'; // Import motion


export default function Home() {
  
  return (
    <Container
      maxWidth = "lg"
    >
      <Head>
        <title>Rate My Professor</title>
        <meta name = "description" content = "Create flashcards from your texrt"></meta>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Rate My Professor
          </Typography>
          <ClerkProvider>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </ClerkProvider>

          
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Rate My Professor
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {' '}
          The easiest way to find and rate professors.
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/getprof">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{mt: 2}}>
          Learn More
        </Button>
      </Box>

      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4} >
          <Grid item xs = {12} md = {4}> 
            {/* Feature items */}
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography> 
              {' '}
              Simply put in your request and let our software do the rest. Finding professors has never been easier.
            </Typography>
          </Grid>
          <Grid item xs = {12} md = {4}> 
            {/* Feature items */}
            <Typography variant="h6" gutterBottom>Smart Responses</Typography>
            <Typography> 
              {' '}
              Our AI intelligently breaks down your text to find professors relevant to your queries.
            </Typography>
          </Grid>
          <Grid item xs = {12} md = {4}> 
            {/* Feature items */}
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography> 
              {' '}
              Access ratings from any device, at any time. Find out about professors on the go at ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
    
  );
}