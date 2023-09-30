import { jsonServerDal } from './jsonServerDal';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('jsonServerDal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve todos', async () => {
    const todosMock = [{ id: '1', title: 'Test Todo', completed: false, createdAt: new Date(), updatedAt: new Date() }];
    mockedAxios.get.mockResolvedValue({ data: todosMock });

    const todos = await jsonServerDal.getTodos();
    expect(todos).toEqual(todosMock);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/api/todos');
  });

  it('should toggle todo completion status', async () => {
    const id = '1';
    const completed = true;
    mockedAxios.patch.mockResolvedValue({});

    await jsonServerDal.toggleTodo(id, completed);
    expect(mockedAxios.patch).toHaveBeenCalledWith(`http://localhost:3001/api/todos/${id}`, { completed });
  });

  it('should delete a todo', async () => {
    const id = '1';
    mockedAxios.delete.mockResolvedValue({});

    await jsonServerDal.deleteTodo(id);
    expect(mockedAxios.delete).toHaveBeenCalledWith(`http://localhost:3001/api/todos/${id}`);
  });

  it('should create a new todo', async () => {
    const title = 'New Todo';
    mockedAxios.post.mockResolvedValue({});

    await jsonServerDal.createTodo(title);
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3001/api/todos', { title, completed: false });
  });
});
