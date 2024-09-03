import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteTask } from "../services/taskService";

const TaskList = ({ tasks, setTasks, onEdit }) => {
  const theme = useTheme();

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete the task:", error);
      });
  };

  return (
    <List sx={{ minWidth: "30vw" }}>
      {tasks.map((task) => {
        const truncatedDescription =
          task.description.length > 120
            ? task.description.substring(0, 120) + "..."
            : task.description;
        return (
          <ListItem
            key={task._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Box sx={{ flexGrow: 1, maxWidth: "80%" }}>
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "semi-bold",
                      textTransform: "capitalize",
                      marginBottom: "4px",
                    }}
                  >
                    {task.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                      wordWrap: "break-word",
                    }}
                  >
                    {truncatedDescription}
                  </Typography>
                }
              />
            </Box>
            <Box>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(task)}
              >
                <EditIcon
                  color={theme.palette.mode === "dark" ? "info" : "action"}
                />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(task._id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TaskList;
