import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';

function UserList() {
  const [users, setUsers] = useState([]); 
  const [filter, setFilter] = useState(''); 
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:44320/api/Admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      console.log('getting users:', response.data);
      setUsers(
        response.data.map((user) => ({
          ...user,
          selected: false, 
        }))
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading of user', error.message);
      setError(error.response?.data || 'Error loading');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const toggleUserSelection = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, selected: !user.selected } : user
      )
    );
  };

  
  const toggleSelectAll = () => {
    const areAllSelected = users.every((user) => user.selected);
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({ ...user, selected: !areAllSelected }))
    );
  };

  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  
  const handleBlock = () => {
    const selectedUsers = users.filter((user) => user.selected);
    console.log('Block:', selectedUsers);
  };

  
  const handleDelete = () => {
    const selectedUsers = users.filter((user) => user.selected);
    console.log('delete:', selectedUsers);

    
    setUsers((prevUsers) => prevUsers.filter((user) => !user.selected));
  };

  
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(filter.toLowerCase()) ||
      user.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Users</h1>

      {isLoading && <p>Loading ...</p>} 
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        
        <div>
          <Button variant="primary" className="me-2" onClick={handleBlock}>
            Block
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>

        
        <InputGroup style={{ maxWidth: '300px' }}>
          <Form.Control
            type="text"
            placeholder="search"
            value={filter}
            onChange={handleFilterChange}
          />
        </InputGroup>
      </div>

      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={toggleSelectAll}
                checked={users.length > 0 && users.every((user) => user.selected)}
              />
            </th>
            <th>UserName</th>
            <th>Email</th>
            <th>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={user.selected}
                  onChange={() => toggleUserSelection(user.id)}
                />
              </td>
              <td>{user.userName || 'N/A'}</td>
              <td>{user.email || 'N/A'}</td>
              <td>{user.lastLoginTime || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
