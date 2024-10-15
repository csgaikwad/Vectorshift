import React from "react";
import axios from "axios"; // Import axios
import { useStore } from "./store";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    console.log(nodes, edges);
    const pipeline = { nodes, edges };

    try {
      const response = await axios.post(
        "http://localhost:5000/pipelines/parse",
        pipeline,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(
        <>
          Number of Nodes: {response.data.num_nodes}
          <br />
          Number of Edges: {response.data.num_edges}
          <br />
          Is DAG: {response.data.is_dag ? "Yes" : "No"}
        </>
      );
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Error during submission. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        className="w-28 h-10 rounded-md border-2 border-purple-300 bg-purple-100 text-purple-500 font-semibold outline-none hover:text-purple-600 hover:bg-purple-200 transition-all duration-150"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default SubmitButton;
