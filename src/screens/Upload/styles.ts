import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
`;

export const Content = styled.View`
  width: 270px;
  align-items: center;
`;

export const Progress = styled.Text`
  font-size: 44px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  color: ${({ theme }) => theme.COLORS.GRAY900};
  margin-top: 48px;
`;

export const Transferred = styled.Text`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY900};
`;

export const ProgressContainer = styled.View`
  width: 100%;
  background: #ccc;
  height: 5px;
  position: absolute;
  bottom: 0;
`;

export const ProgressBar = styled.View`
  height: 5px;
  width: 0;
  background: ${({ theme }) => theme.COLORS.GREEN};
`;
