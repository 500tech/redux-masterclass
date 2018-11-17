import { useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    setLocation({ loading: true });

    const onSuccess = position => {
      setLocation({ loading: false, position });
    };

    const onError = error => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setLocation({
            loading: false,
            error: 'User denied the request for Geolocation.'
          });
          break;
        case error.POSITION_UNAVAILABLE:
          setLocation({
            loading: false,
            error: 'Location information is unavailable.'
          });
          break;
        case error.TIMEOUT:
          setLocation({
            loading: false,
            error: 'The request to get user location timed out.'
          });
          break;
        default:
          setLocation({ loading: false, error: 'An unknown error occurred.' });
          break;
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setLocation({
        loading: false,
        error: 'Geolocation is not supported by this browser'
      });
    }
  };

  return [location, getLocation];
};
