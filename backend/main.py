# from fastapi import FastAPI, Form

# app = FastAPI()

# @app.get('/')
# def read_root():
#     return {'Ping': 'Pong'}

# @app.post('/pipelines/parse')
# def parse_pipeline(pipeline: str = Form(...)):
#     return {'status': 'parsed'}


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Data model for pipeline
class Pipeline(BaseModel):
    nodes: List[str]
    edges: List[Dict[str, str]]  # Each edge is a dict with source and target

# Function to check if the graph is a DAG
def is_dag(edges: List[Dict[str, str]]) -> bool:
    graph = {}
    indegree = {}

    # Build the graph and indegree count
    for edge in edges:
        source, target = edge['source'], edge['target']
        if source not in graph:
            graph[source] = []
        graph[source].append(target)
        indegree[target] = indegree.get(target, 0) + 1
        indegree[source] = indegree.get(source, 0)  # Ensure source is in indegree

    # Perform Kahn's algorithm for cycle detection
    queue = [node for node in indegree if indegree[node] == 0]
    visited_count = 0

    while queue:
        node = queue.pop(0)
        visited_count += 1

        if node in graph:
            for neighbor in graph[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)

    return visited_count == len(indegree)  # If all nodes were visited

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.edges)  # Check if it's a DAG

    print("Pipeline:", {"numNodes": num_nodes, "numEdges": num_edges, "isDAG": is_dag_result})

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag_result}

# To run the FastAPI app, use the command:
# uvicorn filename:app --reload
