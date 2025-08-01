import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const tasks = useSelector(state => state.todo.items);
  return (
    <footer className='footer'>
      <p>Total tasks: {tasks.length}</p>
    </footer>
  )
};

export default Footer
