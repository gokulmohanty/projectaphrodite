import React, { useRef, useEffect } from 'react';

const Canvas = ({ selectedImage, selectedTexture, selectedOutline, selectedColor }) => {
    const canvasRef = useRef(null);

    const drawImage = (ctx, image, texture, outline) => {
        const img = new Image();
        img.src = image;
        console.log(image)
        img.onload = () => {
            console.log("HEREEE")
            const newWidth = img.naturalWidth * 0.7;
            const newHeight = img.naturalHeight * 0.7;
            canvasRef.current.width = newWidth;
            canvasRef.current.height = newHeight;

            // Draw the original image
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Apply texture if available
            if (texture) {
                applyTexture(ctx, texture, newWidth, newHeight);
            }

            // Overlay outline image if available
            if (outline) {
                overlayOutline(ctx, outline, newWidth, newHeight);
            }
        };
    };

    const applyTexture = (ctx, texture, width, height) => {
        const textureImg = new Image();
        textureImg.src = texture;

        textureImg.onload = () => {
            let textureToUse = textureImg;

            // Tile the texture if it's smaller than 1500x1500
            if (textureImg.width < 1500 || textureImg.height < 1500) {
                textureToUse = tileTexture(textureImg, width, height);
            }

            // Apply the (tiled) texture
            ctx.globalAlpha = 0.85; // Adjust for faintness
            ctx.globalCompositeOperation = 'source-atop';
            ctx.drawImage(textureToUse, 0, 0, width, height);

            // Apply color filter to texture
            if (selectedColor) {
                // Apply color filter using the same composite operation
                applyColorFilter(ctx, selectedColor, width, height);
            }

            // Reset alpha and composite operation
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';
        };
    };

    const overlayOutline = (ctx, outline, width, height) => {
        const outlineImg = new Image();
        outlineImg.src = outline;
        outlineImg.onload = () => {
            ctx.drawImage(outlineImg, 0, 0, width, height);
        };
    };

    const tileTexture = (textureImg, width, height) => {
        const scaledWidth = textureImg.width * 0.25;
        const scaledHeight = textureImg.height * 0.25;
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        tempCanvas.width = width;
        tempCanvas.height = height;

        for (let y = 0; y < tempCanvas.height; y += scaledHeight) {
            for (let x = 0; x < tempCanvas.width; x += scaledWidth) {
                tempCtx.drawImage(textureImg, x, y, scaledWidth, scaledHeight);
            }
        }

        return tempCanvas;
    };

    const applyColorFilter = (ctx, color, width, height) => {
        if (color) {
            ctx.globalAlpha = 0.4; // Adjust the opacity for the shading effect
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
            ctx.globalAlpha = 1.0; // Reset the opacity
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (selectedImage) {
            drawImage(context, selectedImage, selectedTexture, selectedOutline);
        }
    }, [selectedImage, selectedTexture, selectedOutline, selectedColor]);

    return <canvas ref={canvasRef} />;
};

export default Canvas;