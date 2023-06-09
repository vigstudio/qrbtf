const fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

export function isPicture(file) {
    return fileTypes.includes(file.type);
}

export function toBase64(file, aspectRatio) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d', {willReadFrequently: true});
    let img = document.createElement('img');
    img.setAttribute('src', URL.createObjectURL(file));

    return new Promise(resolve => {
        img.onload = () => {
            let width, height;
            if (img.width < img.height) {
                width = img.width;
                height = width / aspectRatio;
            }
            else {
                height = img.height;
                width = height * aspectRatio;
            }
            // console.log(width + ' ' + height)
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, (img.width - width) / 2, (img.height - height) / 2, width, height, 0, 0, width, height);

            resolve(canvas.toDataURL(file.type, 0.9));
        };
    })
}

export function gamma(r, g, b) {
    return Math.pow((Math.pow(r, 2.2) + Math.pow(1.5 * g, 2.2) + Math.pow(0.6 * b, 2.2)) / (1 + Math.pow(1.5, 2.2) + Math.pow(0.6, 2.2)), 1 / 2.2)
}
