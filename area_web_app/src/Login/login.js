import React from 'react';
import {
    Button,
    TextField
} from '@material-ui/core';
import 'typeface-roboto';
import {
    ToastsContainer,
    ToastsStore,
    ToastsContainerPosition
} from 'react-toasts';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "username": this.state.username, "password": this.state.password });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/auth", requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log("CONNEXION RÉUSSIE");
                    ToastsStore.success("Hello there :)")
                    this.props.UserConnect(response)
                } else {
                    console.log("ERREUR DE CONNEXION")
                    ToastsStore.error("Connection failed\nPlease try again")
                }
            })
            .catch(error => console.log('error', error));
    }

    handleChange = (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case "username":
                this.setState({ username: e.target.value })
                break;
            case "password":
                this.setState({ password: e.target.value })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    required
                    onChange={this.handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    required
                    onChange={this.handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Log In
                </Button>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
            </form>
        );
    }
}




// import React from 'react';
// import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
// import { Face, Fingerprint } from '@material-ui/icons'
// const styles = theme => ({
//     margin: {
//         margin: theme.spacing.unit * 2,
//     },
//     padding: {
//         padding: theme.spacing.unit
//     }
// });

// class LoginTab extends React.Component {
//     render() {
//         const { classes } = this.props;
//         return (
//             <Paper className={classes.padding}>
//                 <div className={classes.margin}>
//                     <Grid container spacing={8} alignItems="flex-end">
//                         <Grid item>
//                             <Face />
//                         </Grid>
//                         <Grid item md={true} sm={true} xs={true}>
//                             <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
//                         </Grid>
//                     </Grid>
//                     <Grid container spacing={8} alignItems="flex-end">
//                         <Grid item>
//                             <Fingerprint />
//                         </Grid>
//                         <Grid item md={true} sm={true} xs={true}>
//                             <TextField id="password" label="Password" type="password" fullWidth required />
//                         </Grid>
//                     </Grid>
//                     <Grid container alignItems="center" justify="space-between">
//                         <Grid item>
//                             <FormControlLabel control={
//                                 <Checkbox
//                                     color="primary"
//                                 />
//                             } label="Remember me" />
//                         </Grid>
//                         <Grid item>
//                             <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
//                         </Grid>
//                     </Grid>
//                     <Grid container justify="center" style={{ marginTop: '10px' }}>
//                         <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
//                     </Grid>
//                 </div>
//             </Paper>
//         );
//     }
// }

// export default withStyles(styles)(LoginTab);




// import React from 'react';
// import { Card } from '@material-ui/core'

// export default class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: "",
//             password: ""
//         }
//     }

//     render() {
//         return (
//             <Card>
//                 {/* <p>
//                     LoginPage
//                 </p> */}
//                 <form>
//                     <label>Username</label>
//                     <input></input>
//                 </form>
//             </Card>
//         )
//     }
// }