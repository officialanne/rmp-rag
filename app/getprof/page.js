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
  Stack
} from '@mui/material'
import { useState, React } from 'react';
import { SignedIn, SignedOut, UserButton, ClerkProvider } from "@clerk/nextjs";
import Head from 'next/head'

export default function getProf() {


    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
        },
    ]);
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        setMessage('');
        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message },
            { role: 'assistant', content: '' },
        ]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([...messages, { role: 'user', content: message }]),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content: data.content || 'No content returned from server' },
            ]);
        } catch (error) {
            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content: 'An error occurred while fetching the response.' },
            ]);
            console.error('Error fetching response:', error);
        }
    };

    return (

        <Container>
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
                    <Button color="inherit" href="/sign-in">Sign In</Button>
                    <Button color="inherit" href="/sign-up">Sign Up</Button>
                    <Button color="inherit" href="/">Home</Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                    <Button color="inherit" href="/">Home</Button>
                </SignedIn>
                </ClerkProvider>

                
                </Toolbar>
            </AppBar>

            <Box
                width="100vw"
                height="100vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    direction={'column'}
                    width="500px"
                    height="700px"
                    border="1px solid black"
                    p={2}
                    spacing={3}
                >
                    <Stack
                        direction={'column'}
                        spacing={2}
                        flexGrow={1}
                        overflow="auto"
                        maxHeight="100%"
                    >
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                display="flex"
                                justifyContent={
                                    message.role === 'assistant' ? 'flex-start' : 'flex-end'
                                }
                            >
                                <Box
                                    bgcolor={
                                        message.role === 'assistant'
                                            ? 'primary.main'
                                            : 'secondary.main'
                                    }
                                    color="white"
                                    borderRadius={16}
                                    p={3}
                                >
                                    {message.content}
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            label="Message"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button variant="contained" onClick={sendMessage}>
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Container>
        
    );
}
