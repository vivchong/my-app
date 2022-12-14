import { Button, useToast } from '@chakra-ui/react';
import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../store/store';

// To use this component, when it is called you need to pass setLoggedIn as props.
// Like this:
// <SignOutButton setLoggedIn={setLoggedIn} />;

const SignOutButton = ({ setLoggedIn }) => {
  //  const [context, setContext] = useContext(StoreContext);
  //  const {
  //    current_user_id,
  //    current_user_display_name,
  //    current_user_pic,
  //    current_user_email,
  // } = context;

  const {
    setCurrent_user_id,
    setCurrent_user_display_name,
    setCurrent_user_pic,
    setCurrent_user_email,
  } = useContext(StoreContext);

  const toast = useToast();
  const resultToast = (status, description) => {
    return toast({
      position: 'bottom-right',
      status: status,
      description: description,
      duration: 3000,
    });
  };

  const navigate = useNavigate();
  const signout = e => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('current_user_display_name');
    // localStorage.removeItem('current_user_pic');
    // localStorage.removeItem('current_user_id');
    // setContext({
    //   current_user_id: '',
    //   current_user_display_name: '',
    //   current_user_pic: '',
    //   current_user_email: '',
    // });
    setCurrent_user_id('');
    setCurrent_user_display_name('');
    setCurrent_user_pic('');
    setCurrent_user_email('');
    setLoggedIn(false);
    resultToast('success', 'Signed out');
    navigate('/');
  };
  return (
    <Fragment>
      <Button onClick={e => signout(e)}>Sign Out</Button>
    </Fragment>
  );
};

export default SignOutButton;
