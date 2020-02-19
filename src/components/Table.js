import React, { useState, useEffect } from 'react';
import Record from "./Record";

function Table({allUsers}) {

    const [users, setUsers] = useState({});
    // this is required for the state to be actually updated when we pass the props to the component
    useEffect(() => {
        setUsers(allUsers);
    }, [allUsers]);

    const [sorting, setSortBy] = useState({
        sortOn: false,
        field: 'name',
        order: 'asc'
    });
    const [filter, setFilter] = useState({
        name: '',
        email: '',
        userId: '',
        date: ''
    });


    const applySort = function(event){
        let field = event.target.id;
        if (sorting.field !== field) {
            setSortBy({sortOn: true, field: field, order: 'asc'});
        } else {
            if (sorting.sortOn && sorting.order === 'desc') {
                setSortBy({sortOn: false, field: '', order: 'asc'});
            } else if (sorting.sortOn && sorting.order === 'asc') {
                setSortBy({sortOn: true, field: field, order: 'desc'});
            } else {
                setSortBy({sortOn: true, field: field, order: 'asc'});
            }
        }
    }

    const applyFilter = function(event){
        // console.log(event.target.id);
        // console.log(event.target.value);
        let field = event.target.id;
        let value = event.target.value;
        setFilter({...filter, [field]: value});
    }

    const checkSortSymbol = function(field){
        if (sorting.field === field && sorting.sortOn) {
            if (sorting.order === 'asc') {
                return <i className="fas fa-sort-up"></i>
            } else {
                return <i className="fas fa-sort-down"></i>
            }
        } else {
            return '';
        }
    }

    // if the sorting state changes, re-sort users and update corresponding state to re-render
    useEffect(() => {
        if (sorting.sortOn) {
            let sortedUsers = users.slice(0).sort((a,b) => { // IMPORTANT: I am creating a copy of the array, so that sorting does not mutate it (this issue drove me NUTS)
                let field = sorting.field;
                let result;
                if (sorting.order === 'asc') {
                    a[field] < b[field] ? result = -1 : a[field] > b[field] ? result = 1 : result = 0;
                } else {
                    a[field] > b[field] ? result = -1 : a[field] < b[field] ? result = 1 : result = 0;
                }
                return result;
            });
            setUsers(sortedUsers);
        }
    }, [sorting]);

    // if the filter state changes, filter the results and update users state to re-render
    useEffect(() => {
        let filteredUsers = allUsers.slice(0).filter((v) => { //using allUsers not to lose the original array. Copying to save from mutation
            if (v.name.toLowerCase().includes(filter.name.toLowerCase()) 
            && v.email.toLowerCase().includes(filter.email.toLowerCase()) 
            && v.userId.toLowerCase().includes(filter.userId.toLowerCase()) 
            && v.date.includes(filter.date)) {
                return true
            } else {
                return false}
        });
        setUsers(filteredUsers);
    }, [filter]);

    return (
        <div>
            <table className='table table-striped mt-5'>
                <thead className='thead-dark'>
                <tr>
                    <th id='name' onClick = {applySort}>Name <span>{checkSortSymbol('name')}</span></th>
                    <th id='img'>Image</th>
                    <th id='email' onClick = {applySort}>Email <span>{checkSortSymbol('email')}</span></th>
                    <th id='userId' onClick = {applySort}>User ID <span>{checkSortSymbol('userId')}</span></th>
                    <th id='date' onClick = {applySort}>Date joined <span>{checkSortSymbol('date')}</span></th>
                </tr>
                <tr>
                    <th><input id='name' className='form-control-sm' onChange = {applyFilter}></input></th>
                    <th></th>
                    <th><input id='email' className='form-control-sm' onChange = {applyFilter}></input></th>
                    <th><input id='userId' className='form-control-sm' onChange = {applyFilter}></input></th>
                    <th><input id='date' className='form-control-sm' onChange = {applyFilter}></input></th>
                </tr>
                </thead>
                <tbody>
                    {(users.length > 0) ? users.map((v) => <Record record={v}/>) : <tr><td>No records found</td></tr>}
                </tbody>   
            </table>                
        </div>
    )
}

export default Table;