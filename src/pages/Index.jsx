import { useState } from "react";
import { Container, VStack, Input, Button, Text, Heading } from "@chakra-ui/react";

const Index = () => {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  const solveProblem = async () => {
    try {
      const response = await fetch("https://api.mathjs.org/v4/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expr: problem,
        }),
      });

      const data = await response.json();
      setSolution(data.result);
    } catch (error) {
      setSolution("Error solving the problem");
      console.error("Error:", error);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Math Solver</Heading>
        <Input
          placeholder="Enter a math problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          size="lg"
        />
        <Button colorScheme="teal" size="lg" onClick={solveProblem}>
          Solve
        </Button>
        {solution && (
          <Text fontSize="2xl" mt={4}>
            Solution: {solution}
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Index;