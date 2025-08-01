let cropper;
const overlay = document.getElementById('overlay');
const selectionBox = document.getElementById('selectionBox');
let startX, startY, endX, endY;

document.getElementById('startCaptureBtn').addEventListener('click', () => {
    overlay.style.display = 'block';
    document.body.classList.add('no-select');
});

overlay.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    startY = e.pageY;
    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = '0';
    selectionBox.style.height = '0';
    selectionBox.style.display = 'block';
});

overlay.addEventListener('mousemove', (e) => {
    if (selectionBox.style.display === 'block') {
        endX = e.pageX;
        endY = e.pageY;
        selectionBox.style.width = `${Math.abs(endX - startX)}px`;
        selectionBox.style.height = `${Math.abs(endY - startY)}px`;
        selectionBox.style.left = `${Math.min(startX, endX)}px`;
        selectionBox.style.top = `${Math.min(startY, endY)}px`;
    }
});

overlay.addEventListener('mouseup', () => {
    overlay.style.display = 'none';
    selectionBox.style.display = 'none';
    document.body.classList.remove('no-select');
    captureArea(Math.min(startX, endX), Math.min(startY, endY), Math.abs(endX - startX), Math.abs(endY - startY));
});

function captureArea(x, y, width, height) {
    html2canvas(document.body).then(canvas => {
        const croppedCanvas = document.createElement('canvas');
        const context = croppedCanvas.getContext('2d');
        croppedCanvas.width = width;
        croppedCanvas.height = height;
        context.drawImage(canvas, x, y, width, height, 0, 0, width, height);
        const imageDataUrl = croppedCanvas.toDataURL('image/png');
        performOCR(imageDataUrl);
    });
}

function performOCR(imageDataUrl) {
    Tesseract.recognize(
        imageDataUrl,
        'eng',
        {
            logger: info => console.log(info) // Log progress if needed
        }
    ).then(({ data: { text } }) => {
        document.getElementById('right_top').innerText = text;
    }).catch(err => {
        console.error(err);
        document.getElementById('right_top').innerText = 'Error: ' + err.message;
    });
}
