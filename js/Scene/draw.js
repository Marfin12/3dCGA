function drawLine(ctx, pos1, thick, col) {  
    ctx.beginPath();  
    ctx.lineWidth = thick;
    ctx.strokeStyle = col;
    
    ctx.moveTo(pos1.x1, pos1.y1);
    ctx.lineTo(pos1.x2, pos1.y2);
    ctx.closePath();
    ctx.stroke();
}
