export default class Node {
    constructor(x, y, val) {
        this.x = x
        this.y = y
        this.r = 30
        this.val = val
        this.hover = false
        this.connectedNodes = []
        this.visited = false
        this.visitedTwice = false
        this.shortest = Infinity
    }
    draw(ctx) {
        ctx.fillStyle = this.hover ? "rgb(250, 100, 50)" : "rgb(50, 100, 250)"
        if (this.visited == "dfs") ctx.fillStyle = "rgb(255, 255, 100)"
        if (this.visited == "bfs") ctx.fillStyle = "rgb(255, 0, 255)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.fillText(this.val, this.x, this.y)
        ctx.fillText(this.shortest, this.x, this.y+20)

        ctx.fillStyle = "black"
        this.connectedNodes.forEach(n => {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(n[1].x, n[1].y)
            ctx.stroke();
            ctx.fillStyle = "white"
            let midWay = this.getMidWay(n[1])
            ctx.fillText(n[0], midWay[0], midWay[1])
            // console.log(n[0], midWay)
        })
    }
    getMidWay(node) {
        let vec = [node.x - this.x, node.y - this.y]
        return [vec[0]/2 + this.x, vec[1]/2 + this.y]
    }
}