import styled from 'styled-components';
import { Select } from './Select';
import { useEffect, useState } from 'react';
import { useData } from '../providers/DataProvider';

export function Form() {
  const { characters } = useData();
  const [optionsStatus, setOptionsStatus] = useState(null);
  const [optionsGender, setOptionsGender] = useState(null);
  const [optionsSpecies, setOptionsSpecies] = useState(null);

  useEffect(() => {
    const getOptions = (selector, setState) => {
      const arr = characters.map((el) => el[selector]);
      const set = new Set(arr);
      setState(() =>
        Array.from(set).map((el) => ({
          value: el,
          title: el
        }))
      );
    };

    getOptions('status', setOptionsStatus);
    getOptions('gender', setOptionsGender);
    getOptions('species', setOptionsSpecies);
  }, [characters, optionsGender, optionsSpecies, optionsStatus]);

  return (
    <StyledForm>
      <Select options={optionsStatus} placeholder="Status" key="status" />
      <Select options={optionsGender} placeholder="Gender" key="gender" />
      <Select options={optionsSpecies} placeholder="Species" key="species" />
      <StyledInput type="text" name="name" placeholder="Name"></StyledInput>
      <StyledInput type="text" name="type" placeholder="Type"></StyledInput>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 561px;
  height: 90px;
  display: grid;
  grid-template-columns: repeat(3, 180px);
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 40px;
  background-color: rgba(38, 55, 80, 1);
  border: solid 1px rgba(131, 191, 70, 1);
  border-radius: 8px;
  padding: 12px;
  padding-left: 16px;
  cursor: pointer;
  transition: all 0.3s;

  &:placeholder {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
    text-color: rgba(179, 179, 179, 1);
  }

  &:hover {
    background-color: rgba(51, 68, 102, 1);
  }

  $:focus {
    background-color: rgba(51, 68, 102, 1);
  }
`;
