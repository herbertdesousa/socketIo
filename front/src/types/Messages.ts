export interface ChatMessage {
  message: string;
  author: string;
}

export interface ChatState {
  input: string;
  messages: ChatMessage[];
}
