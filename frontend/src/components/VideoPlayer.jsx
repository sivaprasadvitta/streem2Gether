// src/components/VideoPlayer.jsx
import React, { useEffect, useRef } from 'react';
import { createSocketConnection } from '../utils/socket.config';

const VideoPlayer = ({ videoId, roomId }) => {
  const playerRef = useRef(null);
  const socket = createSocketConnection();

  // This ref helps store the last emitted time if you need to compare (for seek detection)
  const lastTimeRef = useRef(0);

  useEffect(() => {
    // Define callback to create the player once API is ready
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        height: '315',
        width: '560',
        videoId: videoId,
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // Load YouTube IFrame API if not loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // Set global callback
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }

    // Listen for incoming video events and update the player accordingly
    const handleVideoEvent = (data) => {
      if (data.roomId !== roomId) return;
      if (!playerRef.current) return;
      console.log("Received video event:", data);
      // Based on action, update the player
      if (data.action === 'pause') {
        playerRef.current.seekTo(data.currentTime, true);
        playerRef.current.pauseVideo();
      } else if (data.action === 'play') {
        playerRef.current.seekTo(data.currentTime, true);
        playerRef.current.playVideo();
      }
      // Optionally, you could handle a 'seek' action separately if needed:
      else if (data.action === 'seek') {
        playerRef.current.seekTo(data.currentTime, true);
      }
      // Update the last time (if needed for further logic)
      lastTimeRef.current = data.currentTime;
    };

    socket.on('videoEvent', handleVideoEvent);

    // Cleanup: remove listener and destroy player on unmount
    return () => {
      socket.off('videoEvent', handleVideoEvent);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, roomId, socket]);

  // Handler for local player state changes
  const onPlayerStateChange = (event) => {
    if (!playerRef.current) return;
    const currentTime = playerRef.current.getCurrentTime();

    // YouTube state codes:
    // PLAYING === 1, PAUSED === 2
    if (event.data === window.YT.PlayerState.PAUSED) {
      // If the difference is significant, treat as a seek event
      if (Math.abs(currentTime - lastTimeRef.current) > 1) {
        socket.emit('videoEvent', { action: 'seek', roomId, currentTime });
      } else {
        socket.emit('videoEvent', { action: 'pause', roomId, currentTime });
      }
      lastTimeRef.current = currentTime;
    } else if (event.data === window.YT.PlayerState.PLAYING) {
      socket.emit('videoEvent', { action: 'play', roomId, currentTime });
      lastTimeRef.current = currentTime;
    }
  };

  return (
    <div>
      <div id="yt-player"></div>
    </div>
  );
};

export default VideoPlayer;
