// src/pages/Room.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PopUp from '../components/PopUp';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import VideoPlayer from '../components/VideoPlayer';

function Room() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [showPopUp, setShowPopUp] = useState(true);
  const [username, setUsername] = useState("");

  const handleUsernameSubmit = (name) => {
    setUsername(name);
    dispatch(addUser(name));
    setShowPopUp(false);
  };

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-2">Room: {roomId}</h2>
      {showPopUp ? (
        <PopUp onSubmit={handleUsernameSubmit} />
      ) : (
        <div className="min-h-screen p-4">
          <h2 className="text-2xl font-bold mb-4">Welcome, {username}!</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Video Section */}
            <div className="flex-1">
              <VideoPlayer videoId="3NAnIwtMWmo" roomId={roomId} />
            </div>
            {/* Chat Section can be added here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;





















// // src/pages/Room.jsx
// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PopUp from '../components/PopUp';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';
// import { createSocketConnection } from '../utils/socket.config';


// function Room() {
//   const dispatch = useDispatch();
//   const { roomId } = useParams();
//   // console.log("Room ID:", roomId);

//   const [showPopUp, setShowPopUp] = useState(true);
//   const [username, setUsername] = useState("");


//   const handleUsernameSubmit = (name) => {
//     setUsername(name)
//     dispatch(addUser(name))
//     setShowPopUp(false);
//   };

//   return (
//     <div className="min-h-screen p-4">
//       <h2 className="text-2xl font-bold mb-2">Room: {roomId}</h2>
//       {showPopUp ? (
//         <PopUp onSubmit={handleUsernameSubmit} />
//       ) : (


//         <div className="min-h-screen p-4">
//           <h2 className="text-2xl font-bold mb-4">Room: {roomId}</h2>
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Video Section */}
//             <div className="flex-1">
//               <iframe 
//                 width="560" 
//                 height="315" 
//                 src="https://www.youtube.com/embed/3NAnIwtMWmo?si=wRfIu5ASxWSC6qb6" 
//                 title="YouTube video player" 
//                 frameBorder="0" 
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//                 referrerPolicy="strict-origin-when-cross-origin" 
//                 allowFullScreen
//               ></iframe>
//             </div>
//             {/* Chat Section */}
//             {/* <div className="flex-1 flex flex-col">
//               <div className="flex-grow border p-4 overflow-y-auto">
//                 {chatMessages.map((msg, index) => (
//                   <div key={index} className="mb-2">
//                     <span className="font-semibold">{msg.sender}: </span>
//                     <span>{msg.message}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Type your message..."
//                   value={chatInput}
//                   onChange={(e) => setChatInput(e.target.value)}
//                   className="flex-grow border p-2 rounded"
//                 />
//                 <button
//                   onClick={sendChatMessage}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div> */}
//           </div>
//         </div>


//         // <div>
//         //   <p className="mb-4">Welcome, <span className="font-semibold">{username}</span>!</p>
//         //   {/* Room content goes here */}
//         //   <p>This is the room content. You can add your video player, chat, etc.</p>
//         // </div>
//       )}
//     </div>
//   );
// }

// export default Room;
