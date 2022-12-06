import React from "react";
import {RouteComponentProps, useNavigate} from "@reach/router"

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import Container from "@mui/material/Container";
import {useForm} from "react-hook-form";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
    yahooGigyaLogin,
    linkedinGigyaLogin,
    facebookGigyaLogin,
    twitterGigyaLogin, googleGigyaLogin, opublicConnectGigyaLogin, oconnectGigyaLogin,
} from "../gigya/gigyaWebSDK";
import gigyaWebSDK from "../gigya/gigyaWebSDK";
// import {useService} from "@xstate/react";
// import {socialLogin} from "../gigya/gigyaAuthMachine";
import {asEffect, useActor, useSelector} from "@xstate/react";
import {Interpreter} from "xstate";
import {AuthService, SSOEvent} from "../machines/authMachine";
import {ErrorOutlined} from "@mui/icons-material";
import { Checkbox, MenuItem, Select } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(1)
    },
    paperRow: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

export interface SignInProps extends RouteComponentProps {
    authService: AuthService;
}

const loginServiceSelector = (state: any) => state.context;
export default function SignIn({authService}: SignInProps) {
    const classes = useStyles();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues:{
            authFlow: "redirect",
            useChildContext: false,
            redirectURL: `${window.location.origin}#/profile`
        }
    });
    const {message} = useSelector(authService, loginServiceSelector);

    // const {loginService} = useSelector(authService, loginServiceSelector);
    const loginService = authService;
 

    const handleSSo = async (data: any) => {
        loginService.send({type: 'SSO', ...data});
    };

    const handleGoogleLogin = () => {
        loginService.send({type: 'SOCIAL', provider: "google"});
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form} 
                        onSubmit={handleSubmit(handleSSo)}
                    >
                        <Select
                            variant="outlined" 
                            required
                            fullWidth
                            label="authFlow"
                            type="authFlow"
                            id="authFlow"
                            defaultValue={"redirect"}
                            autoComplete="authFlow"
                            {...register("authFlow", {required: true})}
                        >
                            <MenuItem key={"redirect"} value={"redirect"}>{"redirect"}</MenuItem>
                            <MenuItem key={"popup"} value={"popup"}>{"popup"}</MenuItem>
                        </Select>
                        {errors && errors.authFlow && <span>Please enter a authFlow</span>}
                        <TextField
                            variant="outlined"
                            margin="normal" 
                            fullWidth
                            id="redirectURL"
                            label="redirect URL"
                            autoComplete="redirectURL"
                            autoFocus
                            {...register("redirectURL" )}
                        />
                        {errors && errors.redirectURL && <span>Please enter a valid redirect URL</span>}


                        <Checkbox 
                            aria-label={"useChildContext"}
                            id="useChildContext"
                            autoFocus
                            {...register("useChildContext" )}
                        />
 
                        {message &&  <span><ErrorOutlined /> {message}</span>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In With SSO
                        </Button>

                    
                    </form>


                </div>

            <Button
                startIcon={<TwitterIcon/>}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleGoogleLogin}
            >
                Sign In With Google
            </Button>
           
          


        </Container>
    );
}
