// EmployeeList.js
import './EmployeeList .css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://reqres.in/api/users?page=2');
            setEmployees(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="EmployeeListContainer">
            <input type="text" placeholder="Search by first name" onChange={handleSearch} />
            <Table className="table" bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Full Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>
                                <img className="Avatar" src={employee.avatar} alt="Avatar" />
                            </td>
                            <td>{employee.first_name}&nbsp;{employee.last_name}</td>
                            <td>{employee.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EmployeeList;
