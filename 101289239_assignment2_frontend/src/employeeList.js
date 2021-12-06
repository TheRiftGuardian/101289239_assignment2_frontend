import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
	const [ employees, setEmployees ] = useState([]);

	let navigate = useNavigate();

	useEffect(() => {
		axios
			.get('/api/v1/employees')
			.then((res) => {
				setEmployees(res.data);
			})
			.catch((error) => console.log(error));
	}, []);

	const addEmployee = () => {
		navigate('/add');
	};

	const updateEmployee = (id) => {
		navigate(`/update/${id}`);
	};

	const deleteEmployeeByID = (id) => {
		axios.delete(`api/v1/employees/${id}`).then(window.location.reload(false), alert('Employee Removed'));
	};

	const viewEmployee = (id) => {
		navigate(`/view/${id}`);
	};

	return (
		<div>
			<h1>Employee List</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Employee ID</th>
						<th scope="col">Employee First Name</th>
						<th scope="col">Employee Last Name</th>
						<th scope="col">Employee Email Id</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee) => (
						<tr key={employee._id}>
							<td>{employee._id}</td>
							<td>{employee.firstName}</td>
							<td>{employee.lastName}</td>
							<td>{employee.emailId}</td>
							<td>
								<button class="btn btn-info" onClick={() => updateEmployee(employee._id)}>
									Update
								</button>
								<button class="btn btn-danger" onClick={() => deleteEmployeeByID(employee._id)}>
									Delete
								</button>
								<button class="btn btn-info" onClick={() => viewEmployee(employee._id)}>
									View
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button class="btn btn-primary" onClick={addEmployee}>
				Add Employee
			</button>
		</div>
	);
}
