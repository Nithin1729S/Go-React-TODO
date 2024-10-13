import { Box, Flex, useColorModeValue, Text, Container } from "@chakra-ui/react";

export default function Navbar() {

	// Define gradient values based on color mode
	const textGradient = useColorModeValue(
		"linear(to-l, #7928CA, #FF0080)",  // Light mode gradient
		"linear(to-l, #7928CA, #FF0080)"   // Dark mode gradient
	);

	return (
		<Container maxW={"900px"}>
			<Box bg={useColorModeValue("white", "black")} px={4} my={4} borderRadius={"5"}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					{/* LEFT SIDE */}
					<Flex alignItems={"center"} justifyContent={"center"} flexGrow={1}>
						<Text
							fontSize={"4xl"}
							textTransform={"uppercase"}
							fontWeight={"bold"}
							textAlign={"center"}
							my={2}
							bgGradient={textGradient} // Apply the dynamic gradient here
							bgClip='text'
						>
							TODO List
						</Text>
					</Flex>

					{/* RIGHT SIDE */}
					
				</Flex>
			</Box>
		</Container>
	);
}
