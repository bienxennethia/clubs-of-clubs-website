import React, { useState, useEffect } from 'react';
import "./Select.scss";
import { ReactComponent as DownArrow } from "../../icons/arrow.svg";
import { ReactComponent as Icon } from "../../icons/home.svg";
import { fetchClubTypes } from "../../data/utils";

const SelectField = ({isForum = false, data = [], toggleFilter = null}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState(data);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    toggleFilter && toggleFilter(option.id);
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await fetchClubTypes();
        setOptions(options);
      } catch (error) {
        console.error('Error fetching club types:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className={`dropdown-container ${isForum ? 'isForums' : ''}`}>
      <div className={`dropdown-header ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.name : options[0]?.name}
        <DownArrow />
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map(option => (
              isForum ? (
                <div
                  key={option.id}
                  className="dropdown-option"
                  onClick={() => handleOptionClick(option)}
                >
                <Icon />
                  {option.name}
                </div>
              ) : (
                <div
                  key={option.id}
                  className="dropdown-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                  <div className={`dropdown-option-icon ${option.id}`}></div>
                </div>
              )
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
