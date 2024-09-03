import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { deleteTask } from "../services/taskService";

const TaskList = ({ tasks, setTasks, onEdit }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask._id)
        .then(() => {
          setTasks(tasks.filter((task) => task._id !== selectedTask._id));
          handleClose();
        })
        .catch((error) => {
          console.error("Failed to delete the task:", error);
        });
    }
  };

  return (
    <>
      <List sx={{ minWidth: "30vw" }}>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
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
                    }}
                  >
                    {task.description}
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
                onClick={() => handleDeleteClick(task)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title" marginBottom={1}>
          Confirmar Exclusão
          <IconButton
            edge="end"
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 9,
              top: 0,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body3">Você realmente deseja excluir esta tarefa?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
