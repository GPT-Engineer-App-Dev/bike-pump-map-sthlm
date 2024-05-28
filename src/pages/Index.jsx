import { Box, Container, Text, VStack } from "@chakra-ui/react";
import Map from "../components/Map";

const Index = () => {
  return (
    <Box>
      <Box as="nav" bg="blue.500" color="white" p={4}>
        <Text fontSize="xl" fontWeight="bold">Stockholm Bike Pump Stations</Text>
      </Box>
      <Container maxW="container.xl" p={0}>
        <Map />
      </Container>
    </Box>
  );
};

export default Index;