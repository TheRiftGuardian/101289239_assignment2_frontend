import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

export default function EditEmployee() {
	const [ employee, setEmployee ] = useState([]);

	const [ _id, setID ] = useState(employee._id);
	const [ firstName, setFirstName ] = useState(employee.firstName);
	const [ lastName, setLastName ] = useState(employee.lastName);
	const [ emailId, setEmail ] = useState(employee.emailId);

	const onChangeEmployeeID = (e) => {
		setID(e.target.value);
	};

	const onChangeEmployeeFName = (e) => {
		setFirstName(e.target.value);
	};

	const onChangeEmployeeLName = (e) => {
		setLastName(e.target.value);
	};

	const onChangeEmployeeEmail = (e) => {
		setEmail(e.target.value);
	};

	let navigate = useNavigate();
	let { id } = useParams();

	useEffect(() => {
		async function getData() {
			await axios.get(`/api/v1/employees/${id}`).then((res) => {
				setEmployee(res.data);
			});
		}
		getData();
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		const newperson = {
			_id: Number(employee._id),
			firstName: firstName,
			lastName: lastName,
			emailId: emailId
		};
		// Setting to old field if left blank, could have done required but this is better with placeholder.
		if (newperson.firstName === '') {
			newperson.firstName = employee.firstName;
		}
		if (newperson.lastName === '') {
			newperson.lastName = employee.lastName;
		}
		if (newperson.emailId === '') {
			newperson.emailId = employee.emailId;
		}
		axios.put(`/api/v1/employees/${employee._id}`, newperson).then((res) => {
			if (res.status === 200) {
				navigate('/', { replace: true });
				alert('Employee resource is updated.');
			} else {
				alert('An error has occured!');
				console.error('An error has occured');
			}
		});
	};

	return (
		<div style={{ marginTop: 20 }}>
			<h3>Update Employee</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Employee's First Name: </label>
					<input
						type="text"
						className="form-control"
						placeholder={employee.firstName}
						onChange={onChangeEmployeeFName}
					/>
				</div>
				<div className="form-group">
					<label>Employee's Last Name: </label>
					<input
						type="text"
						className="form-control"
						placeholder={employee.lastName}
						onChange={onChangeEmployeeLName}
					/>
				</div>

				<div className="form-group">
					<label>Employee's Email: </label>
					<input
						type="email"
						className="form-control"
						placeholder={employee.emailId}
						onChange={onChangeEmployeeEmail}
					/>
				</div>

				<div className="form-group">
					<input type="submit" value="Update Employee" className="btn btn-primary" />
				</div>
			</form>
			<button class="btn btn-dark" onClick={() => navigate('/')}>
				Go back
			</button>
		</div>
	);
}
