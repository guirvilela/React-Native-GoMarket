import styled, { css } from 'styled-components/native';

interface ButtonProps {
  active: boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GREEN};
  border-radius: 5px;

  ${({ active, theme }) => css`
    background-color: ${active ? theme.COLORS.GREEN : theme.COLORS.GRAY50};
  `}
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: 7px;
`;
