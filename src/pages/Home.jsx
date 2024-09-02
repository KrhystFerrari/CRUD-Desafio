import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask } from "../services/taskService";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, []);

  const handleCreateTask = () => {
    if (editingTask) {
      updateTask(editingTask._id, newTask).then((updatedTask) => {
        setTasks(
          tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        setEditingTask(null);
        setNewTask({ title: "", description: "" });
      });
    } else {
      createTask(newTask).then((task) => {
        setTasks([...tasks, task]);
        setNewTask({ title: "", description: "" });
      });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Task Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "16px" }}>
            <TextField
              label="Task Title"
              fullWidth
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Task Description"
              fullWidth
              multiline
              rows={4}
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTask}
            >
              {editingTask ? "Update Task" : "Add Task"}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <TaskList tasks={tasks} setTasks={setTasks} onEdit={handleEdit} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
