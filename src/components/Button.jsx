import React from "react";
import PropTypes from "prop-types";

const Button = ({ variant = "primary", children, ...props }) => {
  const base = "px-4 py-2 rounded font-medium transition";

  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-300 hover:bg-gray-400 text-black",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  children: PropTypes.node.isRequired,
};

export default Button;
