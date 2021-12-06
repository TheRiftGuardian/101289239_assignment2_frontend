import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

export default function ViewEmployee() {
	const [ employee, setEmployee ] = useState([]);

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

	return (
		<div class="text-center">
			<h1 class="h1">View Employee Details</h1>
			<h2 class="h2">ID: {employee._id}</h2>
			<h2 class="h2">First Name: {employee.firstName}</h2>
			<h2 class="h2">Last Name: {employee.lastName}</h2>
			<h2 class="h2">Email Id: {employee.emailId}</h2>
			<button class="btn btn-dark" onClick={() => navigate('/')}>
				Go back
			</button>
		</div>
	);
}
