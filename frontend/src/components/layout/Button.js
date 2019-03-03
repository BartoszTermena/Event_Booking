import styled from 'styled-components';
export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.2rem;
  background: transparent;
  border: 0.1rem solid var(--primary-color);
  border-color: var(--primary-color);
  color: var(--primary-color);
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  margin: 0.2rem 0.5rem 0;
  transition: all 0.5s ease-in-out;
  &:hover{
    background: transparent;
    border: 0.1rem solid var(--mainDark);
    color: var(--mainDark);
  }
  &:focus {
    outline: none;
  }
`;