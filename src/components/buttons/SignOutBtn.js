import { Button, useToast } from '@chakra-ui/react';
import { Fragment } from 'react';

// To use this component, when it is called you need to pass setLoggedIn as props.
// Like this:
// <SignOutButton setLoggedIn={setLoggedIn} />;


const SignOutButton = ({ setLoggedIn }) => {
  const toast = useToast();
  const resultToast = (status, description) => {
    return toast({
      position: 'bottom-right',
      status: status,
      description: description,
      duration: 3000,
    });
  };

  const signout = e => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('current_user_display_name');
    // localStorage.removeItem('current_user_pic');
    // localStorage.removeItem('current_user_id');
    setLoggedIn(false);
    resultToast('success', 'Signed out');
  };
  return (
    <Fragment>
      <Button onClick={e => signout(e)}>Sign Out</Button>
    </Fragment>
  );
};

export default SignOutButton;