import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function ResourceCard({ resource, updateResource, deleteResource }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(resource.title);
  const [description, setDescription] = useState(resource.description);
  const [category, setCategory] = useState(resource.category);

  useEffect(() => {
    setTitle(resource.title);
    setDescription(resource.description);
    setCategory(resource.category);
  }, [resource]);

  async function handleSave() {
    if (!title || !description || !category) {
      alert("Please fill out all fields.");
      return;
    }

    await updateResource(resource.id, {
      title: title,
      description: description,
      category: category,
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(resource.title);
    setDescription(resource.description);
    setCategory(resource.category);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <article>
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
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </article>
    );
  }

  return (
    <article>
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <p>{resource.category}</p>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteResource(resource.id)}
        >
          Delete
        </Button>
      </Stack>
    </article>
  );
}

export default ResourceCard;
