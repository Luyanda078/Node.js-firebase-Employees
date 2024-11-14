import React from 'react';

const EmployeeList = ({ employees, onDelete, onEdit }) => {
  return (
    <div>
      <h3>Employee List</h3>
      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.position}</td>
                <td>
                  <img src={employee.image} alt={employee.name} width="50" />
                </td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => onEdit(employee)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
