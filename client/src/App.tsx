import {Container, Stack } from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import TodoForm from './Components/TodoForm'
import TodoList from './Components/TodoList'

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
