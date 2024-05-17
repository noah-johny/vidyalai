import React from 'react';
import styled from '@emotion/styled';
import useUserData from '../hooks/useUserData';

const Table = styled.table(() => ({
  width: '100%',
  borderCollapse: 'collapse',
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  '.sort-icon': {
    verticalAlign: 'middle',
    marginLeft: '5px',
  },
}));

const columnFields = [
  { value: 'id', label: 'Id' },
  { value: 'name', label: 'Name', enableSearch: true },
  { value: 'email', label: 'Email', enableSearch: true },
  { value: 'username', label: 'Username' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
];

function UserList() {
  const userData = useUserData(columnFields);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {userData.columnFields.map(field => (
              <th key={field.value}>
                <div onClick={() => userData.handleSort(field.value)}>
                  {field.label}
                  {userData.sortColumn === field.value &&
                    (userData.sortDirection === 'asc' ? (
                      <span className="sort-icon">▲</span>
                    ) : (
                      <span className="sort-icon">▼</span>
                    ))}
                </div>
                {field.enableSearch && (
                  <input
                    type="text"
                    placeholder={`Search by ${field.label}`}
                    name={field.value}
                    onChange={userData.handleOnSearch}
                    style={{ padding: 6, width: 200 }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.users.map(user => (
            <tr key={user.id}>
              {userData.columnFields.map(field => (
                <td key={field.value}>{user[field.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
