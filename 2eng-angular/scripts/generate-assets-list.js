const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/assets');
const targetFile = path.join(__dirname, '../src/app/data/service-images.ts');
const categories = ['engenharia', 'diagnostica', 'manutencao', 'especiais'];

const serviceImages = {};

categories.forEach(cat => {
    const catDir = path.join(baseDir, cat);
    if (fs.existsSync(catDir)) {
        const services = fs.readdirSync(catDir);
        services.forEach(serviceId => {
            const serviceDir = path.join(catDir, serviceId);
            if (fs.statSync(serviceDir).isDirectory()) {
                const files = fs.readdirSync(serviceDir);
                // Only get image files
                const images = files.filter(f => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f)).map(f => {
                    return { url: `assets/${cat}/${serviceId}/${f}` };
                });
                serviceImages[serviceId] = images;
            }
        });
    }
});

const content = `// ESTE ARQUIVO É GERADO AUTOMATICAMENTE PELO SCRIPT scripts/generate-assets-list.js
// NÃO EDITE MANUALMENTE! SE ADICIONAR NOVAS IMAGENS, REINICIE O SERVIDOR (NPM START) PARA ATUALIZAR.

export const SERVICE_IMAGES: Record<string, {url: string}[]> = ${JSON.stringify(serviceImages, null, 2)};
`;

// Ensure directory exists
const targetDir = path.dirname(targetFile);
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(targetFile, content);
console.log('Automated images list generated successfully at src/app/data/service-images.ts!');
