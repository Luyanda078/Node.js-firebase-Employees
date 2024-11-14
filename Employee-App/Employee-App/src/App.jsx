import React, { useState, useEffect } from 'react';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/employeeList';
import Search from './Components/Search';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  // Load employees from local storage on mount
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  // Save employees to local storage whenever the employees array changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Add or update employee
  const handleAddOrUpdate = (employee) => {
    if (editEmployee) {
      setEmployees(employees.map((emp) => (emp.id === employee.id ? employee : emp)));
      setEditEmployee(null);
    } else {
      setEmployees([...employees, { ...employee, id: Date.now() }]);
    }
  };

  // Delete employee
  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // Handle search result
  const handleSearch = (employee) => {
    setEditEmployee(employee);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Employee Registration</h1>
      <Search employees={employees} onSearch={handleSearch} />
      <EmployeeForm addOrUpdateEmployee={handleAddOrUpdate} editEmployee={editEmployee} />
      <EmployeeList employees={employees} onDelete={handleDelete} onEdit={setEditEmployee} />
    </div>
  );
};

export default App;
