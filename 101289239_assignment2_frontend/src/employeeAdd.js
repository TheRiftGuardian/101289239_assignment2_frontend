import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function AddEmployee() {
	let navigate = useNavigate();

	const [ _id, setID ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ emailId, setEmail ] = useState('');

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

	const onSubmit = (e) => {
		e.preventDefault();
		const newperson = {
			_id: Number(_id),
			firstName: firstName,
			lastName: lastName,
			emailId: emailId
		};
		axios.post('/api/v1/employees', newperson).then((res) => {
			if (res.status === 201) {
				navigate('/', { replace: true });
				alert('A new Employee resource is created.');
			} else {
				alert('An error has occured!');
				console.error('An error has occured');
			}
		});
	};

	return (
		<div style={{ marginTop: 20 }}>
			<h3>Create New Employee</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>ID of The Employee: </label>
					<input type="text" className="form-control" value={_id} onChange={onChangeEmployeeID} required />
				</div>

				<div className="form-group">
					<label>Employee's First Name: </label>
					<input
						type="text"
						className="form-control"
						value={firstName}
						onChange={onChangeEmployeeFName}
						required
					/>
				</div>
				<div className="form-group">
					<label>Employee's Last Name: </label>
					<input
						type="text"
						className="form-control"
						value={lastName}
						onChange={onChangeEmployeeLName}
						required
					/>
				</div>

				<div className="form-group">
					<label>Employee's Email: </label>
					<input
						type="email"
						className="form-control"
						value={emailId}
						onChange={onChangeEmployeeEmail}
						required
					/>
				</div>

				<div className="form-group">
					<input type="submit" value="Create Employee" className="btn btn-primary" />
				</div>
			</form>
			<button class="btn btn-dark" onClick={() => navigate('/')}>
				Go back
			</button>
		</div>
	);
}
