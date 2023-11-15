import { Container } from 'react-bootstrap'
import { TodoFilters } from './modules/components';
import { TodoProvider } from './modules/context';

export const App = () => (
  <Container className='mt-2 text-center' style={{ maxWidth: '512px' }}>
    <TodoProvider>
      <h1>React Todo App</h1>
      <TodoForm />
      <TodoFilters />
      <TodoList />
      <TodoControls />
    </TodoProvider>
  </Container>
)
