import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { questions, roles } from '../constants';
import { withLoadTracking } from './withLoadTracking'

const RoleSelection = withLoadTracking(({ onLoad, onBack, onSubmit, isSubmitting }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [appliedRoles, setAppliedRoles] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showBackWarning, setShowBackWarning] = useState(false);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && selectedRole) {
        setSelectedRole(null);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedRole]);
  
  // Define the available roles

  const handleRoleSelection = (role) => {
    // If clicking on the currently selected role, deselect it
    if (selectedRole === role) {
      setSelectedRole(null);
    } else {
      // If a role was previously selected, check if all questions are answered
      if (selectedRole) {
        const currentAnswers = answers[selectedRole] || {};
        const allAnswered = questions[selectedRole].every((_, index) => 
          currentAnswers[index] && currentAnswers[index].trim() !== ''
        );
        
        // If all questions are answered, automatically apply the role
        if (allAnswered && !appliedRoles.includes(selectedRole)) {
          setAppliedRoles([...appliedRoles, selectedRole]);
        }
      }
      
      // Select the new role
      setSelectedRole(role);
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = {
      ...answers,
      [selectedRole]: {
        ...(answers[selectedRole] || {}),
        [index]: value
      }
    };
    
    setAnswers(newAnswers);
    
    // Check if all questions for the selected role are now answered
    const allAnswered = questions[selectedRole].every((_, idx) => 
      newAnswers[selectedRole][idx] && newAnswers[selectedRole][idx].trim() !== ''
    );
    
    // If all questions are answered, automatically mark as applied
    if (allAnswered && !appliedRoles.includes(selectedRole)) {
      setAppliedRoles([...appliedRoles, selectedRole]);
    } else if (!allAnswered && appliedRoles.includes(selectedRole)) {
      // If not all questions are answered and the role was applied, unapply it
      setAppliedRoles(appliedRoles.filter(r => r !== selectedRole));
    }
  };

  const handleSubmit = () => {
    console.log("Roles Submitted ", appliedRoles, answers)
    if (appliedRoles.length === 0) {
      alert('Please select and complete at least one role.');
      return;
    }
    
    // Prepare the data to be submitted
    const formData = {
      selectedRoles: appliedRoles,
      answers: answers
    };
    
    onSubmit(formData);
  };

  const containerVariants = {
    row: { 
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "center",
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.1,
        when: "beforeChildren" 
      }
    },
    column: { 
      flexDirection: "column", 
      alignItems: "start",
      justifyContent: "flex-start",
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  // Smooth animation for role buttons
  const roleButtonVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    animate: (i) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.05,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }),
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    layout: {
      type: "spring",
      damping: 25,
      stiffness: 120
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between w-full min-h-screen py-6 sm:py-8 md:py-12 px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-white text-center font-bold mt-2 mb-6 sm:mb-8 md:mb-12 tracking-tight drop-shadow-lg">
        <span className="text-white">Choose Your Role</span>
      </h1>
      
      {/* Role selection options */}
      <div className={`relative flex flex-col md:flex-row h-full w-full max-w-6xl mx-auto justify-center ${selectedRole ? 'items-start' : 'items-center'} gap-4 sm:gap-6 md:gap-8 transition-all duration-700 ease-in-out`}>
        <motion.div 
          className={`flex gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 transition-all duration-500 ease-in-out flex-wrap sm:flex-nowrap
            ${selectedRole ? 'w-[99%] md:w-1/5' : 'justify-center max-w-md'}`}
          variants={containerVariants}
          initial={false}
          animate={isMobile ? 'row' : selectedRole ? "column" : "row"}
        >
          {roles.map((role, index) => {
            const isSelected = selectedRole === role;
            const isApplied = appliedRoles.includes(role);
            
            return (
              <motion.div
                key={role}
                custom={index}
                variants={roleButtonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layoutId={`role-${role}`}
                layout="position"
                className={`cursor-pointer p-3 sm:p-4 md:p-5 rounded-xl text-white text-base sm:text-lg md:text-xl font-semibold shadow-xl backdrop-blur-sm transition-colors duration-300 
                  ${isSelected ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                    isApplied ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                    'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-blue-600 hover:to-blue-700'}`}
                onClick={() => handleRoleSelection(role)}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  layout: { type: "spring", stiffness: 150, damping: 30 },
                  default: { duration: 0.3 }
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {isApplied && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white"
                    />
                  )}
                  {role}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Questions for selected role */}
        <AnimatePresence mode="wait">
          {selectedRole && (
            <motion.div
              className="w-full h-1/4 pb-10 md:pb-0 overflow-scroll bg-white bg-opacity-95 pt-3 sm:pt-4 px-4 sm:px-6 rounded-2xl shadow-2xl border border-gray-200"
              initial={{ opacity: 0, x: 50, height: 0 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                height: '90%',
                transition: {
                  duration: 0.4,
                  stiffness: 100,
                  damping: 20,
                  delay: 0.1,
                  when: "beforeChildren",
                  staggerChildren: 0.1
                }
              }}
              exit={{ 
                opacity: 0, 
                x: 50, 
                height: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                  when: "afterChildren"
                }
              }}
            >
              <h2 className="text-2xl sm:text-3xl text-gray-800 mb-4 sm:mb-6 font-bold">
                {selectedRole} <span className="text-blue-600">Questions</span>
              </h2>
              <div className="flex flex-col gap-4 sm:gap-6">
                {questions[selectedRole].map((question, index) => (
                  <motion.div 
                    key={index} 
                    className="flex flex-col gap-1 sm:gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        delay: 0.2 + index * 0.15,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -10,
                      transition: {
                        duration: 0.2
                      }
                    }}
                  >
                    <label className="text-gray-700 font-medium text-sm sm:text-lg">{question}</label>
                    <input 
                      type="text" 
                      className="p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                      placeholder="Your answer"
                      value={(answers[selectedRole] && answers[selectedRole][index]) || ''}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Back button when a role is selected - for mobile */}
              <motion.button
                className="mt-6 py-2 px-5 bg-gray-500 text-white rounded-lg font-semibold transition-all duration-200 md:hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRole(null)}
              >
                Back to Roles
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Action buttons - only show when no role is selected */}
      {!selectedRole && (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-12 mb-4 sm:mb-8 relative w-full max-w-md justify-center items-center">
          <div className="relative w-full sm:w-auto">
            <motion.button
              className="w-full sm:w-auto py-2 sm:py-3 px-6 sm:px-8 bg-red-600 text-white rounded-lg font-semibold transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              onMouseEnter={() => setShowBackWarning(true)}
              onMouseLeave={() => setShowBackWarning(false)}
            >
              Back
            </motion.button>
            
            {/* To show a warning before Back Button */}
            <AnimatePresence>
              {showBackWarning && (
                <motion.div 
                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 sm:-ml-12 bg-red-100 border border-red-400 text-red-600 px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg whitespace-nowrap text-sm sm:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.1,
                      type: "spring",
                      stiffness: 500,
                      damping: 25
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 10,
                    transition: {
                      duration: 0.1,
                      ease: "easeInOut"
                    }
                  }}
                >
                  All the answers would be lost
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            className={`w-full sm:w-auto py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
              appliedRoles.length > 0 
              ? isSubmitting
                ? 'bg-gradient-to-r from-green-400 to-teal-400 text-white cursor-wait' 
                : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600' 
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            whileHover={appliedRoles.length > 0 && !isSubmitting ? { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" } : {}}
            whileTap={appliedRoles.length > 0 && !isSubmitting ? { scale: 0.95 } : {}}
            onClick={handleSubmit}
            disabled={appliedRoles.length === 0 || isSubmitting}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
});

export default RoleSelection;