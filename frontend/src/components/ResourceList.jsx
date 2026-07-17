import ResourceCard from "./ResourceCard";

function ResourceList({ resources, updateResource, deleteResource }) {
  return (
    <section>
      <h2>Saved Study Notes</h2>
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          updateResource={updateResource}
          deleteResource={deleteResource}
        />
      ))}
    </section>
  );
}

export default ResourceList;
