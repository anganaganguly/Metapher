const fs = require('fs/promises');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/classess.json');

export const getClasses = async () => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch(error) {
        console.error('Error reading classes:', error);
        throw error;
    }
};

export const createClass = async (newClass) => {
    try {
        const existingClasses = await getClasses();
        const updatedClasses = [...existingClasses, {...newClass, id: existingClasses.length +1}];
        await fs.writeFile(dataFilePath, JSON.stringify(updatedClasses, null, 2));
        return updatedClasses;
    } catch(error) {
        console.error('Error creating class:', error);
        throw error;
    }
};

export const deleteClass = async (id) => {
    try {
        const existingClasses = await getClasses();
        const updatedClasses = existingClasses.filter((classItem) => classItem.id !== id);
        await fs.writeFile(dataFilePath, JSON.stringify(updatedClasses, null, 2));
        return updatedClasses;
    } catch(error) {
        console.error('Error deleting class:', error);
        throw error;
    }
};
