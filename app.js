import Node from "./node.js"
const canv = document.querySelector("canvas")
const ctx = canv.getContext("2d")
const saveButton = document.querySelector("button")

canv.width = window.innerWidth
canv.height = window.innerHeight * 0.9

let mx = 0, my = 0
addEventListener("mousemove", e => {
    mx = e.clientX
    my = e.clientY
})

saveButton.addEventListener("click", e => {
    for (let n of nodes) {
        
    }
})

let isClicking = false
let pClicking = false
let bfsClick = false
let dfsClick = false
addEventListener("mousedown", e => { isClicking = true })
addEventListener("mouseup", e => { isClicking = false })
addEventListener("keydown", e => { 
    if (e.key == "p") pClicking = true
    if (e.key == "b") bfsClick = true
    if (e.key == "d") dfsClick = true
})
addEventListener("keyup", e => {
     if (e.key == "p") pClicking = false
     if (e.key == "b") bfsClick = false
     if (e.key == "d") dfsClick = false
})

let nodes = []
let midClick = false
let count = 1
let startPlacing = false
let startNode = null
let endNode = null

function djikstra() {
    
}

function getWeight(n1, n2) {
    let weight = Math.round(Math.sqrt((n1.x - n2.x) * (n1.x - n2.x) + (n1.y - n2.y) * (n1.y - n2.y))/35) + 1
    console.log("weight: " + weight)
    return weight;
}
function connectNodes(n1, n2) {
    n1.connectedNodes.push([getWeight(n1, n2), n2])
}
function getNeighbors(node) {
    return node.connectedNodes.map(n => n[1])
}
let bfsStarted = false
let toVisit = []
let waitTimer = 0
function bfs(graph, s) {
    if (waitTimer % 5 == 0) {
        // make thsi run once
        toVisit.unshift(s)
        search(toVisit)
    }
}

let dfsVisited = []
let dfsDone = false
let dfsStarted = false
function dfs(graph, s) {
    // make this run once also
    if (waitTimer%15 == 0) {
        if (!dfsStarted) {
            dfsVisited.push(s)
            s.visited = "dfs"
            dfsStarted = true
        }
        if (dfsVisited.length != 0) {
            let curr = dfsVisited.pop()
            curr.visited = "dfs"
            for (let n of getNeighbors(curr)) {
                if (n.visited != "dfs") {
                    // n.visited = true
                    dfsVisited.push(n)
                }
            }

        }

    }

}

let bfsDone = false
function search(toVisit) {
    if (toVisit.length != 0) {
        let curr = toVisit.pop()
        curr.visited = "bfs"
        for (let n of getNeighbors(curr)) {
            toVisit.unshift(n);
        }
    } else {
        bfsDone = true
    }
}
function loop() {
    ctx.fillStyle = "rgba(50, 50, 50, 1)" 
    ctx.fillRect(0, 0, canv.width, canv.height)
    waitTimer++
    if (isClicking) {
        midClick = true
    }
    if (bfsClick && !bfsDone) {
        // bfsStarted = true
        bfs(nodes, nodes[0])
    }
    if (dfsClick && !dfsDone) {
        dfs(nodes, nodes[0])
    }
    if (midClick && !isClicking) {
        midClick = false
        nodes.push(new Node(mx, my, count))
        count += 1
    }
    for (let node of nodes) {
        let dis = Math.sqrt((node.x - mx)*(node.x - mx) + (node.y - my)*(node.y - my))
        if (dis < node.r) {
            node.hover = true
            if (pClicking && !startPlacing) {
                startPlacing = true
                startNode = node
            }
            if (!pClicking && startPlacing) {
                endNode = node
                startPlacing = false
                console.log(`connected: ${startNode.val} with ${endNode.val}`)
                connectNodes(startNode, endNode);
            }
        } else {
            node.hover = false
        }
    }
    nodes.forEach(n => { n.draw(ctx) })
    // nodes.forEach(n => { n.update() })
}


let timeInt = setInterval(loop, 17)