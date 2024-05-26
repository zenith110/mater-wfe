// src/components/assets/AssetViewAll.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { matchSorter } from 'match-sorter';
import '../common/common.css';

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const fuzzyTextFilterFn = (rows, id, filterValue) => {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
};

fuzzyTextFilterFn.autoRemove = val => !val;

const AssetTable = ({ assets }) => {
  const data = useMemo(() => assets, [assets]);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Filter: DefaultColumnFilter,
        filter: 'fuzzyText',
      },
      {
        Header: 'Description',
        accessor: 'description',
        Filter: DefaultColumnFilter,
        filter: 'fuzzyText',
      },
      {
        Header: 'Serial Number',
        accessor: 'asset_sn',
        Filter: DefaultColumnFilter,
        filter: 'fuzzyText',
      },
      {
        Header: 'Acquired Date',
        accessor: 'acquired_date',
        Filter: DefaultColumnFilter,
        filter: 'fuzzyText',
      },
      {
        Header: 'Status',
        accessor: 'asset_status',
        Filter: DefaultColumnFilter,
        filter: 'fuzzyText',
      },
      {
        Header: 'Image',
        accessor: 'image_path',
        Cell: ({ cell: { value } }) => (value ? <img src={value} alt="Asset" style={{ width: '50px' }} /> : null),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes: {
        fuzzyText: fuzzyTextFilterFn,
      },
    },
    useFilters,
    useSortBy
  );

  return (
    <table {...getTableProps()} className="standard-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ position: 'relative' }}>
                <div {...column.getSortByToggleProps()} style={{ display: 'inline-block', cursor: 'pointer' }}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </div>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const AssetViewAll = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const jwtToken = localStorage.getItem('jwt'); // Retrieve JWT from local storage
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const response = await fetch(`${baseUrl}/assets/asset_all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jwt: jwtToken }) // Send JWT in the body
      });

      const data = await response.json();
      if (response.ok) {
        setAssets(data);
      } else {
        console.error('Failed to fetch assets:', data.error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div id="content">
      <c>
      <h3>All Assets</h3>
      <AssetTable assets={assets} />
      </c>
    </div>
  );
};

export default AssetViewAll;
