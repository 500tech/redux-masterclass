import React, { Fragment } from 'react';

const Toggle = ({ title, isOpen, setIsOpen }) => (
  <Fragment>
    <h1 onClick={() => setIsOpen(!isOpen)}>{title}</h1>
    {isOpen ? children : null}
  </Fragment>
);

export const useToggleState = (value: boolean = false) => {
  const [isOpen, setIsOpen] = useState(value);
  return {
    isOpen,
    setIsOpen
  };
};

export default Toggle;
