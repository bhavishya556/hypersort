import React, { useState, useEffect } from 'react';
import Nav from './component/Nav';
import './home.css';
import { toast } from 'react-toastify';

const Home = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [addMemeberdiv, isAddMemeberdiv] = useState(false);
    const [addTaskdiv, isAddTaskdiv] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assignedTo: '',
        priority: '',
        status: 'Pending',
        createdDate: '',
        completedDate: '',
    });

    const [filters, setFilters] = useState({
        assignee: '',
        priority: '',
        fromDate: '',
        toDate: '',
    });
    const [sortOption, setSortOption] = useState('priority');
    useEffect(() => {
        // Initialize team members
        setTeamMembers(['John', 'Alice', 'Bob', 'Emma', 'Charlie', 'David', 'Ella']);

        // Initialize tasks
        setTasks([
            { title: 'Task 1', description: 'Description for Task 1', assignedTo: 'John', priority: 'P1', status: 'Pending', createdDate: '2024-03-01T12:00:00Z', completedDate: '' },
            { title: 'Task 2', description: 'Description for Task 2', assignedTo: 'Alice', priority: 'P2', status: 'In Progress', createdDate: '2024-03-02T12:00:00Z', completedDate: '' },
            { title: 'Task 3', description: 'Description for Task 3', assignedTo: 'Bob', priority: 'P3', status: 'Completed', createdDate: '2024-03-03T12:00:00Z', completedDate: '2024-03-04T12:00:00Z' },
            { title: 'Task 4', description: 'Description for Task 4', assignedTo: 'Emma', priority: 'P1', status: 'Pending', createdDate: '2024-03-04T12:00:00Z', completedDate: '' },
            { title: 'Task 5', description: 'Description for Task 5', assignedTo: 'Charlie', priority: 'P2', status: 'In Progress', createdDate: '2024-03-05T12:00:00Z', completedDate: '' }
        ]);
    }, []);
    const [updateIndex, setUpdateIndex] = useState(null);

    const handleAddTeamMember = (e) => {
        e.preventDefault();
        const newMember = e.target.elements.memberName.value;
        if (newMember == "") {
            toast.info("Enter name");
            return;
        }
        if (newMember) {
            setTeamMembers([...teamMembers, newMember]);
            e.target.elements.memberName.value = '';
        }
        toast.success("added");
    };

    // const getCurrentIndianDate = () => {
    //     const currentDate = new Date(); 
    //     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    //     return currentDate.toLocaleDateString('en-US', options); 
    // };

    const handleAddTask = (e) => {
        e.preventDefault();
        const currentDate = new Date(); 
        const taskToAdd = {
            title: e.target.elements.taskTitle.value,
            description: e.target.elements.taskDescription.value,
            assignedTo: e.target.elements.taskAssignTo.value,
            priority: e.target.elements.taskPriority.value,
            status: e.target.elements.taskStatus.value,
            createdDate: currentDate.toISOString(), 
            completedDate: '',
        };
        if (updateIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[updateIndex] = taskToAdd;
            setTasks(updatedTasks);
            setUpdateIndex(null);
        } else {
            setTasks([taskToAdd, ...tasks]);
        }
        e.target.reset();
        setNewTask({
            title: '',
            description: '',
            assignedTo: '',
            priority: '',
            status: 'Pending',
            createdDate: '',
            completedDate: '',
        });
    };

    const handleDeleteTask = (indexToDelete) => {
        setTasks(tasks.filter((task, index) => index !== indexToDelete));
    };

    const handleUpdateTask = (indexToUpdate) => {
        setUpdateIndex(indexToUpdate);
        const taskToUpdate = tasks[indexToUpdate];
        setNewTask(taskToUpdate);
    };
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    const handleTaskStatusChange = (index, newStatus) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].status = newStatus;
        if (newStatus === 'Completed') {
            const currentDate = new Date(); 
            updatedTasks[index].completedDate = currentDate.toISOString(); 
        } else {
            updatedTasks[index].completedDate = ''; 
        }
        setTasks(updatedTasks);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredTasks = tasks.filter(task => {
   
        if (filters.assignee && task.assignedTo !== filters.assignee) {
            return false;
        }
      
        if (filters.priority && task.priority !== filters.priority) {
            return false;
        }
     
        if (filters.fromDate && task.createdDate < filters.fromDate) {
            return false;
        }
        if (filters.toDate && task.createdDate > filters.toDate) {
            return false;
        }
        return true;
    });

    // Sort tasks based on sort option
    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOption === 'priority') {
            return a.priority.localeCompare(b.priority);
        } else if (sortOption === 'startDate') {
            return new Date(a.createdDate) - new Date(b.createdDate);
        } else if (sortOption === 'endDate') {
            return new Date(a.completedDate) - new Date(b.completedDate);
        }
        return 0;
    });

    return (
        <div className='home-con'>
            <Nav />
            <div className='hero-con'>
                <h2 className='heading'>Filter by</h2>
                <div className="filters-con">
                    <div>

                        {/* <label htmlFor='assignee'>Assignee:</label> */}
                        <select name='assignee' className='btn' id='assignee' value={filters.assignee} onChange={handleFilterChange}>
                            <option value=''>Name</option>
                            {teamMembers.map((member, index) => (
                                <option key={index} value={member}>{member}</option>
                            ))}
                        </select>
                    </div>
                    {/* <label htmlFor='priority'>Priority:</label> */}
                    <div>

                        <select name='priority' id='priority' className='btn' value={filters.priority} onChange={handleFilterChange}>
                            <option value=''>Priority</option>
                            <option value='P1'>P1</option>
                            <option value='P2'>P2</option>
                            <option value='P3'>P3</option>
                        </select>
                    </div>
                    {/* <label htmlFor='fromDate'>From Date:</label> */}
                    <input type='date' className='date-input' name='fromDate' id='fromDate' value={filters.fromDate} onChange={handleFilterChange} />
                    {/* <label htmlFor='toDate'>To Date:</label> */}
                    <input type='date' name='toDate' className='date-input' id='toDate' value={filters.toDate} onChange={handleFilterChange} />
                </div>


                {
                    addMemeberdiv ? (

                        <form onSubmit={handleAddTeamMember} className='addMemeberdiv' >
                            <div className='input-div'>
                                <h3>Enter Name</h3>

                                <input type='text' className='date-input' name='memberName' placeholder='Enter team member name' />
                            </div>
                            <div className='btn-con'>
                                <button className='btn' type='submit'>Add </button>
                                <button className='btn' onClick={() => isAddMemeberdiv(false)}>
                                    close
                                </button>

                            </div>
                        </form>




                    ) : ""
                }




                {
                    addTaskdiv ? (

                        <form onSubmit={handleAddTask} className='addMemeberdiv'>
                            <div className='input-div'>
                                <input className='date-input' type='text' name='taskTitle' placeholder='Enter task title' value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                                <textarea className='date-input' id='txt-des' name='taskDescription' placeholder='Enter task description' value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}></textarea>
                                <div className='btn-con2'>
                                    <select name='taskAssignTo' className='btn' value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}>
                                        <option value=''> Team Member</option>
                                        {teamMembers.map((member, index) => (
                                            <option key={index} value={member}>
                                                {member}
                                            </option>
                                        ))}
                                    </select>
                                    <select name='taskPriority' className='btn' value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                                        <option value=''>Select Priority</option>
                                        <option value='P1'>P1</option>
                                        <option value='P2'>P2</option>
                                        <option value='P3'>P3</option>
                                    </select>
                                    <select name='taskStatus' className='btn' value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                                        <option value='Pending'>Pending</option>
                                        <option value='In Progress'>In Progress</option>
                                        <option value='Completed'>Completed</option>
                                        <option value='Deferred'>Deferred</option>
                                        <option value='Deployed'>Deployed</option>
                                    </select>
                                </div>

                            </div>
                            <div className='btn-con'>


                                <button type='submit' className='btn'>{updateIndex !== null ? 'Update Task' : 'Add New Task'}</button>
                                <button className='btn' onClick={() => isAddTaskdiv(false)}>
                                    close
                                </button>
                            </div>
                        </form>




                    ) : ""
                }


                {/* <h2>Team Members:</h2>
                <ul>
                    {teamMembers.map((member, index) => (
                        <li key={index}>{member}</li>
                    ))}
                </ul> */}

                {/* <h2>Tasks:</h2> */}
            </div>
            <div className='add-sort-con'>


                <div className='add-con'>
                    <h2 className='heading'>
                        Add
                    </h2>


                    <button className='btn' onClick={() => isAddMemeberdiv(true)}>
                        Member

                    </button>
                    <button className='btn' onClick={() => isAddTaskdiv(true)}>
                        Task

                    </button>
                </div>
                <div className="add-con">
                    <h2 className='heading' >Sort</h2>
                    <select name='sort' className='btn' id='sort' value={sortOption} onChange={handleSortChange}>
                        <option value='priority'>Priority</option>
                        <option value='startDate'>Start Date</option>
                        <option value='endDate'>End Date</option>
                    </select>
                </div>
            </div>
            <ul className='task-con'>
             
                {/* Render sorted tasks */}
                {sortedTasks.map((task, index) => (
                    <li key={index} className='task-card'>
                        <p>Title: {task.title}</p> 
                        <p>{task.description}</p>                  
                        <p>Assigned To: {task.assignedTo}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Status: {task.status}</p>
                        <p>Created {new Date(task.createdDate).toLocaleString()}</p>
                        {task.status === 'Completed' && <p>Completed  {task.completedDate && new Date(task.completedDate).toLocaleString()}</p>}
                        <select value={task.status} onChange={(e) => handleTaskStatusChange(index, e.target.value)}>
                            <option value='Pending'>Pending</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Completed'>Completed</option>
                            <option value='Deferred'>Deferred</option>
                            <option value='Deployed'>Deployed</option>
                        </select>
                        <button onClick={() =>{ 
                            isAddTaskdiv(true)
                            handleUpdateTask(index)
                        }}>Update</button>
                        {
                            !(task.status === 'Completed') ? ( <button onClick={() => handleDeleteTask(index)}>Delete</button>):(<p></p>)

                        }
               
                     
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Home;
