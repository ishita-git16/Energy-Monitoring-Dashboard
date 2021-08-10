import React from 'react';
import './Button.css';

const Button = ({ children, ...rest }) => {
  return (
    <button className="button" {...rest}>
      { children }Hello Mayuri
    </button>
  )
}

export default Button;