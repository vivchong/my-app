import {
  Box,
  Text,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Avatar,
  Container,
  ModalFooter,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Field, Formik, FormikProps } from 'formik';
import { StoreContext } from '../store/store';

// This is a button that looks like an Input field and opens a "Create Post" modal
// From CreatePost.js
const TextInputBtn = props => {
  // const [context, setContext] = useContext(StoreContext);
  // const { refreshPosts } = context;

  const { refreshPosts, setRefreshPosts } = useContext(StoreContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [post_content, setPost_content] = useState('');
  const sig_id = props.sig_id;
  const user_id = sessionStorage.current_user_id;

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { sig_id, user_id, post_content };
      const newPost = await fetch('http://localhost:5000/discussion_posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      //console.log(JSON.stringify(body));
      setPost_content('');
      // setContext({ refreshPosts: !refreshPosts });
      setRefreshPosts(!refreshPosts)
      console.log('hi' + refreshPosts);
      //window.location = window.location.href;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Box
        as="button"
        transition="0.2s"
        height={10}
        bg="gray.100"
        w="100%"
        borderRadius="lg"
        onClick={onOpen}
        _hover={{ bg: 'gray.200' }}
        color="gray.500"
      >
        <Text textAlign="left" px={4} /* Placeholder text goes here */>
          {props.children}
        </Text>
      </Box>

      <Modal
        closeOnOverlayClick={false}
        size="xl"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setPost_content('');
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              createPost: '',
            }}
            onSubmit={onSubmitForm}
            //   {(values) => {
            //   alert(JSON.stringify(values, null, 2));
            // }}
            //validationSchema={createPostSchema} // validation is handled by Yup
          >
            {({ handleSubmit, values, errors, touched }) => (
              <form onSubmit={onSubmitForm}>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Container display="flex" gap={4} px={0}>
                    <Avatar
                      name={sessionStorage.current_user_display_name}
                      src={sessionStorage.current_user_pic}
                    />

                    <FormControl
                      isInvalid={!!errors.createPost && touched.createPost}
                    >
                      <Field
                        as={Textarea}
                        id="createPost"
                        name="createPost"
                        variant="unstyled"
                        placeholder={props.children}
                        _placeholder={{ opacity: 0.36, color: 'black' }}
                        size="lg"
                        height="220px"
                        // validation is handled by Yup
                        value={post_content}
                        onChange={e => setPost_content(e.target.value)}
                        required
                        validate={value => {
                          let error;
                          if (value.length < 0) {
                            error =
                              "You can't post a discussion without words!";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.createPost}</FormErrorMessage>
                    </FormControl>
                  </Container>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => {
                      onClose();
                      setPost_content('');
                    }}
                    mr={3}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="teal"
                    type="submit"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Post
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TextInputBtn;

// Based on Filled Input in CreatePost
