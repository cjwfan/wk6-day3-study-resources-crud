import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <h1>Study Library</h1>
      <p>Save and review study notes for your learning goals.</p>

      <Stack direction="row" spacing={2}>
        <Button component={Link} to="/create" variant="contained">
          Add a Study Note
        </Button>
        <Button component={Link} to="/resources" variant="outlined">
          View Saved Study Notes
        </Button>
      </Stack>
    </section>
  );
}

export default Home;
