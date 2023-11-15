import path from 'path';
const cwd = process.cwd();

export const resolvePath = (filePath) => {
    return path.resolve(cwd, filePath);
};
