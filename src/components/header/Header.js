import styled from 'styled-components';
import { Logo } from './Logo';
import { Form } from './Form';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Form />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1519px) {
    flex-direction: column;
    row-gap: 30px;
  }
`;
