const express = require("express");
const cors = require("cors");
const app = express();

// Middleware to parse JSON and form data
app.use(express.json()); // To handle JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// Function to check if the graph is a DAG
const isDAG = (edges) => {
  const graph = {};
  const indegree = {};

  // Build the graph and indegree count
  edges.forEach(({ source, target }) => {
    if (!graph[source]) graph[source] = [];
    graph[source].push(target);
    indegree[target] = (indegree[target] || 0) + 1;
    indegree[source] = indegree[source] || 0; // Ensure source is in indegree
  });

  // Perform Kahn's algorithm for cycle detection
  const queue = Object.keys(indegree).filter((node) => indegree[node] === 0);
  let visitedCount = 0;

  while (queue.length) {
    const node = queue.shift();
    visitedCount++;

    if (graph[node]) {
      graph[node].forEach((neighbor) => {
        indegree[neighbor]--;
        if (indegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }
  }

  return visitedCount === Object.keys(indegree).length;
};

// GET endpoint at '/'
app.get("/", (req, res) => {
  res.json({ Ping: "Pong" });
});

// POST endpoint at '/pipelines/parse'
app.post("/pipelines/parse", (req, res) => {
  const { nodes, edges } = req.body; // Destructure nodes and edges
  const numNodes = nodes.length;
  const numEdges = edges.length;
  const isDAGResult = isDAG(edges); // Check if it's a DAG

  console.log("Pipeline:", { numNodes, numEdges, isDAG: isDAGResult });

  res.json({ num_nodes: numNodes, num_edges: numEdges, is_dag: isDAGResult });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
