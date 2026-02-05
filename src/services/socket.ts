import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    console.log('Socket connecting...');
    this.socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket']
    });
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomId: string) {
    this.socket?.emit('join_room', { roomId });
  }

  sendCodeUpdate(roomId: string, code: string) {
    this.socket?.emit('code_change', { roomId, code });
  }

  sendChatMessage(roomId: string, message: string) {
    this.socket?.emit('chat_message', { roomId, message });
  }

  onCodeUpdate(callback: (data: { userId: string, code: string }) => void) {
    this.socket?.on('code_update', callback);
  }

  onPlayerJoin(callback: (player: any) => void) {
    this.socket?.on('player_join', callback);
  }

  onMatchStart(callback: (matchData: any) => void) {
    this.socket?.on('match_start', callback);
  }
}

export const socketService = new SocketService();
