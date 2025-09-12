import React from 'react';

export const useGreeting = () => {
  const [greeting, setGreeting] = React.useState('');

  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Günaydın');
    else if (hour < 18) setGreeting('İyi öğleden sonra');
    else setGreeting('İyi akşamlar');
  }, []);

  return greeting;
};