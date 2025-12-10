// import { 
//   Trophy, 
//   Clock, 
//   Target, 
//   TrendingUp, 
//   CheckCircle, 
//   XCircle, 
//   RotateCcw,
//   Share2,
//   Download,
//   Home,
//   BookOpen
// } from 'lucide-react';
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// export default function ExamResults({ results, onRetakeExam, onBackToDashboard, user }) {
//     // Certificate download handler
//     const handleDownloadCertificate = async () => {
//       try {
//         const pdfDoc = await PDFDocument.create();
//         const page = pdfDoc.addPage([600, 400]);
//         const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//         const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

//         // Title
//         page.drawText('Certificate of Achievement', {
//           x: 80,
//           y: 340,
//           size: 32,
//           font,
//           color: rgb(0.2, 0.2, 0.6),
//         });

//         // Subtitle
//         page.drawText('This is to certify that', {
//           x: 180,
//           y: 290,
//           size: 18,
//           font: fontRegular,
//           color: rgb(0, 0, 0),
//         });

//         // User Name
//         page.drawText(user?.name || 'Your Name', {
//           x: 180,
//           y: 260,
//           size: 24,
//           font,
//           color: rgb(0, 0.4, 0.2),
//         });

//         // Achievement
//         page.drawText('has successfully completed the exam:', {
//           x: 120,
//           y: 220,
//           size: 16,
//           font: fontRegular,
//           color: rgb(0, 0, 0),
//         });

//         // Exam/Skill Name
//         page.drawText(results?.examName || 'Skill Exam', {
//           x: 120,
//           y: 200,
//           size: 20,
//           font,
//           color: rgb(0.2, 0.2, 0.6),
//         });

//         // Score
//         page.drawText(`Score: ${results?.score ?? 'N/A'}%`, {
//           x: 120,
//           y: 170,
//           size: 16,
//           font: fontRegular,
//           color: rgb(0, 0, 0),
//         });

//         // Date
//         page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
//           x: 120,
//           y: 150,
//           size: 14,
//           font: fontRegular,
//           color: rgb(0, 0, 0),
//         });

//         // Save and download
//         const pdfBytes = await pdfDoc.save();
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'certificate.pdf';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } catch (err) {
//         alert('Failed to generate certificate.');
//       }
//     };
//   const { score, totalQuestions, answeredQuestions, timeSpent, answers, questions } = results;
  
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const getScoreColor = (score) => {
//     if (score >= 90) return 'text-green-600';
//     if (score >= 70) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const getScoreBgColor = (score) => {
//     if (score >= 90) return 'from-green-500 to-emerald-600';
//     if (score >= 70) return 'from-yellow-500 to-orange-600';
//     return 'from-red-500 to-pink-600';
//   };

//   const getPerformanceMessage = (score) => {
//     if (score >= 90) return { message: "Excellent! Outstanding performance!", icon: "🎉" };
//     if (score >= 70) return { message: "Good job! Room for improvement.", icon: "👍" };
//     return { message: "Keep practicing. You'll get there!", icon: "💪" };
//   };

//   const correctAnswers = questions.filter((_, index) => answers[index] === questions[index].correctAnswer).length;
//   const incorrectAnswers = answeredQuestions - correctAnswers;
//   const skippedQuestions = totalQuestions - answeredQuestions;

//   const performance = getPerformanceMessage(score);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="text-6xl mb-4">{performance.icon}</div>
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//             Exam Complete!
//           </h1>
//           <p className="text-lg text-gray-600">{performance.message}</p>
//         </div>

//         {/* Score Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
//           <div className={`bg-gradient-to-r ${getScoreBgColor(score)} p-8 text-white text-center`}>
//             <div className="text-6xl sm:text-7xl font-bold mb-2">{score}%</div>
//             <div className="text-xl opacity-90">Your Score</div>
//           </div>
          
//           <div className="p-6 sm:p-8">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                   <Target className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">{correctAnswers}</div>
//                 <div className="text-sm text-gray-600">Correct</div>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                   <XCircle className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">{incorrectAnswers}</div>
//                 <div className="text-sm text-gray-600">Incorrect</div>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                   <BookOpen className="w-6 h-6 text-gray-600" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">{skippedQuestions}</div>
//                 <div className="text-sm text-gray-600">Skipped</div>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                   <Clock className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">{formatTime(timeSpent)}</div>
//                 <div className="text-sm text-gray-600">Time Spent</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Performance Analysis */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//             <TrendingUp className="w-5 h-5 text-violet-600" />
//             Performance Analysis
//           </h2>
          
//           <div className="space-y-6">
//             {/* Score Breakdown */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium text-gray-700">Overall Performance</span>
//                 <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div 
//                   className={`h-3 rounded-full bg-gradient-to-r ${getScoreBgColor(score)}`}
//                   style={{ width: `${score}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Accuracy Rate */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium text-gray-700">Accuracy Rate</span>
//                 <span className="text-sm font-bold text-gray-900">
//                   {answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div 
//                   className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600"
//                   style={{ 
//                     width: `${answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0}%` 
//                   }}
//                 ></div>
//               </div>
//             </div>

//             {/* Completion Rate */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium text-gray-700">Completion Rate</span>
//                 <span className="text-sm font-bold text-gray-900">
//                   {Math.round((answeredQuestions / totalQuestions) * 100)}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div 
//                   className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
//                   style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Question Review */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Question Review</h2>
          
//           <div className="space-y-4">
//             {questions.map((question, index) => {
//               const userAnswer = answers[index];
//               const isCorrect = userAnswer === question.correctAnswer;
//               const wasAnswered = userAnswer !== undefined;
              
//               return (
//                 <div key={index} className="border border-gray-200 rounded-lg p-4">
//                   <div className="flex items-start gap-3">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                       !wasAnswered ? 'bg-gray-100' : isCorrect ? 'bg-green-100' : 'bg-red-100'
//                     }`}>
//                       {!wasAnswered ? (
//                         <span className="text-gray-600 font-medium text-sm">{index + 1}</span>
//                       ) : isCorrect ? (
//                         <CheckCircle className="w-5 h-5 text-green-600" />
//                       ) : (
//                         <XCircle className="w-5 h-5 text-red-600" />
//                       )}
//                     </div>
                    
//                     <div className="flex-1">
//                       <h3 className="font-medium text-gray-900 mb-2">
//                         Question {index + 1}: {question.question}
//                       </h3>
                      
//                       <div className="space-y-2 text-sm">
//                         {question.options.map((option, optionIndex) => (
//                           <div 
//                             key={optionIndex}
//                             className={`p-2 rounded ${
//                               optionIndex === question.correctAnswer 
//                                 ? 'bg-green-50 border border-green-200 text-green-800'
//                                 : optionIndex === userAnswer && !isCorrect
//                                 ? 'bg-red-50 border border-red-200 text-red-800'
//                                 : 'bg-gray-50'
//                             }`}
//                           >
//                             <div className="flex items-center gap-2">
//                               {optionIndex === question.correctAnswer && (
//                                 <CheckCircle className="w-4 h-4 text-green-600" />
//                               )}
//                               {optionIndex === userAnswer && !isCorrect && (
//                                 <XCircle className="w-4 h-4 text-red-600" />
//                               )}
//                               <span>{option}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
                      
//                       {!wasAnswered && (
//                         <div className="mt-2 text-sm text-gray-600 italic">
//                           Not answered
//                         </div>
//                       )}
                      
//                       {question.explanation && (
//                         <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
//                           <div className="text-sm text-blue-800">
//                             <strong>Explanation:</strong> {question.explanation}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={onBackToDashboard}
//             className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
//           >
//             <Home className="w-5 h-5" />
//             Back to Dashboard
//           </button>
          
//           <button
//             onClick={onRetakeExam}
//             className="flex items-center justify-center gap-2 bg-violet-100 hover:bg-violet-200 text-violet-700 px-6 py-3 rounded-lg font-medium transition-colors"
//           >
//             <RotateCcw className="w-5 h-5" />
//             Retake Exam
//           </button>
          
//           <button className="flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
//             <Share2 className="w-5 h-5" />
//             Share Results
//           </button>
          
//           <button
//             className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//             onClick={handleDownloadCertificate}
//           >
//             <Download className="w-5 h-5" />
//             Download Certificate
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Share2,
  Download,
  Home,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export default function ExamResults({ results, onRetakeExam, onBackToDashboard, user }) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate unique certificate ID
  const generateCertificateId = () => {
    const hash = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).toUpperCase().padStart(16, '0');
    };
    
    const idString = `${user?.id || user?.name}-${results?.examName}-${Date.now()}`;
    return hash(idString).substring(0, 24);
  };

  const certificateId = generateCertificateId();

  // Certificate download handler
  const handleDownloadCertificate = async () => {
    setIsDownloading(true);
    setShowCertificate(true);
    
    setTimeout(() => {
      const certificateElement = document.getElementById('certificate-preview');
      if (certificateElement) {
        try {
          // Create print window
          const printWindow = window.open('', '_blank');
          const certificateHTML = certificateElement.innerHTML;
          
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Certificate - ${user?.name || 'User'} - ${results?.examName || 'Exam'}</title>
                <meta charset="UTF-8">
                <style>
                  @page { 
                    size: landscape; 
                    margin: 0; 
                  }
                  body { 
                    margin: 0; 
                    padding: 0; 
                    width: 100vw;
                    height: 100vh;
                  }
                  * { 
                    box-sizing: border-box; 
                  }
                  #certificate-preview {
                    width: 100%;
                    height: 100%;
                  }
                </style>
                <script src="https://cdn.tailwindcss.com"></script>
              </head>
              <body>
                <div id="certificate-preview">
                  ${certificateHTML}
                </div>
              </body>
            </html>
          `);
          
          printWindow.document.close();
          
          // Wait for styles to load then print
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
            setShowCertificate(false);
            setIsDownloading(false);
          }, 500);
        } catch (error) {
          console.error('Error generating certificate:', error);
          alert('Failed to generate certificate. Please try again.');
          setShowCertificate(false);
          setIsDownloading(false);
        }
      }
    }, 100);
  };

  const { score, totalQuestions, answeredQuestions, timeSpent, answers, questions } = results;
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return { message: "Excellent! Outstanding performance!", icon: "🎉" };
    if (score >= 70) return { message: "Good job! Room for improvement.", icon: "👍" };
    return { message: "Keep practicing. You'll get there!", icon: "💪" };
  };

  const correctAnswers = questions.filter((_, index) => answers[index] === questions[index].correctAnswer).length;
  const incorrectAnswers = answeredQuestions - correctAnswers;
  const skippedQuestions = totalQuestions - answeredQuestions;

  const performance = getPerformanceMessage(score);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Hidden Certificate for Download */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Certificate Preview</h3>
              <button 
                onClick={() => !isDownloading && setShowCertificate(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                disabled={isDownloading}
              >
                ✕
              </button>
            </div>
            <div id="certificate-preview" className="w-full" style={{ aspectRatio: '1.41/1' }}>
              <Certificate user={user} results={results} certificateId={certificateId} />
            </div>
            {isDownloading && (
              <div className="mt-4 text-center text-sm text-gray-600">
                Preparing certificate for download...
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{performance.icon}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Exam Complete!
          </h1>
          <p className="text-lg text-gray-600">{performance.message}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${getScoreBgColor(score)} p-8 text-white text-center`}>
            <div className="text-6xl sm:text-7xl font-bold mb-2">{score}%</div>
            <div className="text-xl opacity-90">Your Score</div>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{incorrectAnswers}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{skippedQuestions}</div>
                <div className="text-sm text-gray-600">Skipped</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{formatTime(timeSpent)}</div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-600" />
            Performance Analysis
          </h2>
          
          <div className="space-y-6">
            {/* Score Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Performance</span>
                <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${getScoreBgColor(score)}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>

            {/* Accuracy Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Accuracy Rate</span>
                <span className="text-sm font-bold text-gray-900">
                  {answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600"
                  style={{ 
                    width: `${answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Completion Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                <span className="text-sm font-bold text-gray-900">
                  {Math.round((answeredQuestions / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Question Review</h2>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== undefined;
              
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      !wasAnswered ? 'bg-gray-100' : isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {!wasAnswered ? (
                        <span className="text-gray-600 font-medium text-sm">{index + 1}</span>
                      ) : isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-2 text-sm">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer 
                                ? 'bg-green-50 border border-green-200 text-green-800'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-50 border border-red-200 text-red-800'
                                : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {!wasAnswered && (
                        <div className="mt-2 text-sm text-gray-600 italic">
                          Not answered
                        </div>
                      )}
                      
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                          <div className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBackToDashboard}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <button
            onClick={onRetakeExam}
            className="flex items-center justify-center gap-2 bg-violet-100 hover:bg-violet-200 text-violet-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Exam
          </button>
          
          <button className="flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
            <Share2 className="w-5 h-5" />
            Share Results
          </button>
          
          <button
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDownloadCertificate}
            disabled={isDownloading}
          >
            <Download className="w-5 h-5" />
            {isDownloading ? 'Generating...' : 'Download Certificate'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Certificate Component matching your exact design
function Certificate({ user, results, certificateId }) {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Purple Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 L50 0 L100 50 L50 100 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern1)" />
        </svg>
      </div>

      {/* Orange Corner Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-orange-500 via-orange-400 to-transparent opacity-80" 
           style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}></div>
      
      {/* Orange Pattern Overlay */}
      <svg className="absolute top-0 right-0 w-1/3 h-1/2 opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pattern2" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white"/>
            <path d="M0 20 L20 0" stroke="white" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern2)" />
      </svg>

      {/* Red Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-red-600 via-red-500 to-transparent opacity-70"></div>

      {/* Main Certificate Card */}
      <div className="absolute inset-[5%] bg-white rounded-3xl shadow-2xl" style={{ border: '12px solid rgb(234, 179, 8)' }}>
        {/* Inner Border */}
        <div className="absolute inset-[2%] rounded-2xl" style={{ border: '2px solid rgb(250, 204, 21)' }}></div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-between p-[5%]">
          {/* Header */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 tracking-wider mb-1">CERTIFICATE</div>
            <div className="text-3xl font-bold text-gray-800 tracking-wider">OF COMPLETION</div>
          </div>

          {/* Badge */}
          <div className="absolute top-[5%] right-[5%] flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center shadow-xl" style={{ border: '4px solid rgb(234, 179, 8)' }}>
              <GraduationCap className="w-12 h-12 text-yellow-400" strokeWidth={2} />
            </div>
            <div className="mt-2 bg-purple-800 text-white px-3 py-1 rounded-lg text-xs font-bold text-center" style={{ border: '2px solid rgb(234, 179, 8)' }}>
              Skillexa<br/>Certified
            </div>
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-800 -mt-0.5"></div>
          </div>

          {/* Body */}
          <div className="text-center space-y-4 max-w-3xl">
            <p className="text-xl text-gray-700">This is to certify that</p>
            
            <h1 className="text-5xl font-serif font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              {user?.name || 'Participant Name'}
            </h1>
            
            <p className="text-lg text-gray-700">has successfully completed the</p>
            
            <h2 className="text-3xl font-bold text-gray-900">
              {results?.examName || 'Course Name'}
            </h2>
            
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto pt-2">
              In recognition of demonstrating proficiency and dedication to mastering the foundational concepts of {results?.examName || 'the course'}.
            </p>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="w-40 border-t-2 border-gray-400 pt-1 text-xs text-gray-600">
                Date
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-signature italic text-gray-800 mb-1" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                Alice K Dewey
              </div>
              <div className="w-48 border-t-2 border-gray-400 pt-1 text-xs text-gray-600">
                Lead AI Instructor
              </div>
            </div>
          </div>

          {/* Certificate ID and Logo */}
          <div className="absolute bottom-[3%] left-[3%] text-xs text-gray-500 font-mono tracking-wider">
            {certificateId}
          </div>
          
          <div className="absolute bottom-[3%] right-[3%] w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-yellow-400 italic" style={{ fontFamily: 'Impact, sans-serif' }}>S</span>
          </div>
        </div>
      </div>
    </div>
  );
}