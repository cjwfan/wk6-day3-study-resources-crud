import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ResourceForm from "./components/ResourceForm";
import ResourceList from "./components/ResourceList";
import Navbar from "./components/Navbar";
import "./App.css";

const API_URL = "http://127.0.0.1:5000/api/study-library";

function App() {
  const [resources, setResources] = useState([]);
  const [message, setMessage] = useState("");

  async function getResources() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not load study library");
      }

      setResources(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addResource(newResource) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResource),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not add study resource");
      }

      setResources((currentResources) => [...currentResources, data]);
      setMessage("Note saved.");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateResource(resourceId, updatedResource) {
    try {
      const url = API_URL + "/" + resourceId;
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedResource),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not update study resource");
      }

      setResources((currentResources) =>
        currentResources.map((resource) =>
          resource.id === resourceId ? data : resource
        )
      );
      setMessage("Study note updated.");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteResource(resourceId) {
    try {
      const url = API_URL + "/" + resourceId;
      const res = await fetch(url, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not delete study resource");
      }

      setResources((currentResources) =>
        currentResources.filter((resource) => resource.id !== resourceId)
      );
      setMessage("Study note deleted.");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getResources();
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/create"
          element={
            <div>
              <Navbar />
              <h1>Add a Study Note</h1>
              <ResourceForm addResource={addResource} />
              {message && <p>{message}</p>}
            </div>
          }
        />
        <Route
          path="/resources"
          element={
            <div>
              <Navbar />
              {message && <p>{message}</p>}
              <ResourceList
                resources={resources}
                updateResource={updateResource}
                deleteResource={deleteResource}
              />
            </div>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
