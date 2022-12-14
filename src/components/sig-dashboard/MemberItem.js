import { StarIcon } from '@chakra-ui/icons';
import { HStack, Avatar, VStack, Heading, Text, } from '@chakra-ui/react';

const MemberItem = props => {
  return (
    <HStack spacing={4} pb={5} alignItems="center">
      <Avatar size="sm" name={props.name} />

      <VStack alignItems="left" spacing={0}>
        <HStack spacing="6px">
          <Heading as="h6" fontSize="md" fontWeight="medium" color="gray.700">
            {props.name}
          </Heading>
          {props.role !== 1 ? (
            <StarIcon w={3} h={3} color="teal.500" />
          ) : (
            <></>
          )}
        </HStack>
        {props.role !== 1 ? (
          <Text fontSize="sm" color="gray.500">
            SIG {props.role === 3 ? 'Owner' : 'Leader'}
          </Text>
        ) : (
          <></>
        )}
      </VStack>
    </HStack>
  );
};

export default MemberItem;
