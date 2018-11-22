import React from 'react';
import { useLocation } from 'hooks/location.hooks';
import { useOnMount } from 'hooks/lifecycle.hooks';
import { useFormField } from 'hooks/form.hooks';

const Home = () => {
  const [location, getLocation] = useLocation();
  useOnMount(getLocation);
  const emailField = useFormField('user.email');
  const passwordField = useFormField('user.password');

  return (
    <div className="App">
      {getMessage(location)}
      <header className="App-header">
        <h1 className="App-title">Redux Hooks Example</h1>
      </header>
      <div className="main-page">
        <form>
          <label>
            Email
            <input
              {...emailField}
              placeholder="Your email address"
              type="email"
            />
          </label>
          <label>
            Password
            <input
              {...passwordField}
              placeholder="Your password"
              type="password"
            />
          </label>
        </form>
      </div>
    </div>
  );
};

const getMessage = location => {
  if (!location) {
    return null;
  }
  const { loading, error, position } = location;
  if (loading) {
    return 'loading location';
  }
  return error || `${position.coords.latitude}, ${position.coords.longitude}`;
};

export default Home;
