import React from "react";

const AssessmentForm = ({
  question,
  setQuestion,
  description,
  setDescription,
  evaluationMode,
  setEvaluationMode,
  language,
  setLanguage,
  timeLimit,
  setTimeLimit,
  difficulty,
  setDifficulty,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            rows="3"
            placeholder="Enter question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            rows="3"
            placeholder="Enter description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Evaluation Mode
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                checked={evaluationMode === "auto"}
                onChange={() => setEvaluationMode("auto")}
              />
              <span>Auto evaluate using test cases</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                checked={evaluationMode === "manual"}
                onChange={() => setEvaluationMode("manual")}
              />
              <span>Manual evaluation</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Programming Language
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="all">All</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="typescript">TypeScript</option>
            <option value="ruby">Ruby</option>
            <option value="swift">Swift</option>
            <option value="php">PHP</option>
            <option value="ocaml">OCaml</option>
            <option value="vb">VB.NET</option>
            <option value="lua">Lua</option>
            <option value="haskell">Haskell</option>
            <option value="dart">Dart</option>
            <option value="elixir">Elixir</option>
            <option value="julia">Julia</option>
            <option value="racket">Racket</option>
            <option value="powershell">PowerShell</option>
            <option value="bash">Bash</option>
            <option value="r">R</option>
            <option value="scala">Scala</option>
            <option value="perl">Perl</option>
            <option value="csharp">C#</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Limit (min)
            </label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentForm;
