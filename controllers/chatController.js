/**
 * implement a chat
 * secure end to end encrypted chat app
 * save previous chat to local storage of user
 */
import User from "../model/user";
import io from 'socket.io';

export const sendMessage = async ()