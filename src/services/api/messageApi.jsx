import { messageFailure, messageStart, messageSuccess, broadcastStart, broadcastSuccess, broadcastFailure } from "../../redux/slices/messageSlice";
import { axiosPrivate } from "./axios";

class MessageService {
  constructor(axiosInstance) {
    this.axios = axiosInstance || axiosPrivate;
  }

    async fetchMessages(dispatch) {  
      try {
        dispatch(messageStart());
        const response = await this.axios.get('/');
        
        const data = response.data;
        console.log('user messages: ', data);

        dispatch(messageSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(messageFailure('No Server Response'));
        } else {
            dispatch(messageFailure(err.response.data.message));
        }
      }
    };

    async sendBroadcast({ title, information }, dispatch) {
      try {
        dispatch(broadcastStart());
        const body = { topic: 'BROADCAST', information, title };
        const response = await this.axios.post('/notification/send/topic', JSON.stringify(body));
        const msg = response?.data?.message || 'Broadcast sent';
        dispatch(broadcastSuccess(msg));
      } catch (err) {
        const errMsg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to send broadcast');
        dispatch(broadcastFailure(errMsg));
      }
    }
}
  
export default MessageService;