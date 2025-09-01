import { useState } from "react";
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
} from "@mui/material";
import { AddCircle, Delete, Edit } from "@mui/icons-material";

export default function InventoryApp() {
  const [items, setItems] = useState([
    { id: 1, name: "Espresso Beans", quantity: 10, unit: "kg" },
    { id: 2, name: "Milk", quantity: 20, unit: "liters" },
    { id: 3, name: "Sugar", quantity: 15, unit: "kg" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });
  const [editItem, setEditItem] = useState(null);

  const handleAdd = () => {
    if (!newItem.name || !newItem.quantity || !newItem.unit) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        name: newItem.name,
        quantity: parseFloat(newItem.quantity),
        unit: newItem.unit,
      },
    ]);
    setNewItem({ name: "", quantity: "", unit: "" });
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditOpen = (item) => {
    setEditItem({ ...item });
  };

  const handleEditChange = (field, value) => {
    setEditItem({ ...editItem, [field]: value });
  };

  const handleEditSave = () => {
    setItems(items.map((item) => (item.id === editItem.id ? editItem : item)));
    setEditItem(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#5D4037" }}
      >
        ☕ Coffee Shop Inventory
      </Typography>

      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Item
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
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
                fullWidth
                label="Unit (kg, L, etc.)"
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
                sx={{ height: "100%" }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} key={item.id}>
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
                    color="primary"
                    onClick={() => handleEditOpen(item)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item.id)}
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
              fullWidth
              margin="dense"
              label="Name"
              value={editItem.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              type="number"
              label="Quantity"
              value={editItem.quantity}
              onChange={(e) => handleEditChange("quantity", e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Unit"
              value={editItem.unit}
              onChange={(e) => handleEditChange("unit", e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditItem(null)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
