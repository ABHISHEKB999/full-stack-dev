const request = require('supertest');
const app = require('./app'); // Assuming your Express app is exported from app.js

describe('Task API', () => {
  let taskId;

  test('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description',
        status: 'To Do',
        dueDate: '2023-12-31'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Task');
    taskId = response.body.id;
  });

  test('should get all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('should update a task', async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'In Progress',
        dueDate: '2024-01-01'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Task');
  });

  test('should delete a task', async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(204);
  });
});
