import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>{children}</div>
);

export default Card;
