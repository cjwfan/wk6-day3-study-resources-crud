import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

function ResourceForm({ addResource }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title || !description || !category) {
      alert("Please fill out all fields.");
      return;
    }

    await addResource({
      title: title,
      description: description,
      category: category,
    });

    setTitle("");
    setDescription("");
    setCategory("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 640 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained">
          Add Note
        </Button>
      </Stack>
    </form>
  );
}

export default ResourceForm;
