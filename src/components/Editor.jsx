// // Editor.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import "./editor.css";

// import pythonIcon from "../assets/icons/python.svg";
// import javascriptIcon from "../assets/icons/javascript.svg";
// import javaIcon from "../assets/icons/java.svg";
// import cIcon from "../assets/icons/c.svg";
// import cppIcon from "../assets/icons/cpp.svg";
// import goIcon from "../assets/icons/go.svg";
// import rustIcon from "../assets/icons/rust.svg";
// import typescriptIcon from "../assets/icons/typescript.svg";
// import rubyIcon from "../assets/icons/ruby.svg";
// import swiftIcon from "../assets/icons/swift.svg";
// import phpIcon from "../assets/icons/php.svg";
// import allIcon from "../assets/icons/all.svg";

// const Editor = () => {
//   const iframeRef = useRef();
//   const navigate = useNavigate();
//   const [iframeLoaded, setIframeLoaded] = useState(false);

//   const [isLoading, setIsLoading] = useState(true);
//   const [searchParams] = useSearchParams();
//   const language = searchParams.get("language");
//   const question = searchParams.get("question");
//   const [submissionData, setSubmissionData] = useState(null);

//   useEffect(() => {
//     if (!iframeLoaded || !iframeRef.current?.contentWindow || !question) return;

//     const sendMessage = () => {
//       iframeRef.current.contentWindow.postMessage(
//         {
//           type: "INIT",
//           payload: { question, language },
//         },
//         import.meta.env.VITE_CHILD_APP
//       );
//     };

//     sendMessage();
//     setIsLoading(false);
//   }, [iframeLoaded, question, language]);

//   useEffect(() => {
//     const handleMessage = (event) => {
//       const validOrigins = [
//         import.meta.env.VITE_CHILD_APP,
//         "https://instantcoder.netlify.app",
//         "http://localhost:5174",
//       ].filter(Boolean);

//       if (!validOrigins.includes(event.origin)) return;
//       if (event.data?.type === "CLEAR_SUBMISSION") {
//         // Clear previous submission immediately
//         setSubmissionData(null);
//       } else if (event.data?.type === "SUBMIT") {
//         const submissionId = event.data.payload?.submissionId;
//         if (submissionId) {
//           event.source?.postMessage?.(
//             { type: "SUBMIT_RECEIVED" },
//             event.origin
//           );
//           const fetchSubmission = async () => {
//             try {
//               const res = await fetch(
//                 `${
//                   import.meta.env.VITE_BACKEND_URL
//                 }/api/submissions/${submissionId}`
//               );
//               const data = await res.json();
//               setSubmissionData(data);
//             } catch (err) {
//               console.error("Failed to fetch submission preview:", err);
//             }
//           };
//           fetchSubmission();
//         }
//       }
//     };

//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, [navigate]);

//   const languageIcons = {
//     python: pythonIcon,
//     javascript: javascriptIcon,
//     java: javaIcon,
//     c: cIcon,
//     cpp: cppIcon,
//     go: goIcon,
//     rust: rustIcon,
//     typescript: typescriptIcon,
//     ruby: rubyIcon,
//     swift: swiftIcon,
//     php: phpIcon,
//   };

//   return (
//     <motion.div
//       className="editor-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="editor-glass-panel"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <motion.div
//           className="editor-header"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="header-content">
//             <div className="question-side">
//               <div className="question-meta">
//                 <span className="language-badge">
//                   <img
//                     src={languageIcons[language?.toLowerCase()] || allIcon}
//                     alt={language}
//                     className="language-icon"
//                   />
//                   <span className="language-name">
//                     {language || "All Languages"}
//                   </span>
//                 </span>
//                 <span className="question-label">PROBLEM STATEMENT</span>
//               </div>
//               <h1 className="question-text">{question}</h1>
//             </div>

//             {submissionData?.code && (
//               <motion.div
//                 className="code-preview"
//                 initial={{ x: 100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: 100, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 60, damping: 15 }}
//               >
//                 <div className="preview-heading">Your Submitted Code</div>
//                 <div className="preview-scroll">
//                   <code>{submissionData.code}</code>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>

//         <motion.div
//           className="editor-wrapper"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//         >
//           <AnimatePresence>
//             {isLoading && (
//               <motion.div
//                 className="loading-overlay"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="loading-spinner"
//                 />
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                     duration: 1,
//                   }}
//                 >
//                   Loading editor...
//                 </motion.p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <iframe
//             ref={iframeRef}
//             src={import.meta.env.VITE_CHILD_APP}
//             onLoad={() => setIframeLoaded(true)}
//             title="Code Editor"
//             className="editor-iframe"
//           />
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Editor;


import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./editor.css";

import pythonIcon from "../assets/icons/python.svg";
import javascriptIcon from "../assets/icons/javascript.svg";
import javaIcon from "../assets/icons/java.svg";
import cIcon from "../assets/icons/c.svg";
import cppIcon from "../assets/icons/cpp.svg";
import goIcon from "../assets/icons/go.svg";
import rustIcon from "../assets/icons/rust.svg";
import typescriptIcon from "../assets/icons/typescript.svg";
import rubyIcon from "../assets/icons/ruby.svg";
import swiftIcon from "../assets/icons/swift.svg";
import phpIcon from "../assets/icons/php.svg";
import allIcon from "../assets/icons/all.svg";

const Editor = () => {
  const iframeRef = useRef();
  const navigate = useNavigate();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [assessmentData, setAssessmentData] = useState({
    question: "",
    language: "",
    testCases: [],
  });
  const [submissionData, setSubmissionData] = useState(null);

  useEffect(() => {
    const data = searchParams.get("data");
    let question = searchParams.get("question") || "";
    let language = searchParams.get("language") || "";
    let testCases = [];

    if (data) {
      try {
        const decodedData = JSON.parse(atob(decodeURIComponent(data)));
        question = decodedData.question || question;
        language = decodedData.language || language;
        testCases = decodedData.testCases || [];
      } catch (err) {
        console.error("Failed to decode assessment data:", err);
      }
    }

    setAssessmentData({ question, language, testCases });
    setIsLoading(false);
  }, [searchParams]);

  useEffect(() => {
    if (!iframeLoaded || !iframeRef.current?.contentWindow || !assessmentData.question) return;

    const sendMessage = () => {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "INIT",
          payload: {
            question: assessmentData.question,
            language: assessmentData.language,
            testCases: assessmentData.testCases,
          },
        },
        import.meta.env.VITE_CHILD_APP
      );
    };

    sendMessage();
  }, [iframeLoaded, assessmentData]);

  useEffect(() => {
    const handleMessage = (event) => {
      const validOrigins = [
        import.meta.env.VITE_CHILD_APP,
        "https://instantcoder.netlify.app",
        "http://localhost:5174",
      ].filter(Boolean);

      if (!validOrigins.includes(event.origin)) return;
      if (event.data?.type === "CLEAR_SUBMISSION") {
        setSubmissionData(null);
      } else if (event.data?.type === "SUBMIT") {
        const submissionId = event.data.payload?.submissionId;
        if (submissionId) {
          event.source?.postMessage?.(
            { type: "SUBMIT_RECEIVED" },
            event.origin
          );
          const fetchSubmission = async () => {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/submissions/${submissionId}`
              );
              const data = await res.json();
              setSubmissionData(data);
            } catch (err) {
              console.error("Failed to fetch submission preview:", err);
            }
          };
          fetchSubmission();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  const languageIcons = {
    python: pythonIcon,
    javascript: javascriptIcon,
    java: javaIcon,
    c: cIcon,
    cpp: cppIcon,
    go: goIcon,
    rust: rustIcon,
    typescript: typescriptIcon,
    ruby: rubyIcon,
    swift: swiftIcon,
    php: phpIcon,
  };

  return (
    <motion.div
      className="editor-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="editor-glass-panel"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="editor-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="header-content">
            <div className="question-side">
              <div className="question-meta">
                <span className="language-badge">
                  <img
                    src={languageIcons[assessmentData.language?.toLowerCase()] || allIcon}
                    alt={assessmentData.language}
                    className="language-icon"
                  />
                  <span className="language-name">
                    {assessmentData.language || "All Languages"}
                  </span>
                </span>
                <span className="question-label">PROBLEM STATEMENT</span>
              </div>
              <h1 className="question-text">{assessmentData.question}</h1>
            </div>

            {submissionData?.code && (
              <motion.div
                className="code-preview"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
              >
                <div className="preview-heading">Your Submitted Code</div>
                <div className="preview-scroll">
                  <code>{submissionData.code}</code>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="editor-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="loading-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="loading-spinner"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1,
                  }}
                >
                  Loading editor...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <iframe
            ref={iframeRef}
            src={import.meta.env.VITE_CHILD_APP}
            onLoad={() => setIframeLoaded(true)}
            title="Code Editor"
            className="editor-iframe"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Editor;