import React, {useEffect} from "react";
import {AnyEventObject, Interpreter} from "xstate";
import { Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {NotificationUpdatePayload} from "../models";
import NotificationList from "../components/NotificationList";
import {AuthService} from "../machines/authMachine";
import {NotificationsService} from "../machines/notificationsMachine";
import {omit} from "lodash/fp";
import {useActor} from "@xstate/react";
 
const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: "90vh",
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}));

export interface Props {
    authService: AuthService;
    notificationsService: NotificationsService;
}

const NotificationsContainer: React.FC<Props> = ({authService, notificationsService}) => {
    const classes = useStyles();
    // const [authState] = useActor(authService);
    const [notificationsState, sendNotifications] = useActor(notificationsService);

    function getPayload(event: AnyEventObject) {
       return event.data || omit("type", event);
    }

    useEffect(() => {
        authService.onEvent(event => {
            const payload = getPayload(event);

            sendNotifications({
                type: "ADD", notification: {
                    id: generateUniqueID(),
                    title: event.type,
                    severity: "info",
                    payload: payload
                }
            })
        })
    }, [authService])

    // useEffect(() => {
    //   sendNotifications({
    //     type: "ADD", notification: {
    //       id: "Auth State",
    //       title: authState.value as string,
    //       severity:  "info",
    //       payload: authState
    //     }
    //   })
    // }, [authState]);


    const updateNotification = (payload: NotificationUpdatePayload) => {
    };

    return (
        <Paper className={classes.paper} >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Notifications
            </Typography>
            <NotificationList
                notifications={notificationsState?.context?.notifications!}
                updateNotification={updateNotification}
            />
        </Paper>
    );
};

export default NotificationsContainer;
function generateUniqueID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}