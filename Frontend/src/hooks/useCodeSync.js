import { useEffect } from "react";
import { socket } from "../lib/socket";

const useCodeSync = ({ sessionId, setCode, setSelectedLanguage }) => {
  useEffect(() => {
    if (!sessionId) return;

    socket.emit("join-session", sessionId);

    // receive code
    socket.on("receive-code", (newCode) => {
      setCode(newCode);
    });

    // receive language
    socket.on("receive-language", (language) => {
      setSelectedLanguage(language);
    });

    return () => {
      socket.off("receive-code");
      socket.off("receive-language");
    };
  }, [sessionId]);

  // send code
  const syncCode = (code) => {
    socket.emit("code-change", {
      sessionId,
      code,
    });
  };

  // send language
  const syncLanguage = (language) => {
    socket.emit("language-change", {
      sessionId,
      language,
    });
  };

  return {
    syncCode,
    syncLanguage,
  };
};

export default useCodeSync;
