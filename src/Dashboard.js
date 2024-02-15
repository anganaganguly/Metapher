import React, {useEffect, useState} from 'react';
import * as ClassService from './ClassService';

const  Dashboard = () => {

    const [classes, setClasses] = useState([]);

    const [newClass, setNewClass] = useState({
        className: '',
        classDescription: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass((prevClass) => ({...prevClass, [name]: value}));
    };

    const handleCreateClass = async () => {
        try {
            const updatedClasses = await ClassService.createClass(newClass);
            setClasses(updatedClasses);
            setNewClass({
                className: '',
                classDescription: ''
            });
        } catch(error) {
            console.error('Error creating class:', error);
        }
    };

    const handleDeleteClass = async (id) => {
        try {
            const updatedClasses = await ClassService.deleteClass(id);
            setClasses(updatedClasses);
        } catch(error) {
            console.error('Error deleting class:', error);
        }
    };

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classesData = await ClassService.getClass();
                setClasses(classesData);
            } catch(error) {
                console.error('Error fetching class:', error);
            }
        };
        fetchClasses();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Create a New Class</h2>
                <form>
                    <label>Class Name:
                        <input
                            type='text'
                            name='className'
                            value={newClass.className}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Description:
                        <input
                            type='text'
                            name='classDescription'
                            value={newClass.classDescription}
                            onChange={handleInputChange}
                        />
                    </label>

                    <button type= "button" onClick={handleCreateClass}>
                        Create Class
                    </button>
                </form>
            </div>

            <div>
                <h2>Classes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Class Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classItem, index) => (
                            <tr key={index}>
                                <td>{classItem.className}</td>
                                <td>{classItem.classDescription}</td>
                                <td>
                                    <button onClick={() => handleDeleteClass(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
                        