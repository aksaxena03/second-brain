import { Youtube, Facebook, Document, X } from "./Logo/logo";
import ShareIcon from "../icon/ShareIcon";
import { DelContent } from "./DelContent";

interface CardLay {
    Type: "youtube" | "facebook" | "x" | "document";
    title: string;
    link: string;
    _id: string;
    userId?: string;
}

const verify = localStorage.getItem("token");

const logos = {
    youtube: <Youtube />,
    facebook: <Facebook />,
    x: <X />,
    document: <Document />,
};

const Card = (props: CardLay) => {
    const { Type, link, title, _id } = props;

    // ✅ Fix YouTube embed URLs
    const getYouTubeEmbedLink = (url: string) => {
        if (url.includes("watch?v=")) {
            return url.replace("watch?v=", "embed/");
        }
        if (url.includes("shorts/")) {
            return url.replace("shorts/", "embed/");
        }
        return url;
    };

    // ✅ Fix X.com / Twitter embed URLs
    const getTwitterLink = (url: string) => {
        if (url.includes("x.com")) {
            return url.replace("x.com", "twitter.com");
        }
        return url;
    };

    return (
        <div className="flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105">
            <div className="max-w-[15rem] rounded-xl backdrop-blur-md bg-white/10 border border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]">
                
                {/* Header */}
                <div className="flex justify-between items-center px-4 pt-3 text-white font-semibold">
                    <div className="flex items-center gap-2">
                        {logos[Type]}
                        <span className="truncate max-w-[8rem]">{title}</span>
                    </div>
                    <div className="flex gap-2 items-center size-0.5">
                        <ShareIcon />
                        {verify ? <DelContent _id={_id} /> : null}
                    </div>
                </div>

                {/* Content */}
                <div className="mt-3">
                    {/* YouTube */}
                    {Type === "youtube" && (
                        <iframe
                            className="w-full h-[200px] p-3 rounded-2xl border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                            src={getYouTubeEmbedLink(link)}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    )}

                    {/* Twitter / X */}
                    {Type === "x" && (
                        <div className="p-3">
                            <blockquote
                                className="twitter-tweet rounded-2xl border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                                data-media-max-width="560"
                            >
                                <a href={getTwitterLink(link)}></a>
                            </blockquote>
                            <script async src="https://platform.twitter.com/widgets.js"></script>
                        </div>
                    )}

                    {/* Facebook */}
                    {Type === "facebook" && (
                        <iframe
                            className="w-full h-[200px] p-3 rounded-2xl border border-blue-400 shadow-[0_0_10px_rgba(0,136,255,0.4)]"
                            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(link)}&show_text=true&width=400`}
                            width="400"
                            height="200"
                            style={{ border: "none", overflow: "hidden" }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                    )}

                    {/* Document (PDF/Google Docs) */}
                    {Type === "document" && (
                        <iframe
                            className="w-full h-[200px] p-3 rounded-2xl border border-purple-400 shadow-[0_0_10px_rgba(160,32,240,0.4)]"
                            src={link}
                            title="Document Viewer"
                            frameBorder="0"
                        ></iframe>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;









// import { Youtube, Facebook, Document, X } from "./Logo/logo";
// import ShareIcon from "../icon/ShareIcon";
// import { DelContent } from "./DelContent";

// interface CardLay {
//     Type: "youtube" | "facebook" | "x" | "document";
//     title: string;
//     link: string;
//     _id: string;
//     userId?: string;
// }

// const verify = localStorage.getItem("token");

// const logos = {
//     youtube: <Youtube />,
//     facebook: <Facebook />,
//     x: <X />,
//     document: <Document />,
// };

// const Card = (props: CardLay) => {
//     return (
//         <div className="flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105">
//             <div className="max-w-[15rem] rounded-xl backdrop-blur-md bg-white/10 border border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]">
                
//                 {/* Header */}
//                 <div className="flex justify-between items-center px-4 pt-3 text-white font-semibold">
//                     <div className="flex items-center gap-2">
//                         {logos[props.Type]}
//                         <span className="truncate max-w-[8rem]">{props.title}</span>
//                     </div>
//                     <div className="flex gap-2 items-center">
//                         <ShareIcon />
//                         {verify ? <DelContent _id={props._id} /> : null}
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div className="mt-3">
//                     {/* YouTube */}
//                     {props.Type === "youtube" && (
//                         <iframe
//                             className="w-full h-[200px] p-3 rounded-2xl border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.4)]"
//                             src={props.link.replace("watch?v=", "embed/")}
//                             title="YouTube video player"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                             allowFullScreen
//                         ></iframe>
//                     )}

//                     {/* Twitter/X */}
//                     {props.Type === "x" && (
//                         <div className="p-3">
//                             <blockquote
//                                 className="twitter-tweet rounded-2xl border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.4)]"
//                                 data-media-max-width="560"
//                             >
//                                 <a href={props.link.replace("x", "twitter")}></a>
//                             </blockquote>
//                             <script async src="https://platform.twitter.com/widgets.js"></script>
//                         </div>
//                     )}

//                     {/* Facebook */}
//                     {props.Type === "facebook" && (
//                         <iframe
//                             className="w-full h-[200px] p-3 rounded-2xl border border-blue-400 shadow-[0_0_10px_rgba(0,136,255,0.4)]"
//                             src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(props.link)}&show_text=true&width=400`}
//                             width="400"
//                             height="200"
//                             style={{ border: "none", overflow: "hidden" }}
//                             scrolling="no"
//                             frameBorder="0"
//                             allowFullScreen={true}
//                             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
//                         ></iframe>
//                     )}

//                     {/* Document (PDF) */}
//                     {props.Type === "document" && (
//                         <iframe
//                             className="w-full h-[200px] p-3 rounded-2xl border border-purple-400 shadow-[0_0_10px_rgba(160,32,240,0.4)]"
//                             src={props.link}
//                             title="Document Viewer"
//                             frameBorder="0"
//                         ></iframe>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Card;
