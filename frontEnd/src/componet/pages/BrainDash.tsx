import { Button } from '../Button';
import PlusIcon from '../../icon/PlusIcon';
import ShareIcon from '../../icon/ShareIcon';
import { Brain as BrainLogo } from "../Logo/Brain"
import Card from '../Card';
import { CreateContent } from '../CreateContent';
import { useEffect, useState } from 'react';
import { SidePanel } from "../SidePanel";
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import "../../styles/gradient.css"; // For animated background

const Backend_url = import.meta.env.VITE_Backend_url;

function Brain() {
  interface Content {
    title: string;
    Type: any;
    link: string;
    _id?: any;
  }

  const [open, setOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { content, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [open, refresh]);

  const ShareHandler = async () => {
    const response = await axios.post(
      `${Backend_url}/api/v1/content/share`,
      { share: true },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    const shareUrl = `${window.location.origin}${response.data.hash}`;
    navigator.clipboard.writeText(shareUrl);
    alert(`Share link copied: ${shareUrl}`);
  };

  return (
    <div className="animated-gradient min-h-screen w-full flex flex-col md:flex-row relative">
      {/* Create Content Modal */}
      <CreateContent open={open} OnClose={() => setOpen(false)} />

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-4 left-4 z-50 bg-cyan-500 text-white p-2 rounded-md shadow-md hover:bg-cyan-600 transition"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full md:h-auto z-40 backdrop-blur-md bg-white/10 border-r border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)]
        transform transition-transform duration-300
        ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-[70%] sm:w-[50%] md:w-[20%] flex flex-col justify-between`}
      >
        {/* Top SidePanel Content */}
        <SidePanel />

        {/* Buttons in Sidebar for small screens */}
        <div className="flex flex-col md:hidden gap-3 p-4">
          <Button
            startIcon={<PlusIcon />}
            text="Add Content"
            variant="primary"
            onClick={() => setOpen(true)}
            className="shadow-[0_0_10px_rgba(255,0,255,0.5)] hover:shadow-[0_0_20px_rgba(255,0,255,0.8)]"
          />
          <Button
            onClick={ShareHandler}
            variant="secondry"
            text="Share Brain"
            startIcon={<ShareIcon />}
            className="shadow-[0_0_10px_rgba(0,255,255,0.5)] hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]"
          />
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col p-1 md:p-6 md:ml-0 mt-1 ml-2 md:mt-0">
        {/* Top Buttons - hidden on iPhone */}
        <div className="hidden md:flex flex-wrap justify-end md:sticky top-0 backdrop-blur-sm z-20 py-3">
          <Button
            startIcon={<PlusIcon />}
            text="Add Content"
            variant="primary"
            onClick={() => setOpen(true)}
            className="shadow-[0_0_10px_rgba(255,0,255,0.5)] hover:shadow-[0_0_20px_rgba(255,0,255,0.8)]"
          />
          <Button
            onClick={ShareHandler}
            variant="secondry"
            text="Share Brain"
            startIcon={<ShareIcon />}
            className="shadow-[0_0_10px_rgba(0,255,255,0.5)] hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6 place-items-center">
          {content &&
            content.map(({ title, Type, link, _id }: Content) => (
              <div
                key={_id}
                className="transform hover:scale-105 transition-transform duration-300 w-full max-w-sm"
              >
                <Card title={title} Type={Type} link={link} _id={_id} />
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center md:justify-start mt-auto">
          <Button
            variant="none"
            startIcon={<BrainLogo />}
            text="Second Brain"
            className="flex p-4 text-xl text-blue-500 mb-8 md:hidden "
          />
        </div>
      </div>
    </div>
  );
}

export default Brain;
