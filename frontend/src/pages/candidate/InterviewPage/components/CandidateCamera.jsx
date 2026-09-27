import React, { useEffect, useRef } from 'react';

const CandidateCamera = ({ isVideoOn }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: { ideal: 640 }, height: { ideal: 360 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Failed to access camera", err);
      }
    };

    if (isVideoOn) {
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isVideoOn]);

  return (
    <div className="w-[clamp(120px,20vw,180px)] aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/20 relative flex items-center justify-center shrink-0">
      {isVideoOn ? (
        <>
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover transform -scale-x-100" 
          />
          <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-sm">
            You
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 opacity-50"><path d="m2 2 20 20"/><path d="m14 14 3.38 3.38a2 2 0 0 0 2.81-2.81l-3.38-3.38"/><path d="M16 16v-2a2 2 0 0 0-2-2H8"/><path d="M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8"/><path d="m8 8 4-4 4 4"/></svg>
        </div>
      )}
    </div>
  );
};

export default CandidateCamera;
