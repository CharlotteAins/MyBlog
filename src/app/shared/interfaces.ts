export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface FBAuthResponse {
  idToken: string,
  expiresIn: string,
  email: string
}

export interface Post {
  id?: string,
  title: string,
  text: string,
  author: string,
  date: Date,
  comments?: Comment[]
}

export interface FbCreateResponse {
  name: string
}

export interface Comment {
  text: string,
  author: string
}
