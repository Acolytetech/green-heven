import createClient  from "@sanity/client";

 const Sanity = createClient({
  projectId: "o6i5j6ls",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export default Sanity;

