export interface LoginPageProps {
    setNickname: (nickname: string) => void;
}

export interface NavBarProps {
    nickname: string | null;
    setNickname: (nickname: string | null) => void;
  }