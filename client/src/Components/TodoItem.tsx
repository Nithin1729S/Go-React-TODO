import { Badge, Box, Flex, Spinner, Text,useColorModeValue } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";


const TodoItem = ({ todo }: { todo: Todo }) => {
    const queryClient=useQueryClient();
    const {mutate:updateTodo,isPending:isUpdating}=useMutation({     
        mutationKey:["updateTodo"],
        mutationFn:async()=>{
            if(todo.completed)return alert("Todo is already completed")
            try{
                const res=await fetch(BASE_URL+`/todos/${todo._id}`,{
                    method:"PATCH",
                })
                const data =await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data
            }catch(error){
                console.log(error)
            }
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["todos"]})
        }
    })

    const {mutate:deleteTodo,isPending:isDeleting}=useMutation({     
        mutationKey:["deleteTodo"],
        mutationFn:async()=>{
            try{
                const res=await fetch(BASE_URL+`/todos/${todo._id}`,{
                    method:"DELETE",
                })
                const data =await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data
            }catch(error){
                console.log(error)
            }
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["todos"]})
        }
    })

    const completedTextColor = useColorModeValue("black", "green.400"); // Light and dark mode colors for completed text
    const incompleteTextColor = useColorModeValue("black", "yellow.300"); // Light and dark mode colors for incomplete text

	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={"gray.600"}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
			>
				<Text
					color={todo.completed ? completedTextColor : incompleteTextColor} // Use the dynamic color based on completed status
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>
				{todo.completed && (
					<Badge ml='1' colorScheme='green'>
						Completed
					</Badge>
				)}
				{!todo.completed && (
					<Badge ml='1' colorScheme='yellow'>
						Ongoing
					</Badge>
				)}
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box color={"green.500"} cursor={"pointer"} onClick={()=>updateTodo()}>
					{ !isUpdating &&  <FaCheckCircle size={20} />}
					{ isUpdating &&  <Spinner size={"sm"} />}
				</Box>
				<Box color={"red.500"} cursor={"pointer"} onClick={()=>deleteTodo()}>
					{!isDeleting && <MdDelete size={25} />}
					{isDeleting && <Spinner size={"sm"} />}
				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;