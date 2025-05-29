import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as ArrowDown } from '../../assets/icons/Chevron down.svg';
import { ReactComponent as Cross } from '../../assets/icons/Cross Icon.svg';
import { Option } from './Option';

export function Select({
  options,
  placeholder,
  name,
  selected,
  setSelectedOption
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const [isOptionsScroll, setIsOptionsScroll] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      const { target } = e;
      if (target instanceof Node && !rootRef.current.contains(target)) {
        if (isOpen) {
          onClose();
        }
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (options && options.length > 5) {
      setIsOptionsScroll(true);
    } else {
      setIsOptionsScroll(false);
    }
  }, [options]);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOptionClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handlePlaceHolderClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleIconClick = useCallback(() => {
    if (selected) {
      setSelectedOption((prev) => ({ ...prev, [name]: '' }));
    } else {
      handlePlaceHolderClick();
    }
  }, [selected, setSelectedOption, handlePlaceHolderClick, name]);

  return (
    <SelectContainer ref={rootRef}>
      <IconContainer
        onClick={handleIconClick}
        isOpen={isOpen}
        selected={selected}
      >
        {isOpen ? <ArrowDown /> : selected ? <Cross /> : <ArrowDown />}
      </IconContainer>
      <Placeholder
        onClick={handlePlaceHolderClick}
        role="button"
        selected={selected}
      >
        {selected || placeholder}
      </Placeholder>
      {isOpen && (
        <DropdownMenu isScroll={isOptionsScroll}>
          <OptionsContainer isScroll={isOptionsScroll}>
            {options.map((option) => (
              <Option
                key={option}
                option={option}
                onClick={handleOptionClick}
                name={name}
                selected={selected === option}
                setSelectedOption={setSelectedOption}
              />
            ))}
          </OptionsContainer>
        </DropdownMenu>
      )}
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  height: 40px;
  background-color: rgba(38, 55, 80, 1);
  border: solid 1px rgba(131, 191, 70, 1);
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  z-index: 0;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(51, 68, 102, 1);
  }
`;

const IconContainer = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 150px;
  top: 12px;
  z-index: 1;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'none')};

  & path {
    stroke: ${({ isOpen, selected }) =>
      isOpen || selected ? 'rgba(255, 255, 255, 1)' : 'rgba(178, 178, 178, 1)'};
  }

  &:hover {
    & path {
      stroke: ${({ isOpen, selected }) =>
        !isOpen && selected && 'rgba(131, 191, 70, 1)'};
    }
  }

  @media (max-width: 1519px) {
    left: 120px;
  }

  @media (max-width: 949px) {
    left: 210px;
  }
`;

const Placeholder = styled.p`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  color: ${({ selected }) =>
    selected ? 'rgba(255, 255, 255, 1)' : 'rgba(179, 179, 179, 1)'};
  height: 100%;
  width: 100%;
  padding: 12px;
  padding-left: 16px;
`;

const DropdownMenu = styled.div`
  width: 180px;
  height: auto;
  padding: ${({ isScroll }) => (isScroll ? '2px 4px 2px 0' : '0')};
  background-color: rgba(255, 255, 255, 1);
  border: solid 1px rgba(217, 217, 217, 1);
  border-radius: 8px;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 45px;
  box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
`;

const OptionsContainer = styled.ul`
  width: 100%;
  height: auto;
  max-height: 180px;
  list-style: none;
  overflow: ${({ isScroll }) => (isScroll ? 'auto' : 'none')};

  :: -webkit-scrollbar {
    width: 4px;
    border-radius: 8px;
    margin-right: 4px;
  }

  :: -webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(217, 217, 217, 1);
  }

  :: -webkit-scrollbar-track {
    width: 4px;
    height: 80px;
    border-radius: 4px;
    margin-right: 4px;
  }

  @media (max-width: 1519px) {
    width: 150px;
  }
`;
