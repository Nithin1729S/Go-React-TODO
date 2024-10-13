import {Container, Stack } from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import TodoForm from './Components/TodoForm'
import TodoList from './Components/TodoList'

export const BASE_URL = "http://127.0.0.1:5000/api"
function App() {
  return (
    <Stack h="100vh">
      <Navbar/>
      <Container>
           <TodoForm/>
          <TodoList/> 
      </Container>
    </Stack>
  )
}

export default App
