'use client'
import LoginForm from "@/components/login-form/login-from";
import { Grid, Snackbar } from "@mui/material";
import { useState } from "react";

export default function Login () {
    const [snackBarState,setSnackBarSate] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        snackMessage: ''
    })
    const handleClose = () => {
        setSnackBarSate({ ...snackBarState, open: false });
    };
    const { vertical, horizontal, open, snackMessage } = snackBarState;
    return (
        <section className="xs:w-full md:container m-auto">
        <Grid className="p-4 m-auto" container spacing={2}>
            <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
            <Grid item  xs={12} sm={8} md={6} lg={4}>
                <LoginForm />
            </Grid >
            <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
        </Grid>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackMessage}
            key={vertical + horizontal}
        />
    </section>
    )
}