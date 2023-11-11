import React, { useRef, useEffect } from 'react';

const Canvas = ({ selectedImage, selectedTexture }) => {
    const canvasRef = useRef(null);

    const drawImage = (ctx, image, texture) => {
        const img = new Image();
        img.src = image;

        img.onload = () => {
            // Resize the image to 70% of its original size while maintaining aspect ratio
            const newWidth = img.naturalWidth * 0.7;
            const newHeight = img.naturalHeight * 0.7;

            // Set the canvas dimensions
            canvasRef.current.width = newWidth;
            canvasRef.current.height = newHeight;

            // Draw the original image
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            if (texture) {
                const textureImg = new Image();
                textureImg.src = texture;
                textureImg.onload = () => {
                    let textureToUse = textureImg;

                    // Tile the texture if it's smaller than 1500x1500
                    if (textureImg.width < 1500 || textureImg.height < 1500) {
                        textureToUse = tileTexture(textureImg);
                    }

                    // Apply the (tiled) texture
                    ctx.globalAlpha = 0.85; // Adjust for faintness
                    ctx.globalCompositeOperation = 'source-atop';
                    ctx.drawImage(textureToUse, 0, 0, newWidth, newHeight);
                    ctx.globalAlpha = 1.0; // Reset alpha
                    ctx.globalCompositeOperation = 'source-over';

                    enhanceAndOverlayOutlines(ctx, img);
                };
            } else {
                enhanceAndOverlayOutlines(ctx, img);
            }
        };
    };

    const tileTexture = (textureImg) => {
        const scaledWidth = textureImg.width * 0.5;
        const scaledHeight = textureImg.height * 0.5;
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        tempCanvas.width = canvasRef.current.width;
        tempCanvas.height = canvasRef.current.height;

        for (let y = 0; y < tempCanvas.height; y += scaledHeight) {
            for (let x = 0; x < tempCanvas.width; x += scaledWidth) {
                tempCtx.drawImage(textureImg, x, y, scaledWidth, scaledHeight);
            }
        }

        return tempCanvas;
    };

    const enhanceAndOverlayOutlines = (ctx, img) => {
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        const offCtx = offscreenCanvas.getContext('2d');

        offCtx.drawImage(img, 0, 0, width, height);

        const imageData = offCtx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Increase the threshold to be more lenient on what is considered dark/black
        const threshold = 100; // Adjust this value as needed

        for (let i = 0; i < data.length; i += 4) {
            const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];

            if (brightness < threshold) {
                // Enhance and darken outlines
                data[i] = 0;     // Red
                data[i + 1] = 0; // Green
                data[i + 2] = 0; // Blue
                // Apply a thickness effect
                if (i > 4 && data[i - 4 + 3] > 0) {
                    data[i - 4] = 0;     // Red
                    data[i - 4 + 1] = 0; // Green
                    data[i - 4 + 2] = 0; // Blue
                }
            } else {
                data[i + 3] = 0; // Alpha (make transparent)
            }
        }

        offCtx.putImageData(imageData, 0, 0);
        ctx.drawImage(offscreenCanvas, 0, 0, width, height);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (selectedImage) {
            drawImage(context, selectedImage, selectedTexture);
        }
    }, [selectedImage, selectedTexture]);

    return <canvas ref={canvasRef} />;
};

export default Canvas;
