import { useCallback } from 'react';
import styled from 'styled-components';

export function Option({ option, onClick, name, selected, setSelectedOption }) {
  // const { value, title } = option;
  const handleClick = useCallback(() => {
    onClick();
    setSelectedOption((prev) => ({ ...prev, [name]: option }));
  }, [onClick, option, setSelectedOption, name]);

  return (
    <StyledOption
      value={option}
      onClick={handleClick}
      tabIndex={0}
      selected={selected}
    >
      {option}
    </StyledOption>
  );
}

const StyledOption = styled.li`
  padding: 7px;
  padding-bottom: 6px;
  z-index: 5;
  transition: all 0.3s;
  font-family: 'Inter';
  font-weight: ${(props) => (props.selected ? '600' : '400')};
  font-size: 16px;
  line-height: 140%;
  text-transform: capitalize;

  &:hover {
    background-color: rgba(131, 191, 70, 0.2);
  }
`;
