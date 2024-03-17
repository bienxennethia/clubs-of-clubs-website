import React, { useState } from 'react';
import "./Select.scss";
import { ReactComponent as DownArrow } from "../../icons/arrow.svg";
import { ReactComponent as Icon } from "../../icons/home.svg";

const options = [
  { value: 'option1', label: 'All Clubs (Alphabetically)' },
  { value: 'option2', label: 'Co-Curricular' },
  { value: 'option3', label: 'Interest' },
];


const SelectField = ({isForum = false, data = options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown-container ${isForum ? 'isForums' : ''}`}>
      <div className={`dropdown-header ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : options[0].label}
        <DownArrow />
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {data.map(option => (
              isForum ? (
                <div
                  key={option.value}
                  className="dropdown-option"
                  onClick={() => handleOptionClick(option)}
                >
                <Icon />
                  {option.label}
                </div>
              ) : (
                <div
                  key={option.value}
                  className="dropdown-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                  <Icon />
                </div>
              )
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
