import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import MessageService from "../../../services/api/messageApi";
import TextButton from "../../../components/ui/textButton";
import { User } from "lucide-react";
import Button from "../../../components/ui/button";

const Messages = () => {
const dispatch = useDispatch();
const axiosPrivate = useAxiosPrivate();
const {loading, error, messages} = useSelector((state) => state.admin);
const messageService = new MessageService(axiosPrivate);

const loadMessages = async () => {
  await messageService.fetchMessages(dispatch);
}

useEffect(() => {
  loadMessages();
}, [dispatch]);

const onRefresh = () => {
  loadMessages();
}

// if (loading) return <Spinner />;

// if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh}/>;

return (
  <div className='w-full'>
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-1 space-y-4">
        <div className="border py-4 px-8 space-y-1">
            <p className="font-[600]">There is a suspicious attempt on this account</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <p>10:00AM</p>
                </div>
                <TextButton
                    className='px-3 py-1 border rounded-sm'
                >
                    View
                </TextButton>
            </div>
        </div>
        <div className="border py-4 px-8 space-y-1">
            <p className="font-[600]">There is a suspicious attempt on this account</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <p>10:00AM</p>
                </div>
                <TextButton
                    className='px-3 py-1 border rounded-sm'
                >
                    View
                </TextButton>
            </div>
        </div>
        <div className="border py-4 px-8 space-y-1">
            <p className="font-[600]">There is a suspicious attempt on this account</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <p>10:00AM</p>
                </div>
                <TextButton
                    className='px-3 py-1 border rounded-sm'
                >
                    View
                </TextButton>
            </div>
        </div>
        <div className="border py-4 px-8 space-y-1">
            <p className="font-[600]">There is a suspicious attempt on this account</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <p>10:00AM</p>
                </div>
                <TextButton
                    className='px-3 py-1 border rounded-sm'
                >
                    View
                </TextButton>
            </div>
        </div>
        <div className="border py-4 px-8 space-y-1">
            <p className="font-[600]">There is a suspicious attempt on this account</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <p>10:00AM</p>
                </div>
                <TextButton
                    className='px-3 py-1 border rounded-sm'
                >
                    View
                </TextButton>
            </div>
        </div>
        <div className="border py-4 px-8 space-y-1">
            <p className="font-[600]">There is a suspicious attempt on this account</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <p>10:00AM</p>
                </div>
                <TextButton
                    className='px-3 py-1 border rounded-sm'
                >
                    View
                </TextButton>
            </div>
        </div>
        <div className="border py-4 px-8 space-y-1">
            <p className="font-[600]">There is a suspicious attempt on this account</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <p>10:00AM</p>
                </div>
                <TextButton
                    className='px-3 py-1 border rounded-sm'
                >
                    View
                </TextButton>
            </div>
        </div>
      </div>
      <div className="text-primary space-y-6 px-10">
        <User size='32px' className=""/>

        <div className="">
          <p className="font-[600]">Bankole Isaac</p>
          <div className="flex items-center gap-12">
            <p className="text-sm">bankoleisaac@yahoo.com</p>
            <p className="text-xs">23/02/2025</p>
            <p className="text-xs">8:30pm</p>
          </div>
        </div>

        <p className="text-sm text-center">My transaction has been pending for hours and support is not responding. Very fraustrating! I will be waiting for your response, thanks.</p>

        <div className="flex justify-center">
          <div className="w-[70%]">
            <Button
              variant="outline"
            >
              Reply          
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default Messages;