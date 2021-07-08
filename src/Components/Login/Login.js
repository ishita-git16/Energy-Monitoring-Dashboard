import React, { useState } from 'react'
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { InputAdornment } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://smartiam.in/">
        Integrated Active Monitering
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(energy-saving.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  logo: {
    maxWidth: 160,
  },
}));
const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePassword, setHidePassWord] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = e => {
    e.preventDefault();
    const loginDetails = {
      email: email,
      password: password,
    }
    axios.post("https://reqres.in/api/login", loginDetails)
      .then(response => {
        localStorage.setItem('JWTtoken', response.data.token);
        window.location.href = "/";
      })
      .catch(error => {
        enqueueSnackbar("error", {
          variant: 'error'
        })
      })
    console.log(loginDetails);
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <div>
            <img src="http://api.smart-iam.com/api/image-store/get-object/test/logo192.png" className={classes.logo} />
          </div><br />
          <br />
          <Avatar className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Login
      </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              onChange={(e) => { setEmail(e.target.value) }}
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
              type={hidePassword ? "password" : "text"}
              id="password"
              onChange={(e) => { setPassword(e.target.value) }}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                      hidePassword ?
                        <VisibilityOffIcon className={classes.showPassword} onClick={() => { setHidePassWord(false) }} /> :
                        <VisibilityIcon className={classes.showPassword} onClick={() => { setHidePassWord(true) }} />
                    }
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
        </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
export default Login
