const drawBoard = (report, maxWidth, maxHeight) => {
    const { data } = report;
    const canvas = document.getElementById("graph");
    //const axisBuffer = 20;
    canvas.height = maxHeight + 100;
    canvas.width = maxWidth;
    const context = canvas.getContext("2d");

    const width = 30;
    const buffer = 20;
    const i = 0;
    let x = buffer + axisBuffer;
    context.font = "bold 12px sans‑serif";
    context.textAlign = "start";

    data.forEach(item => {
      context.fillStyle = "rgba(0, 0, 200, 0.9)";
      context.fillRect(
        x,
        maxHeight - item[report.y],
        width,
        item[report.y]
      );
      context.fillStyle = "rgba(0, 0, 0, 0.9)";
      context.fillText(item[report.x], x + width / 4, maxHeight + 15);
      x += width + buffer;
    });

}

