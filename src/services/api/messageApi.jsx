import { messageFailure, messageStart, messageSuccess } from "../../redux/slices/messageSlice";
import { axiosPrivate } from "./axios";

class MessageService {
    constructor(location, navigate) {
        this.location = location;
        this.navigate = navigate;
    }

    async fetchMessages(dispatch) {  
      try {
        dispatch(messageStart());
        const response = await axiosPrivate.get('/');
        
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
}
  
export default MessageService;