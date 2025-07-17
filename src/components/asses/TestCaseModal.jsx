import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TestCaseModal = ({
  popupOpen,
  setPopupOpen,
  editingTestCase,
  setEditingTestCase,
  newTestCase,
  setNewTestCase,
  inputFile,
  setInputFile,
  outputFile,
  setOutputFile,
  handleAddTestCase,
  handleInputFileChange,
  handleOutputFileChange,
}) => {
  return (
    <AnimatePresence>
      {popupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingTestCase ? "Edit Test Case" : "Add Test Case"}
                </h2>
                <button
                  onClick={() => {
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
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="What does this test case check?"
                    value={newTestCase.description}
                    onChange={(e) =>
                      setNewTestCase({
                        ...newTestCase,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Input and Output in same row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Input Section */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start space-x-2">
                        <input
                          type="radio"
                          className="mt-1 form-radio h-4 w-4 text-blue-600"
                          checked={!inputFile}
                          onChange={() => setInputFile(null)}
                        />
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">
                            Enter input data
                          </span>
                          <textarea
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            rows="4"
                            placeholder="Enter input data"
                            value={newTestCase.input}
                            onChange={(e) =>
                              setNewTestCase({
                                ...newTestCase,
                                input: e.target.value,
                              })
                            }
                          />
                        </div>
                      </label>
                      <label className="flex items-start space-x-2">
                        <input
                          type="radio"
                          className="mt-1 form-radio h-4 w-4 text-blue-600"
                          checked={!!inputFile}
                          onChange={() => {}}
                        />
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">
                            Upload input file
                          </span>
                          <div className="mt-1 flex items-center space-x-2">
                            <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                              <span>
                                {inputFile ? inputFile.name : "Choose file"}
                              </span>
                              <input
                                type="file"
                                className="sr-only"
                                onChange={handleInputFileChange}
                              />
                            </label>
                            {inputFile && (
                              <span className="text-xs text-gray-500">
                                File loaded
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Output Section */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Output
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start space-x-2">
                        <input
                          type="radio"
                          className="mt-1 form-radio h-4 w-4 text-blue-600"
                          checked={!outputFile}
                          onChange={() => setOutputFile(null)}
                        />
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">
                            Enter output data
                          </span>
                          <textarea
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            rows="4"
                            placeholder="Enter expected output"
                            value={newTestCase.output}
                            onChange={(e) =>
                              setNewTestCase({
                                ...newTestCase,
                                output: e.target.value,
                              })
                            }
                          />
                        </div>
                      </label>
                      <label className="flex items-start space-x-2">
                        <input
                          type="radio"
                          className="mt-1 form-radio h-4 w-4 text-blue-600"
                          checked={!!outputFile}
                          onChange={() => {}}
                        />
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">
                            Upload output file
                          </span>
                          <div className="mt-1 flex items-center space-x-2">
                            <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                              <span>
                                {outputFile ? outputFile.name : "Choose file"}
                              </span>
                              <input
                                type="file"
                                className="sr-only"
                                onChange={handleOutputFileChange}
                              />
                            </label>
                            {outputFile && (
                              <span className="text-xs text-gray-500">
                                File loaded
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Advanced Test Case Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                      value={newTestCase.category}
                      onChange={(e) =>
                        setNewTestCase({
                          ...newTestCase,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="basic">Basic cases</option>
                      <option value="edge">Edge cases</option>
                      <option value="performance">Performance</option>
                      <option value="error">Error handling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weightage (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                      value={newTestCase.weightage}
                      onChange={(e) =>
                        setNewTestCase({
                          ...newTestCase,
                          weightage: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visibility
                    </label>
                    <select
                      className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                      value={newTestCase.visibility}
                      onChange={(e) =>
                        setNewTestCase({
                          ...newTestCase,
                          visibility: e.target.value,
                        })
                      }
                    >
                      <option value="open">Open (visible)</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isSample"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={newTestCase.isSample}
                    onChange={(e) =>
                      setNewTestCase({
                        ...newTestCase,
                        isSample: e.target.checked,
                      })
                    }
                  />
                  <label
                    htmlFor="isSample"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Mark as sample test case
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => {
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
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={handleAddTestCase}
                >
                  {editingTestCase ? "Update" : "Add"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestCaseModal;