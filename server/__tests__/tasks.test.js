const request = require("supertest");
const app = require("../app");

describe("Tasks API", () => {
  let taskId;

  it("criar nova tarefa", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "Test Description" });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Task");
    taskId = response.body._id;
  });

  it("buscar todas as tarefas", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("atualizar tarefa", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: "Updated Task", description: "Updated Description" });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Task");
  });

  it("deletar tarefa", async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.status).toBe(200);

    const fetchResponse = await request(app).get(`/api/tasks/${taskId}`);
    expect(fetchResponse.status).toBe(404);
  });
});
