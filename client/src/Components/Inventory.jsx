import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import axios from "axios";

export default function InventoryApp() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const apiUrl = "https://inventory-management-g476.onrender.com";

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/items`);
        setItems(res.data);
      } catch (err) {
        setError("Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  console.log("API URL:", apiUrl); // Debugging line

  const handleAdd = async () => {
    if (!newItem.name || !newItem.quantity || !newItem.unit) return;
    try {
      const res = await axios.post(`${apiUrl}/items`, newItem);
      setItems([...items, res.data]);
      setNewItem({ name: "", quantity: "", unit: "" });
      setSuccess("Item added successfully!");
    } catch (err) {
      setError("Failed to add item.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
      setSuccess("Item deleted successfully!");
    } catch (err) {
      setError("Failed to delete item.");
    }
  };

  const handleEditOpen = (item) => {
    setEditItem({ ...item });
  };

  const handleEditChange = (field, value) => {
    setEditItem({ ...editItem, [field]: value });
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put(`${apiUrl}/items/${editItem._id}`, editItem);
      setItems(items.map((i) => (i._id === res.data._id ? res.data : i)));
      setEditItem(null);
      setSuccess("Item updated successfully!");
    } catch (err) {
      setError("Failed to update item.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#899281", py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#ffffffff" }}
      >
        Coffee Shop Inventory
      </Typography>

      {/* Loading */}
      {loading && (
        <Grid container justifyContent="center" sx={{ py: 4 }}>
          <CircularProgress sx = {{color: "#ffff"}} />
        </Grid>
      )}

      {/* Error Alert */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>

      {/* Add Item */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Item
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#899281", // Changes the focused border color
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#899281", // Changes the focused label color
                  },
                }}
                fullWidth
                label="Item"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#899281", // Changes the focused border color
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#899281", // Changes the focused label color
                  },
                }}
                fullWidth
                type="number"
                label="Quantity"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#899281", // Changes the focused border color
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#899281", // Changes the focused label color
                  },
                }}
                fullWidth
                label="Unit (kg, lbs, boxes etc.)"
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem({ ...newItem, unit: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddCircle />}
                onClick={handleAdd}
                sx={{
                  backgroundColor: "#899281",
                  color: "#fffff",
                  height: "100%",
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Item List */}
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} key={item._id}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.quantity} {item.unit}
                  </Typography>
                </div>
                <div>
                  <IconButton
                    sx={{ color: "#385a40ff" }}
                    onClick={() => handleEditOpen(item)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "#c94509ff" }}
                    onClick={() => handleDelete(item._id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open={true} onClose={() => setEditItem(null)}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#899281", // Changes the focused border color
                  },
                },
                "& label.Mui-focused": {
                  color: "#899281", // Changes the focused label color
                },
              }}
              fullWidth
              margin="dense"
              label="Name"
              value={editItem.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#899281", // Changes the focused border color
                  },
                },
                "& label.Mui-focused": {
                  color: "#899281", // Changes the focused label color
                },
              }}
              fullWidth
              margin="dense"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              label="Quantity"
              value={editItem.quantity}
              onChange={(e) => handleEditChange("quantity", e.target.value)}
            />
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#899281", // Changes the focused border color
                  },
                },
                "& label.Mui-focused": {
                  color: "#899281", // Changes the focused label color
                },
              }}
              fullWidth
              margin="dense"
              label="Unit"
              value={editItem.unit}
              onChange={(e) => handleEditChange("unit", e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "#899281",
                color: "#fffff",
                height: "100%",
              }}
              variant="contained"
              onClick={handleEditSave}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
