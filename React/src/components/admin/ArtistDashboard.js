import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faUserCheck } from '@fortawesome/free-solid-svg-icons';

const ArtistDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [accounts, setAccounts] = useState([  // Define accounts state
    {
      id: 1,
      name: 'elle',
      registration: 'July 9, 2022',
      usertype: 'listener',
      status: 'banned'
    },
    {
      id: 2,
      name: 'nico',
      registration: 'July 24, 2022',
      usertype: 'listener',
      status: 'pending verification'
    },
    {
      id: 3,
      name: 'lesh',
      registration: 'July 1, 2022',
      usertype: 'artist',
      status: 'active'
    },
    {
      id: 4,
      name: 'ja9',
      registration: 'July 20, 2022',
      usertype: 'artist',
      status: 'active'
    },
    {
      id: 5,
      name: 'cla',
      registration: 'July 20, 2022',
      usertype: 'listener',
      status: 'active'
    }
  ]);
  
  const navigate = useNavigate(); 

  const handleBanClick = (accountId) => {
    setAccounts(accounts.map(account => (
      account.id === accountId ? { ...account, status: 'banned' } : account
    )));
  };

  const handleUnbanClick = (accountId) => {
    setAccounts(accounts.map(account => (
      account.id === accountId ? { ...account, status: 'active' } : account
    )));
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,

    },
    {
      name: 'Registration Date',
      selector: row => row.registration,
      sortable: true,
      sortFunction: (a, b) => {
        const dateA = new Date(a.registration);
        const dateB = new Date(b.registration);
        return dateA - dateB;
    },
    
      name: 'Usertype',
      selector: row => row.usertype,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => <span style={{ color: getStatusColor(row.status) }}>{row.status}</span>
    },
    {
      name: 'Action',
      cell: row => (
        <div>
          {row.status !== 'banned' ?
            <FontAwesomeIcon icon={faUserSlash} onClick={() => handleBanClick(row.id)} style={{ cursor: 'pointer' }} /> :
            <FontAwesomeIcon icon={faUserCheck} onClick={() => handleUnbanClick(row.id)} style={{ cursor: 'pointer' }} />
          }
        </div>
      )
    }
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending verification':
        return 'orange';
      case 'banned':
        return 'red';
      default:
        return 'black';
    }
  };
  const [records, setRecords] = useState(accounts);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filter accounts based on search text
  const filteredAccounts = accounts.filter(account =>
    Object.values(account).some(val =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );
  return (
    <div>
      <div className="artist-dashboard">
        <div className="sidebar">
          <div className="admin-name">Admin Name</div>
          <ul>
            <li>Category</li>
            <li>Artist Dashboard</li>
            <li>Listener's Page</li>
            <li>Statistic Report</li>
            <li>Subscription</li>
            <li>Disabled Accounts</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search accounts..."
        value={searchText}
        onChange={handleSearchChange}
        style={{ marginBottom: '100px' }}
      />
      <DataTable
        columns={columns}
        data={filteredAccounts}
        searchable={true}
        pagination
        striped
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
}

export default ArtistDashboard;