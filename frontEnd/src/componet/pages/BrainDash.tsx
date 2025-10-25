import { Button } from '../Button';
import PlusIcon from '../../icon/PlusIcon';
import ShareIcon from '../../icon/ShareIcon';
import Card from '../Card';
import { CreateContent } from '../CreateContent';
import { useEffect, useState } from 'react';
import { SidePanel } from "../SidePanel";
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import "../../styles/gradient.css"; // For animated background
const Backend_url = import.meta.env.VITE_Backend_url


function Brain() {
    interface Content {
        title: string;
        Type: any;
        link: string;
        _id?: any;
    }

    const [open, setOpen] = useState(false);
    const { content, refresh } = useContent();

    useEffect(() => {
        refresh();
    }, [open, refresh]);

    const ShareHandler = async () => {
        const response = await axios.post(`${Backend_url}/api/v1/content/share`, {
            share: true
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        const shareUrl = `${window.location.origin}${response.data.hash}`;
        navigator.clipboard.writeText(shareUrl);
        alert(`Share link copied: ${shareUrl}`);
    };

    return (
        <div className='animated-gradient h-screen w-full flex'>
            {/* Create Content Modal */}
            <CreateContent open={open} OnClose={() => setOpen(false)} />

            {/* Side Panel */}
            <div className="flex fixed w-[10%] md:w-[20%] h-full z-10 backdrop-blur-md bg-white/10 border-r border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                <SidePanel />
            </div>

            {/* Main Area */}
            <div className="h-full w-[60%] lg:w-[80%] md:w-[70%] flex flex-col items-end ml-[10%] md:ml-[20%] p-4">
                
                {/* Top Buttons */}
                <div className="flex flex-roww-full gap-4 justify-evenly sticky top-0 backdrop-blur-sm   border-cyan-400 z-10">
                    <Button 
                        startIcon={<PlusIcon />} 
                        text='Add Content' 
                        variant='primary' 
                        onClick={() => setOpen(true)} 
                        className="shadow-[0_0_10px_rgba(255,0,255,0.5)] hover:shadow-[0_0_20px_rgba(255,0,255,0.8)]"
                    />
                    <Button 
                        onClick={ShareHandler} 
                        variant="secondry" 
                        text="Share brain" 
                        startIcon={<ShareIcon />}
                        className="shadow-[0_0_10px_rgba(0,255,255,0.5)] hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]"
                    />
                </div>

                {/* Cards Grid */}
                <div className="cards flex flex-wrap gap-4 mt-4 justify-end">
                    {content && content.map(({ title, Type, link, _id }: Content) => (
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <Card 
                                title={title} 
                                Type={Type}
                                link={link} 
                                _id={_id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Brain;
