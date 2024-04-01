import React from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    const updatedTask = { ...task };
    // You can implement the update logic here
    onUpdate(updatedTask);
  };

  const handleDelete = () => {
    // Pass the task index to delete
    onDelete(task);
  };

  return (
    <li>
      <strong>Title:</strong> {task.title}, <strong>Description:</strong> {task.description},{' '}
      <strong>Assigned To:</strong> {task.assignedTo}, <strong>Priority:</strong> {task.priority},{' '}
      <strong>Status:</strong> {task.status}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
           {/* {tasks.map((task, index) => (
                    <li key={index}>
                        <strong>Title:</strong> {task.title}, <strong>Description:</strong>{' '}
                        {task.description}, <strong>Assigned To:</strong> {task.assignedTo},{' '}
                        <strong>Priority:</strong> {task.priority}, <strong>Status:</strong>{' '}
                        {task.status}, <strong>Created Date:</strong> {task.createdDate}
                        {task.status === 'Completed' && <>, <strong>Completed Date:</strong> {task.completedDate}</>}
                        <button onClick={() => handleUpdateTask(index)}>Update</button>
                        {task.status !== 'Completed' && <button onClick={() => handleDeleteTask(index)}>Delete</button>}
                        <select value={task.status} onChange={(e) => handleTaskStatusChange(index, e.target.value)}>
                            <option value='Pending'>Pending</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Completed'>Completed</option>
                            <option value='Deferred'>Deferred</option>
                            <option value='Deployed'>Deployed</option>
                        </select>
                    </li>
                ))} */}