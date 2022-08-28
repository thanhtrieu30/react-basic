import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoList from '../../components/TodoList'
import  queryString from 'query-string'
import TodoForm from '../../../TodoForm';

function ListPage(props) {
    const inittodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'new'

        },
        {
            id: 2,
            title: 'Code',
            status: 'completed'

        },
        {
            id: 3,
            title: 'Sleep',
            status: 'new'
        }

    ];


    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [todoList, setTodoList] = useState(inittodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search)
        
        return params.status || 'all';
    });



    useEffect(() => {
        const params = queryString.parse(location.search);
        setFilteredStatus(params.status || 'all');

    },[location.search])

    const handleTodoClick = (todo, idx) => {
        const newTodoList = [...todoList];

        console.log(todo, idx);

        newTodoList[idx] = {
            ...newTodoList[idx],
            status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
        };
        // newTodoList[idx] = newTodo

        setTodoList(newTodoList);
    };



    const handleShowAllClick = () => {
        // setFilteredStatus('all');
        const queryParams = { status : 'all'} ;
        history.push({
            pathname: match.path,
            search:queryString.stringify(queryParams)

        })
    }

    const handleShowCompletedClick = () => {
        // setFilteredStatus('completed');
        const queryParams = { status : 'completed'} ;
        history.push({
            pathname: match.path,
            search:queryString.stringify(queryParams)

        })
    }

    const handleShowNewClick = () => {
        // setFilteredStatus('new');
        const queryParams = { status : 'new'} ;
        history.push({
            pathname: match.path,
            search:queryString.stringify(queryParams)

        })
    }

    const renderedTodoList = todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);


    const handleTodoFormSubmit = (values) => {
        const newTodo = {
            id: todoList.length + 1,
            title: values.title,
            status: 'new',

        };
        const newTodoList = [...todoList,newTodo];  
        setTodoList(newTodoList);
    }
    return (
        <div>
            <h3>what to do</h3>
            <TodoForm onSubmit={handleTodoFormSubmit} />



            <h3>TodoList</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />

            <div>
                <button onClick={handleShowAllClick}> Show tất cả </button>
                <button onClick={handleShowCompletedClick}> Show Completed </button>
                <button onClick={handleShowNewClick}> Show New </button>
            </div>
        </div>
    );
}

export default ListPage;