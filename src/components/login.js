
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            email: "",
            password: "",
            success: false,
            redirectUser: false,
            redirectAdmin: false,
        }
    }
    onChange = async (event) => {
        var name = event.target.name;
        var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        await this.setState({
            [name]: value
        })
    }

    signIn = (e) => {
        e.preventDefault();
        var user = {
            "username": this.state.email,
            "password": this.state.password
        }
        axios.post(`/user/signin`,user )
            .then(res => {
                if(res.data.succeed === true && this.state.email === "gemtnguyen"){
                    alert("Đăng nhập thành công, chuyển đến trang quản lý user")
                    localStorage.setItem('account', JSON.stringify({
                        username: this.state.email,
                        uid: res.data.message
                    }));
                    this.setState({
                        redirectAdmin: true,
                    })
                }else if(res.data.succeed === true && this.state.email !== "gemtnguyen"){
                    alert("Đăng nhập thành công, chuyển đến trang quản lý contact")
                    localStorage.setItem('account', JSON.stringify({
                        username: this.state.email,
                        uid: res.data.message
                    }));
                    this.setState({
                        redirectUser: true,
                    })
                }else if(res.data.succeed === false){
                    alert("Đăng nhập thất bại, vui lòng kiểm tra lại username và password")
                }
            })
    }
    render() {
        const { classes } = this.props;
        const {redirectAdmin,redirectUser} = this.state;
        if(redirectAdmin === true){
            return <Redirect to="/manage-user" />

        }
        if(redirectUser === true){
            return <Redirect to="/manage-contact" />
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.signIn}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={this.onChange}
                            value={this.state.email}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.onChange}
                            value={this.state.password}
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                    </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn);