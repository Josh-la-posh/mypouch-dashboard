import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import MessageService from "../../../services/api/messageApi";
import AdminService from "../../../services/api/adminApi";
import TextButton from "../../../components/ui/textButton";
import { User, Send } from "lucide-react";
import Button from "../../../components/ui/button";
import InputField from '../../../components/ui/input';
import { CustomTab } from '../../../components/ui/tabs';
import useTitle from "../../../services/hooks/useTitle";

const Messages = () => {
    const {setAppTitle} = useTitle();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const { faqList, faqLoading, faqError, isCreatingFaq, isUpdatingFaq, isDeletingFaq } = useSelector((state) => state.admin);
    const { isSendingBroadcast, broadcastSuccessMessage, broadcastError } = useSelector((state) => state.message);
        const [activeTab, setActiveTab] = useState('message');
        const [broadcastTitle, setBroadcastTitle] = useState('');
        const [broadcastBody, setBroadcastBody] = useState('');
    const [faqSearch, setFaqSearch] = useState('');
    const [newFaqTitle, setNewFaqTitle] = useState('');
    const [newFaqContent, setNewFaqContent] = useState('');
    const [newFaqActive, setNewFaqActive] = useState(true);
    const [editingFaqId, setEditingFaqId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [editingActive, setEditingActive] = useState(true);
    const messageService = useMemo(() => new MessageService(axiosPrivate), [axiosPrivate]);
    const adminService = useMemo(() => new AdminService(axiosPrivate), [axiosPrivate]);

        const loadMessages = useCallback(async () => {
            await messageService.fetchMessages(dispatch);
        }, [messageService, dispatch]);
    
    useEffect(() => {
        setAppTitle('Messages');
    }, [setAppTitle]);

    useEffect(() => {
        loadMessages();
        adminService.fetchFaq(dispatch);
    }, [loadMessages, adminService, dispatch]);

    // const onRefresh = () => loadMessages(); // reserved for future refresh button

    // if (loading) return <Spinner />;

    // if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh}/>;

    const TABS = [
        { label: 'Messages', value: 'message' },
        { label: 'Broadcast Messages', value: 'broadcast' },
        { label: 'FAQ', value: 'faq' },
    ];

    return (
        <div className='w-full'>
            <CustomTab
                TABS={TABS}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                activeClassName='bg-primary/10 font-semibold'
            >
                {activeTab === 'message' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4 dark:text-[#D1D5DB]">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="border py-4 px-8 space-y-1">
                                    <p className="font-[600]">There is a suspicious attempt on this account</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                                            <p>10:00AM</p>
                                        </div>
                                        <TextButton className='px-3 py-1 border rounded-sm'>View</TextButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-primary dark:text-[#D1D5DB] space-y-6 px-2 md:px-10 pt-10">
                            <User size='32px' />
                            <div>
                                <p className="font-[600]">Bankole Isaac</p>
                                <div className="flex flex-wrap items-center gap-6">
                                    <p className="text-sm">bankoleisaac@yahoo.com</p>
                                    <p className="text-xs">23/02/2025</p>
                                    <p className="text-xs">8:30pm</p>
                                </div>
                            </div>
                            <p className="text-sm">My transaction has been pending for hours and support is not responding. Very frustrating! I will be waiting for your response, thanks.</p>
                            <div className="w-full md:w-[70%]">
                                <Button variant="outline">Reply</Button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'broadcast' && (
                    <div className='max-w-[600px] space-y-6'>
                        <p className='text-sm font-semibold text-primary dark:text-white'>Send Broadcast Message</p>
                        <InputField
                            id='broadcastTitle'
                            label='Title'
                            placeholder='Enter broadcast title'
                            value={broadcastTitle}
                            onChange={(e) => setBroadcastTitle(e.target.value)}
                        />
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-[600] text-black/70 dark:text-white'>Body</label>
                            <textarea
                                className='min-h-[160px] text-xs lg:text-sm text-black/60 dark:text-white/70 bg-primary/14 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-primary'
                                placeholder='Type broadcast content'
                                value={broadcastBody}
                                onChange={(e) => setBroadcastBody(e.target.value)}
                            />
                        </div>
                        <Button
                            variant='primary'
                            disabled={!broadcastTitle || !broadcastBody || isSendingBroadcast}
                            className='flex items-center gap-2'
                            onClick={() => {
                                messageService.sendBroadcast({ title: broadcastTitle, information: broadcastBody }, dispatch);
                            }}
                        >
                            {isSendingBroadcast ? 'Sending...' : (<><Send size={16}/> Send Broadcast</>)}
                        </Button>
                        {(broadcastSuccessMessage || broadcastError) && (
                            <p className={`text-xs ${broadcastError ? 'text-red-500' : 'text-green-600 dark:text-green-300'}`}>{broadcastError || broadcastSuccessMessage}</p>
                        )}
                    </div>
                )}
                {activeTab === 'faq' && (
                    <div className='space-y-8 max-w-[800px]'>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <InputField
                                id='faqSearch'
                                placeholder='Search FAQ'
                                value={faqSearch}
                                onChange={(e) => setFaqSearch(e.target.value)}
                            />
                            <Button
                                variant='outline'
                                onClick={() => adminService.fetchFaq(dispatch)}
                                disabled={faqLoading}
                            >
                                {faqLoading ? 'Refreshing...' : 'Refresh'}
                            </Button>
                        </div>

                        {/* Create New FAQ */}
                        <div className='space-y-4 border rounded-sm p-4 bg-primary/10'>
                            <p className='text-sm font-semibold'>Create FAQ</p>
                            <InputField
                                id='newFaqTitle'
                                label='Title'
                                placeholder='Enter FAQ title'
                                value={newFaqTitle}
                                onChange={(e) => setNewFaqTitle(e.target.value)}
                            />
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-[600] text-black/70 dark:text-white'>Content</label>
                                <textarea
                                    className='min-h-[120px] text-xs lg:text-sm text-black/60 dark:text-white/70 bg-primary/14 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-primary'
                                    placeholder='Enter FAQ content'
                                    value={newFaqContent}
                                    onChange={(e) => setNewFaqContent(e.target.value)}
                                />
                            </div>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    id='newFaqActive'
                                    checked={newFaqActive}
                                    onChange={(e) => setNewFaqActive(e.target.checked)}
                                />
                                <label htmlFor='newFaqActive' className='text-xs'>Active</label>
                            </div>
                            <Button
                                variant='primary'
                                disabled={!newFaqTitle || !newFaqContent || isCreatingFaq}
                                onClick={() => {
                                    adminService.createFaq({ title: newFaqTitle, content: newFaqContent, isActive: newFaqActive }, dispatch);
                                    setNewFaqTitle('');
                                    setNewFaqContent('');
                                    setNewFaqActive(true);
                                }}
                            >
                                {isCreatingFaq ? 'Creating...' : 'Create FAQ'}
                            </Button>
                        </div>

                        {faqError && <p className='text-xs text-red-500'>{faqError}</p>}

                        {/* FAQ List */}
                        <div className='space-y-4'>
                            {faqLoading && <p className='text-xs'>Loading FAQs...</p>}
                            {faqList.filter(item => item.title.toLowerCase().includes(faqSearch.toLowerCase())).map(item => (
                                <div key={item.id} className='border rounded-sm px-4 py-3 bg-primary/10 space-y-2'>
                                    {editingFaqId === item.id ? (
                                        <>
                                            <InputField
                                                id='editFaqTitle'
                                                label='Title'
                                                value={editingTitle}
                                                onChange={(e) => setEditingTitle(e.target.value)}
                                            />
                                            <div className='flex flex-col gap-2'>
                                                <label className='text-sm font-[600] text-black/70 dark:text-white'>Content</label>
                                                <textarea
                                                    className='min-h-[100px] text-xs lg:text-sm text-black/60 dark:text-white/70 bg-primary/14 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-primary'
                                                    value={editingContent}
                                                    onChange={(e) => setEditingContent(e.target.value)}
                                                />
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <input
                                                    type='checkbox'
                                                    id={`editActive-${item.id}`}
                                                    checked={editingActive}
                                                    onChange={(e) => setEditingActive(e.target.checked)}
                                                />
                                                <label htmlFor={`editActive-${item.id}`} className='text-xs'>Active</label>
                                            </div>
                                            <div className='flex gap-3'>
                                                <Button
                                                    variant='primary'
                                                    disabled={isUpdatingFaq}
                                                    onClick={() => {
                                                        adminService.updateFaq(item.id, { title: editingTitle, content: editingContent, isActive: editingActive }, dispatch);
                                                        setEditingFaqId(null);
                                                    }}
                                                >
                                                    {isUpdatingFaq ? 'Saving...' : 'Save'}
                                                </Button>
                                                <Button
                                                    variant='danger'
                                                    onClick={() => setEditingFaqId(null)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-sm font-semibold'>{item.title}</p>
                                                <span className={`text-[10px] px-2 py-1 rounded-sm font-semibold ${item.isActive ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' : 'bg-gray-200 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300'}`}>{item.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                                            </div>
                                            <p className='text-xs mt-1 text-black/70 dark:text-white/70 whitespace-pre-line'>{item.content}</p>
                                            <div className='flex gap-4 pt-2'>
                                                <TextButton
                                                    className='px-3 py-1 border rounded-sm'
                                                    onClick={() => {
                                                        setEditingFaqId(item.id);
                                                        setEditingTitle(item.title);
                                                        setEditingContent(item.content);
                                                        setEditingActive(item.isActive);
                                                    }}
                                                >
                                                    Edit
                                                </TextButton>
                                                <TextButton
                                                    className='px-3 py-1 border rounded-sm text-red-500'
                                                    onClick={() => adminService.deleteFaq(item.id, dispatch)}
                                                    disabled={isDeletingFaq}
                                                >
                                                    {isDeletingFaq ? 'Deleting...' : 'Delete'}
                                                </TextButton>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            {faqList.filter(item => item.title.toLowerCase().includes(faqSearch.toLowerCase())).length === 0 && !faqLoading && (
                                <p className='text-xs'>No matching FAQ found.</p>
                            )}
                        </div>
                    </div>
                )}
            </CustomTab>
        </div>
    )
}

export default Messages;