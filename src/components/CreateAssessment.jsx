import React, { useState } from "react";
import { motion } from "framer-motion";
import AssessmentForm from "./asses/AssessmentForm";
import TestCasesTable from "./asses/TestCasesTable";
import TestCaseModal from "./asses/TestCaseModal";
import CustomAlert from "./CustomAlert";
import ConfirmSubmit from "./ConfirmSubmit";

const CreateAssessment = () => {
  // Form states
  const [question, setQuestion] = useState("Write program to add 2 numbers");
  const [evaluationMode, setEvaluationMode] = useState("auto");
  const [language, setLanguage] = useState("all");
  const [description, setDescription] = useState("Dummy description");
  const [timeLimit, setTimeLimit] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [testCases, setTestCases] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [newTestCase, setNewTestCase] = useState({
    input: "",
    output: "",
    description: "",
    category: "basic",
    weightage: 10,
    visibility: "open",
    isSample: false,
  });
  const [inputFile, setInputFile] = useState(null);
  const [outputFile, setOutputFile] = useState(null);
  const [alertMessages, setAlertMessages] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddTestCase = () => {
    if (!newTestCase.input || !newTestCase.output) {
      setAlertMessages([
        ...alertMessages,
        { text: "Input and Output are required", type: "error" },
      ]);
      return;
    }

    if (editingTestCase) {
      setTestCases(
        testCases.map((tc) =>
          tc.id === editingTestCase
            ? { ...newTestCase, id: editingTestCase }
            : tc
        )
      );
      setAlertMessages([
        ...alertMessages,
        { text: "Test case updated successfully", type: "success" },
      ]);
    } else {
      setTestCases([
        ...testCases,
        {
          ...newTestCase,
          id: Date.now(),
        },
      ]);
      setAlertMessages([
        ...alertMessages,
        { text: "Test case added successfully", type: "success" },
      ]);
    }

    setPopupOpen(false);
    setEditingTestCase(null);
    setNewTestCase({
      input: "",
      output: "",
      description: "",
      category: "basic",
      weightage: 10,
      visibility: "open",
      isSample: false,
    });
    setInputFile(null);
    setOutputFile(null);
  };

  const handleEditTestCase = (id) => {
    const tcToEdit = testCases.find((tc) => tc.id === id);
    setNewTestCase(tcToEdit);
    setEditingTestCase(id);
    setPopupOpen(true);
  };

  const handleDeleteTestCase = (id) => {
    setTestCases(testCases.filter((tc) => tc.id !== id));
    setAlertMessages([
      ...alertMessages,
      { text: "Test case deleted successfully", type: "success" },
    ]);
  };

  const handleInputFileChange = (e) => {
    const file = e.target.files[0];
    setInputFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setNewTestCase({ ...newTestCase, input: event.target.result });
    };
    reader.readAsText(file);
  };

  const handleOutputFileChange = (e) => {
    const file = e.target.files[0];
    setOutputFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setNewTestCase({ ...newTestCase, output: event.target.result });
    };
    reader.readAsText(file);
  };

  const handlePublish = () => {
    if (!question || !description || (evaluationMode === "auto" && testCases.length === 0)) {
      setAlertMessages([
        ...alertMessages,
        {
          text: "Please fill all required fields" + (evaluationMode === "auto" ? " and add at least one test case" : ""),
          type: "error",
        },
      ]);
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmPublish = () => {
    const assessmentData = {
      question,
      evaluationMode,
      language,
      description,
      timeLimit,
      difficulty,
      testCases: evaluationMode === "auto" ? testCases : [],
    };

    try {
      const encodedData = encodeURIComponent(btoa(JSON.stringify(assessmentData)));
      window.location.href = `/editor?data=${encodedData}`;
      setAlertMessages([
        ...alertMessages,
        { text: "Assessment published successfully", type: "success" },
      ]);
    } catch (err) {
      console.error("Encoding error:", err);
      setAlertMessages([
        ...alertMessages,
        { text: "Something went wrong while publishing.", type: "error" },
      ]);
    }
    setShowConfirm(false);
  };

  const handleCancelPublish = () => {
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <CustomAlert
        messages={alertMessages}
        duration={3000}
        onClose={setAlertMessages}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl overflow-hidden"
          whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="p-5">
            <motion.h1
              className="text-2xl font-bold text-gray-800 mb-6"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Create Assessment
            </motion.h1>

            <AssessmentForm
              question={question}
              setQuestion={setQuestion}
              description={description}
              setDescription={setDescription}
              evaluationMode={evaluationMode}
              setEvaluationMode={setEvaluationMode}
              language={language}
              setLanguage={setLanguage}
              timeLimit={timeLimit}
              setTimeLimit={setTimeLimit}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />

            {evaluationMode === "auto" && (
              <TestCasesTable
                testCases={testCases}
                setPopupOpen={setPopupOpen}
                handleEditTestCase={handleEditTestCase}
                handleDeleteTestCase={handleDeleteTestCase}
              />
            )}

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
                onClick={handlePublish}
              >
                Publish Assessment
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ConfirmSubmit
        show={showConfirm}
        onConfirm={handleConfirmPublish}
        onCancel={handleCancelPublish}
      />

      <TestCaseModal
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        editingTestCase={editingTestCase}
        setEditingTestCase={setEditingTestCase}
        newTestCase={newTestCase}
        setNewTestCase={setNewTestCase}
        inputFile={inputFile}
        setInputFile={setInputFile}
        outputFile={outputFile}
        setOutputFile={setOutputFile}
        handleAddTestCase={handleAddTestCase}
        handleInputFileChange={handleInputFileChange}
        handleOutputFileChange={handleOutputFileChange}
      />
    </div>
  );
};

export default CreateAssessment;