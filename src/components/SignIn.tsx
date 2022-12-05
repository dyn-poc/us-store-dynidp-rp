import React from "react";
import {RouteComponentProps, useNavigate} from "@reach/router"

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {useForm} from "react-hook-form";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
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
import {ErrorOutlined} from "@material-ui/icons";
import { Checkbox, MenuItem, Select } from "@material-ui/core";

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
            redirectURL: `${window.location.origin}#/afterLogin`
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
