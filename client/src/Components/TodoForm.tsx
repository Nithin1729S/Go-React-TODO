import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from "../App";
import {  useColorMode } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");

    const { colorMode, toggleColorMode } = useColorMode();
    const queryClient=useQueryClient();

	const {mutate:createTodo,isPending:isCreating}=useMutation({
        mutationKey:['createTodo'],
        mutationFn:async(e:React.FormEvent)=>{
            e.preventDefault()
            try{
                const res=await fetch(BASE_URL+'/todos',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({body:newTodo})
                })
                const data = await res.json();
                if (!res.ok){
                    throw new Error(data.error || "Something went wrong")
                }
                setNewTodo("");
                return data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }catch(error:any){
                console.log(error)
            }
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["todos"]});
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError:(error:any)=>{
            alert(error.message)
        }
    })
	return (
		<form onSubmit={createTodo}>
			<Flex gap={2}>
				<Input
					type='text'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					ref={(input) => input && input.focus()}
				/>
				<Button
					type='submit'
					_active={{
						transform: "scale(.97)",
					}}
				>
					{isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
				</Button>
                <Flex alignItems={"center"} gap={3}>
						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
						</Button>
					</Flex>
			</Flex>
		</form>
	);
};
export default TodoForm;