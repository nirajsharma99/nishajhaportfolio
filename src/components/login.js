import TextField from '@material-ui/core/TextField';
import Avatar from '../character.jpg';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase/firebaseConfig';

function LOGIN() {
  const history = useHistory();
  const [email, setEmail] = useState({
    email: '',
    error: false,
    errorText: '',
  });
  const [password, setPassword] = useState({
    password: '',
    error: false,
    errorText: '',
  });
  const [flash, setFlash] = useState(false);

  const showError = (value, error) => value.trim().length === 0 && error;
  const login = () => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var validEmail = emailPattern.test(email.email);
    var validPass = password.password.trim().length > 0;

    if (!validEmail) {
      setEmail({ ...email, error: true, errorText: 'Enter a valid email' });
    }
    if (!validPass) {
      setPassword({ ...password, error: true, errorText: 'Enter password' });
    }
    if (validEmail && validPass) {
      auth
        .signInWithEmailAndPassword(email.email, password.password)
        .then((user) => {
          if (user) {
            setFlash(false);
            history.push('/book');
          }
        })
        .catch(() => {
          setFlash(true);
        });
    }
  };

  return (
    <div className="login-container">
      <Link to={'/'}>
        <button className=" home-btn">
          <i className="fas fa-home"></i>
        </button>
      </Link>
      <div className="d-flex flex-column align-items-center log">
        <img src={Avatar} alt="avatar" width="200px" />
        {flash && (
          <span className="flash text-danger">
            <i className="fas fa-exclamation-circle me-1"></i>Wrong
            Email/Password
          </span>
        )}
        <TextField
          {...(showError(email.email, email.error) && {
            ...{
              error: email.error,
              helperText: email.errorText,
            },
          })}
          value={email.email}
          onChange={(e) => setEmail({ ...email, email: e.target.value })}
          type="email"
          variant="standard"
          label="Email Id"
          className="my-3 field-email"
        />

        <TextField
          {...(showError(password.password, password.error) && {
            ...{
              error: password.error,
              helperText: password.errorText,
            },
          })}
          value={password.password}
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
          type="password"
          variant="standard"
          label="Password"
          className="my-3 field-pass"
        />
        <button onClick={login} className="login-btn">
          Login
        </button>
      </div>
    </div>
  );
}
export default LOGIN;
