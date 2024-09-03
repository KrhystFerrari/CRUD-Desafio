import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask } from "../services/taskService";

const Home = () => {
  const theme = useTheme();
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={600}
        marginBottom={4}
        textAlign={"center"}
        gutterBottom
      >
        Organizador de Tarefas
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: "20px" }}>
            <TextField
              label="Nome da Tarefa"
              fullWidth
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Descrição da Tarefa"
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
              onClick={handleCreateTask}
              color={theme.palette.mode === "dark" ? "info" : "primary"}
            >
              {editingTask ? "Atualizar" : "Adicionar"}
            </Button>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TaskList tasks={tasks} setTasks={setTasks} onEdit={handleEdit} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
