import heapq
from itertools import permutations
import copy
from flask import Flask, request,jsonify
import requests

app=Flask(__name__)
def heuristic_cost_estimate(current, goal):
    return abs(current[0] - goal[0]) + abs(current[1] - goal[1])

def astar(graph, start, goal):
    start_val = graph[start[0]][start[1]]
    open_set = [(0, start)]
    came_from = {}
    g_score = {start: 0}

    while open_set:
        current_g, current_node = heapq.heappop(open_set)

        if current_node == goal:
            path = []
            while current_node in came_from:
                path.append(current_node)
                current_node = came_from[current_node]
            path.append(start)
            path = path[::-1]
            return path

        # print("Current node:", current_node)

        for neighbor in neighbors(graph, current_node, start_val=start_val):
            tentative_g = g_score[current_node] + 1
            if neighbor not in g_score or tentative_g < g_score[neighbor]:
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic_cost_estimate(neighbor, goal)
                heapq.heappush(open_set, (f_score, neighbor))
                came_from[neighbor] = current_node

    return None

def neighbors(graph, node, start_val):
    valid_neighbors = []
    rows = len(graph)
    cols = len(graph[0])
    row, col = node
    potential_neighbors = [(row - 1, col), (row + 1, col), (row, col - 1), (row, col + 1)]
    for item in potential_neighbors:
        if abs(item[0]) <= rows - 1 and abs(item[1]) <= cols - 1 and int(row) - 1 >= 0 and int(col) - 1 >= 0 and (
                graph[item[0]][item[1]] == 0 or graph[item[0]][item[1]] == start_val):
            valid_neighbors.append(item)
    # print(f'valid_neigbors:{valid_neighbors}')
    return valid_neighbors

def block_visited(path, updated_graph):
    for item in path:
        if updated_graph[item[0]][item[1]] == 0:
            updated_graph[item[0]][item[1]] = 1

def generate_permutations(n):
    numbers = list(range(n))
    result = list(permutations(numbers))
    return result

def get_start_end(n, graph):
    start_node = []
    goal_node = []
    temp = 2
    dupes = False
    for x in range(0, n):
        for i, rows in enumerate(graph):
            for j, val in enumerate(rows):
                if val == temp:
                    if dupes == False:
                        start_node.append((i, j))
                        dupes = True
                    else:
                        goal_node.append((i, j))
                        dupes = False
        temp += 1
    return start_node, goal_node



@app.route('/find_shortest_path', methods=['POST'])
def find_shortest_path():
    data = request.get_json()
    nodes = data.get('colorCount')
    original_graph = data.get('board')

    start_node, goal_node = get_start_end(nodes, original_graph)
    min_moves_taken = float('inf')
    total_moves = 0
    possible_routes = generate_permutations(nodes)
    global solution
    for item in possible_routes:
        updated_graph = copy.deepcopy(original_graph)
        solution = True

        for val in item:
            path = astar(updated_graph, start=start_node[val], goal=goal_node[val])

            if path is not None:
                block_visited(path=path, updated_graph=updated_graph)
                moves_taken = len(path)
                total_moves += moves_taken
            else:
                solution = False
                total_moves = 0
                break

        if total_moves < min_moves_taken and total_moves != 0:
            min_moves_taken = total_moves


    try:
        response = requests.get('http://www.example.com')
        if response.status_code == 200:
            example_data = response.text
        else:
            example_data = None
    except Exception as e:
        example_data = None

    min_moves_taken = min_moves_taken - 2 * nodes
    return jsonify({'min_moves_taken': min_moves_taken, 'example_data': example_data})

if __name__ == '__main__':
    app.run(debug=True)
