import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import EmployeeList from './employeeList';
import ViewEmployee from './employeeDetails';
import AddEmployee from './employeeAdd';
import EditEmployee from './employeeEdit';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
	render() {
		return (
			<div>
				<nav class="navbar navbar-dark bg-dark">
					<span class="navbar-brand mb-0 h1">Employment Management App</span>
				</nav>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<EmployeeList />} />,
						<Route path="/update/:id" element={<EditEmployee />} />,
						<Route path="/add" element={<AddEmployee />} />,
						<Route path="/view/:id" element={<ViewEmployee />} />
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
}
