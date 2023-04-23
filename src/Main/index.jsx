import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import styles from "./styles.module.css";


const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleGetApi = () => {
    // Code to fetch API goes here
  };

  const handleAddQuestion = () => {
    const newQuestion = prompt('Enter a new question:');
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  const handleAddAnswer = () => {
    const newAnswer = prompt('Enter a new answer:');
    setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const newQuestions = [];
      const newAnswers = [];

      parsedData.forEach((row) => {
        const question = row[0];
        const answer = row[1];

        if (question && answer) {
          newQuestions.push(question);
          newAnswers.push(answer);
        }
      });

      setQuestions(prevQuestions => [...prevQuestions, ...newQuestions]);
      setAnswers(prevAnswers => [...prevAnswers, ...newAnswers]);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Drexel Bot</h1>
        <div>
          <button className={styles.white_btn} onClick={handleGetApi}>
            Get API
          </button>
          <button className={styles.white_btn} onClick={handleAddQuestion}>
            Add Question
          </button>
          <button className={styles.white_btn} onClick={handleAddAnswer}>
            Add Answer
          </button>
          <label htmlFor="file-upload" className={styles.btn_choose_file}>
            Choose Excel Sheet
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx"
            className={styles.input_file}
            onChange={handleFileUpload}
          />
        </div>
      </nav>
      <div>
        <h2>Questions:</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{question}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Answers:</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

  
  export default Main;