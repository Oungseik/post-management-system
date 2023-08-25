export interface Post {
  id: number,
  title: string,
  content: string,
  image?: string,
  userId: number,
}

export interface User {
  id: number,
  email: string,
  username: string,
  token: string,
}

export type PostWithUserInfo = Post & { user: User };

export type ModalBox = "login" | "register" | null;
