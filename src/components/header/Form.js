import styled from 'styled-components';
import { Select } from './Select';
import { useState, useCallback } from 'react';
import { useData } from '../providers/DataProvider';

const FILTER_OPTIONS = {
  status: ['alive', 'dead', 'unknown'],
  gender: ['female', 'male', 'genderless', 'unknown'],
  species: [
    'human',
    'alien',
    'Humanoid',
    'unknown',
    'Poopybutthole',
    'Mythological Creature',
    'Robot',
    'Animal',
    'Cronenberg',
    'Disease'
  ]
};

export function Form() {
  const { filterCharacters } = useData();
  const [state, setState] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const handleResetButton = useCallback(() => {
    const url = new URL(window.location.href);
    for (const key in state) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
      }
    }
    window.history.replaceState(null, null, url.toString());
    filterCharacters();

    setState({
      status: null,
      gender: null,
      species: null,
      name: '',
      type: ''
    });
  }, [state, filterCharacters]);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const url = new URL(window.location.href);
      for (const key in state) {
        if (state[key]) {
          url.searchParams.set(key, state[key]);
        }
      }
      window.history.replaceState(null, null, url.toString());
      filterCharacters();
    },
    [state, filterCharacters]
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Select
        options={FILTER_OPTIONS.status}
        placeholder="Status"
        key="status"
        name="status"
        selected={state.status}
        setSelectedOption={setState}
      />
      <Select
        options={FILTER_OPTIONS.gender}
        placeholder="Gender"
        key="gender"
        name="gender"
        selected={state.gender}
        setSelectedOption={setState}
      />
      <Select
        options={FILTER_OPTIONS.species}
        placeholder="Species"
        key="species"
        name="species"
        selected={state.species}
        setSelectedOption={setState}
      />
      <StyledInput
        type="text"
        name="name"
        placeholder="Name"
        value={state.name}
        onChange={handleChange}
      ></StyledInput>
      <StyledInput
        type="text"
        name="type"
        placeholder="Type"
        value={state.type}
        onChange={handleChange}
      ></StyledInput>
      <StyledContainer>
        <Button type="submit"> Apply </Button>
        <Button type="reset" onClick={handleResetButton}>
          Reset{' '}
        </Button>
      </StyledContainer>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 561px;
  height: 90px;
  display: grid;
  grid-template-columns: repeat(3, 180px);
  gap: 10px;

  @media (max-width: 1519px) {
    width: 482px;
    grid-template-columns: repeat(3, 150px);
    gap: 15px;
  }

  @media (max-width: 949px) {
    width: 240px;
    height: 372px;
    grid-template-columns: 240px;
    gap: 5px;
  }
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
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  color: rgba(245, 245, 245, 1);

  ::placeholder {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
    color: rgba(179, 179, 179, 1);
  }

  $:focus {
    background-color: rgba(51, 68, 102, 1);
    border: solid 1px rgba(131, 191, 70, 1);
  }

  &:hover {
    background-color: rgba(51, 68, 102, 1);
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10px;
  height: 100%;

  @media (max-width: 949px) {
    flex-direction: column;
    row-gap: 15px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: unset;
  border: 1px solid
    ${({ type }) =>
      type === 'submit' ? 'rgba(131, 191, 70, 1)' : 'rgba(255, 81, 82, 1)'};
  border-radius: 8px;
  color: ${({ type }) =>
    type === 'submit' ? 'rgba(131, 191, 70, 1)' : 'rgba(255, 81, 82, 1)'};
  cursor: pointer;
  transition: all 0.5s;
  font-family: 'Inter';
  font-size: 16px;

  &:hover {
    color: rgba(245, 245, 245, 1);
    background-color: ${({ type }) =>
      type === 'submit' ? 'rgba(131, 191, 70, 1)' : 'rgba(255, 81, 82, 1)'};
  }
`;
