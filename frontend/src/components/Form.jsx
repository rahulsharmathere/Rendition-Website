import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import videoBg from '../assets/LT_Video5.mp4';
import './CSS/Form.css';
import RoleSelection from './RoleSelection';
import { questions, backend_URL, roles } from '../constants';
import { withLoadTracking } from './withLoadTracking'

const Form = withLoadTracking(({onLoad}) => {
  const videoRef = useRef();
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submission
  const [showSuccessDialog, setShowSuccessDialog] = useState(false); // Success dialog state
  const [details, setDetails] = useState({
    name: '',
    rollNo: '',
    email: '',
    mobNo: '',
    selectedRoles: [],
    questions : questions,
    answers: {}
  });
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if(details.selectedRoles.length > 0)
        handleSubmit();
  }, [details])

  const handleChange = (e) => {   
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: ''}));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@lnmiit\.ac\.in$/;
    return regex.test(email);
  };

  // Check internet connection
  const checkInternetConnection = () => {
    return navigator.onLine;
  };

  const handleNext = () => {
    const newErrors = {};
    ['name', 'rollNo', 'email', 'mobNo'].forEach((field) => {
      if (!details[field]) newErrors[field] = 'error';
    });

    if (details.email && !validateEmail(details.email)) {         //Check if Email is in correct format
      newErrors.email = 'error';      
      alert('Email must be in the format xyz@lnmiit.ac.in');
    }

    if (details.mobNo) {                                          //Check if Mobile number is exact 10 digits
      const regex = /^\d{10}$/;   
      if(!regex.test(details.mobNo)) {
        newErrors.mobNo = 'error';
        alert('Mobile number must be exactly 10 digits.');
      }
    }

    if (Object.keys(newErrors).length > 0) {                        //If any error is encountered
      setErrors(newErrors);
      const nextButton = document.getElementById('nextButton');
      nextButton.classList.add('shake');
      setTimeout(() => nextButton.classList.remove('shake'), 500);
      return;
    }

    setIsTransitioning(true);
    videoRef.current.play();
    videoRef.current.onended = () => {
      setStep(2);
      setIsTransitioning(false);
    };
  };

  const handleBack = () => {
    videoRef.current.pause();
    setIsTransitioning(true);
    
    // Start from the end
    videoRef.current.currentTime = videoRef.current.duration;
    
    // Use a timer to step backwards through the video
    const reverseInterval = setInterval(() => {
      // If we've reached the beginning or close to it
      if (videoRef.current.currentTime <= 0.03) {
        clearInterval(reverseInterval);
        videoRef.current.currentTime = 0;
        setStep(1);
        setIsTransitioning(false);
      } else {
        // Move backward by small increments (adjust the 0.1 for speed)
        videoRef.current.currentTime -= 0.03;
      }
    }, 16); // ~60fps for smooth playback
  };

  // Function to submit the form
  const submitForm = async () => {
    console.log("Initial Data ", details)
    // Base URL of your Google Form (replace with your actual form URL)
    const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdbu5bGRRBq-szOgRf6f9jySSOqkefpq4t-uBMSwHzd4qi3yA/formResponse";
    
    // Map your field names to Google Form entry IDs
    const fieldMappings = {
      email: "entry.539438373",
      name: "entry.1073716416",
      rollNo: "entry.196170093",
      mobNo: "entry.1642481363",
      selectedRoles: "entry.1514310048",
      // Question entries for each role
      Actor: {
        0: "entry.874393444", // First actor question
        1: "entry.1542473270"  // Second actor question
      },
      Scripter: {
        0: "entry.271143006",
        1: "entry.859104129",
        2: "entry.958153149"
      },
      Graphic_Designer: {
        0: "entry.269282876",
        1: "entry.1648597123"
      },
      Video_Editor: {
        0: "entry.409638971",
        1: "entry.405225410"
      },
      contribution : "entry.1930894914"
    };

    roles.forEach(role => {
      if (!details.answers[role]) {
        details.answers[role] = {}; // Initialize missing role
      }
      if (questions[role]) { // Ensure questions[role] exists before accessing length
        for (let i = 0; i < questions[role].length; i++) {
          if (details.answers[role][i] === undefined) { // Only replace undefined values
            details.answers[role][i] = "Nil";
          }
        }
      }
    });

    console.log("Updated Details ", details)

    const pageData = new FormData();
    pageData.append(fieldMappings.email, details.email); // Email
    pageData.append(fieldMappings.name, details.name); // Name
    pageData.append(fieldMappings.rollNo, details.rollNo); // Roll Number
    pageData.append(fieldMappings.mobNo, details.mobNo); // Mobile Number
    console.log(details.selectedRoles,fieldMappings.selectedRoles)
    details.selectedRoles.forEach((role) => {
      console.log(role, fieldMappings.selectedRoles)
      pageData.append(fieldMappings.selectedRoles, role);
    });
    
    
    roles.forEach((role) => {
      // Iterate over roles
      for (const index in fieldMappings[role]) {  // Iterate over question indices
        pageData.append(fieldMappings[role][index], details.answers[role][index] || 'Nil');
      }
    })     
    pageData.append(fieldMappings.contribution, "nil");
    
    await fetch(baseUrl, { method: "POST", body: pageData, mode: "no-cors" });
  }  

  const handleSubmit = async () => {
    console.log("Submit Button Clicked")
    // Check for internet connection
    if (!checkInternetConnection()) {
      alert("Please connect to the internet before submitting.");
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    try {
      await submitForm();
      const response = await fetch(`${backend_URL}/form-submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await response.json();
      if (data.success) {
        // Show success dialog
        setShowSuccessDialog(true);
        setDetails({name: '',
          rollNo: '',
          email: '',
          mobNo: '',
          selectedRoles: [],
          questions : questions,
          answers: {}})
      } else {
        alert("Error sending email.");
      }

    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission. Please try again.");
    } finally {
      // Reset loading state
      setIsSubmitting(false);
    }
  };

  // Handle success dialog close and transition back
  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    handleBack();
  };

  return (
    <div className='relative w-screen h-screen chalkFont flex justify-center flex-col gap-4' id="Form">
      <video ref={videoRef} src={videoBg} className='absolute w-full h-full object-cover z-0' loop={false}></video>
      
      <div id='questions' className='relative flex flex-col w-full h-full justify-center items-center gap-5'>
        {/* Basic Details Input  */}
        <AnimatePresence mode='wait'>
          {!isTransitioning && step === 1 && (              
            <motion.div
              key='step1'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="w-full px-4 sm:px-6 md:px-8"
            >
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-center font-thick sm:mt-8 mb-6 sm:mb-8'>Want to Join Us?</h1>
              <div className='relative flex flex-col w-full justify-center items-center gap-5'>
                <div className='relative flex justify-center flex-col sm:flex-row sm:flex-wrap gap-6 sm:gap-8 md:gap-16 w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2'>
                  {/* Name Tag */}
                  <section className='w-full sm:w-[calc(50%-1rem)] md:w-2/5 relative flex gap-2 items-end'>
                    <svg 
                      fill="#ffffff" 
                      width="40px" 
                      height="40px" 
                      viewBox="0 0 32 32" 
                      xmlns="http://www.w3.org/2000/svg" 
                      stroke="#ffffff"
                      className="flex-shrink-0"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g>
                    </svg>
                    <input type='text' name='name' placeholder='Name' onChange={handleChange} value={details.name} className={`input-field ${errors.name} relative text-white text-xl sm:text-2xl w-full h-auto bg-transparent border-white border-b-2 focus:outline-none`}/>
                  </section>
                  
                  {/* Roll Number Tag */}
                  <section className='w-full sm:w-[calc(50%-1rem)] md:w-2/5 relative flex gap-2 items-end'>
                    <svg 
                      fill="#ffffff"
                      height="40px" 
                      width="40px"
                      version="1.1" 
                      id="_x32_" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 512 512"
                      className="flex-shrink-0"
                    >
                      <g>
                        <path fill="#ffffff" d="M317.796,61.373c0-24.336-19.802-44.138-44.138-44.138h-35.311c-24.337,0-44.138,19.802-44.138,44.138v79.449h123.587V61.373z M282.485,79.029c0,4.88-3.948,8.828-8.828,8.828h-35.311c-4.88,0-8.828-3.948-8.828-8.828V61.373c0-4.879,3.948-8.828,8.828-8.828h35.311c4.879,0,8.828,3.949,8.828,8.828V79.029z"></path>
                        <path fill="#ffffff" d="M491.965,124.003H335.451v16.776c0,9.801-7.94,17.655-17.655,17.655H194.209c-9.707,0-17.656-7.854-17.656-17.655v-16.776H20.039C8.918,124.003,0,133.012,0,144.047v330.77c0,11.035,8.918,19.949,20.039,19.949h471.926c11.034,0,20.035-8.914,20.035-19.949v-330.77C512,133.012,502.999,124.003,491.965,124.003z M117.88,271.979c-1.238-8.431-2.94-25.095,1.465-33.458c0,0-3.008-5.465-3.008-12.681c12.668,1.802,53.117-24.155,65.19-3.017c17.496-1.818,27.962,22.871,20.018,49.156c0,0,9.81-0.457,5.888,13.284c-3.672,12.897-6.625,15.854-11.788,17.69c-2.216,12.534-5.936,23.604-10.837,29.052c0,6.534,0,11.301,0,15.121c0,0.379,0.073,0.793,0.181,1.207l-17.164,8.25v12.129h-16.155v-12.129l-17.173-8.268c0.108-0.413,0.181-0.81,0.181-1.189c0-3.82,0-8.586,0-15.121c-4.901-5.448-8.604-16.518-10.827-29.052c-5.173-1.837-8.117-4.793-11.798-17.69C108.281,272.073,117.152,271.979,117.88,271.979z M159.751,431.971c-57.957,0-97.794-7.509-98.414-14.759c-2.504-30.19,36.595-46.311,52.522-51.906c1.561-0.56,3.371-1.422,5.25-2.474l30.397,42.044l2.164-27.544h16.155l2.164,27.544l30.388-42.044c1.828,0.999,3.612,1.853,5.259,2.474c15.81,5.906,55.026,21.69,52.513,51.906C257.536,424.463,217.7,431.971,159.751,431.971z M372.317,411.851h-52.962v-17.655h52.962V411.851z M425.283,335.341H319.356v-17.655h105.928V335.341z M425.283,258.832H319.356v-17.656h105.928V258.832z"></path>
                      </g>
                    </svg>
                    <input type='text' name='rollNo' placeholder='Roll Number' onChange={handleChange} value={details.rollNo} className={`input-field ${errors.rollNo} relative text-white text-xl sm:text-2xl w-full h-auto bg-transparent border-white border-b-2 focus:outline-none`}/>
                  </section>
                  
                  {/* Email-Id Tag */}
                  <section className='w-full sm:w-[calc(50%-1rem)] md:w-2/5 relative flex gap-2 items-end'>
                    <svg 
                      fill="#ffffff" 
                      width="40px" 
                      height="40px" 
                      viewBox="0 0 1920 1920" 
                      xmlns="http://www.w3.org/2000/svg" 
                      stroke="#ffffff"
                      className="flex-shrink-0"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z" fillRule="evenodd"></path> </g>
                    </svg>
                    <input type='email' name='email' placeholder='Email' onChange={handleChange} value={details.email} className={`input-field ${errors.email} relative text-white text-xl sm:text-2xl w-full h-auto bg-transparent border-white border-b-2 focus:outline-none`}/>
                  </section>
                  
                  {/* Mobile Number Tag */}
                  <section className='w-full sm:w-[calc(50%-1rem)] md:w-2/5 relative flex gap-2 items-end'>
                    <svg 
                      fill="#ffffff" 
                      height="40px" 
                      width="40px" 
                      className='flex-shrink-0'
                      version="1.1" 
                      id="Layer_1" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 512 512" 
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M349.867,162.133h68.267c4.713,0,8.533-3.821,8.533-8.533c0-4.713-3.82-8.533-8.533-8.533h-68.267 c-4.713,0-8.533,3.821-8.533,8.533C341.333,158.313,345.154,162.133,349.867,162.133z"></path> <path d="M418.133,213.333h-68.267c-4.713,0-8.533,3.82-8.533,8.533s3.821,8.533,8.533,8.533h68.267 c4.713,0,8.533-3.82,8.533-8.533S422.846,213.333,418.133,213.333z"></path> <path d="M443.733,179.2H324.267c-4.713,0-8.533,3.82-8.533,8.533s3.82,8.533,8.533,8.533h119.467c4.713,0,8.533-3.82,8.533-8.533 S448.446,179.2,443.733,179.2z"></path> <path d="M93.867,264.533h68.267c4.713,0,8.533-3.82,8.533-8.533s-3.821-8.533-8.533-8.533H93.867 c-4.713,0-8.533,3.82-8.533,8.533S89.154,264.533,93.867,264.533z"></path> <path d="M162.133,332.8c4.713,0,8.533-3.82,8.533-8.533s-3.821-8.533-8.533-8.533H93.867c-4.713,0-8.533,3.82-8.533,8.533 s3.82,8.533,8.533,8.533H162.133z"></path> <path d="M196.267,290.133c0-4.713-3.82-8.533-8.533-8.533H68.267c-4.713,0-8.533,3.82-8.533,8.533s3.82,8.533,8.533,8.533 h119.467C192.446,298.667,196.267,294.846,196.267,290.133z"></path> <path d="M247.467,42.667h42.667c4.713,0,8.533-3.82,8.533-8.533s-3.821-8.533-8.533-8.533h-42.667 c-4.713,0-8.533,3.821-8.533,8.533S242.754,42.667,247.467,42.667z"></path> <path d="M213.333,42.667h8.533c4.713,0,8.533-3.82,8.533-8.533s-3.821-8.533-8.533-8.533h-8.533 c-4.713,0-8.533,3.821-8.533,8.533S208.62,42.667,213.333,42.667z"></path> <path d="M494.933,191.147c0-48.884-40.879-88.955-93.867-96.133V59.733V33.809C401.067,15.136,385.931,0,367.258,0H144.742 c-18.673,0-33.809,15.136-33.809,33.809v25.924V76.8c-4.713,0-8.533,3.82-8.533,8.533v8.533c0,4.713,3.821,8.533,8.533,8.533 v8.533c-4.713,0-8.533,3.82-8.533,8.533V128c0,4.713,3.821,8.533,8.533,8.533v8.533c-4.713,0-8.533,3.821-8.533,8.533v8.533 c0,4.713,3.821,8.533,8.533,8.533v26.747c-52.988,7.178-93.867,47.249-93.867,96.133c0,49.104,41.105,90.359,93.867,97.791V435.2 v42.991c0,18.673,15.136,33.809,33.809,33.809h222.515c18.673,0,33.809-15.136,33.809-33.809V435.2V288.938 C453.829,281.505,494.933,240.251,494.933,191.147z M144.742,17.067h222.515c9.248,0,16.742,7.495,16.742,16.742V51.2H128V33.809 C128,24.561,135.495,17.067,144.742,17.067z M34.133,293.547c0-41.463,37.087-75.994,84.941-79.85 c0.333,0.015,0.669,0.015,1.009-0.01c2.661-0.193,4.653-0.301,6.5-0.338c0.472-0.006,0.942-0.015,1.416-0.015 c52.089,0,93.867,36.206,93.867,80.213c0,15.323-5.155,29.284-15.319,42.612c-1.288,1.689-1.9,3.798-1.716,5.914 c1.303,14.991,3.943,28.429,8.412,39.205c-6.96-1.395-13.823-3.153-20.281-5.305c-6.845-2.281-12.915-4.91-17.995-7.875 c-2.289-1.336-5.069-1.533-7.523-0.533c-12.907,5.261-25.692,7.902-39.446,7.902c-0.465,0-0.928-0.01-1.392-0.016 c-1.837-0.038-3.82-0.15-6.499-0.353c-0.345-0.026-0.686-0.026-1.023-0.012C71.555,371.072,34.133,335.354,34.133,293.547z M128,478.191v-34.458h105.434c-7.09,6.254-11.567,15.401-11.567,25.6s4.477,19.346,11.567,25.6h-88.692 C135.495,494.933,128,487.439,128,478.191z M256,486.4c-9.427,0-17.067-7.64-17.067-17.067s7.64-17.067,17.067-17.067 c9.427,0,17.067,7.64,17.067,17.067S265.427,486.4,256,486.4z M367.258,494.933h-88.692c7.09-6.254,11.567-15.401,11.567-25.6 s-4.477-19.346-11.567-25.6H384v34.458C384,487.439,376.505,494.933,367.258,494.933z M384,426.667H128v-34.133 c14.648,0,28.409-2.583,42.047-7.666c5.282,2.754,11.152,5.174,17.52,7.296c9.237,3.079,19.054,5.39,28.86,7.058 c3.425,0.583,6.61,1.045,9.478,1.399c1.747,0.216,3.02,0.349,3.742,0.413c8.012,0.709,12.466-9.046,6.683-14.636 c-7.348-7.102-12.17-23.188-14.193-42.623c11.025-15.418,16.795-32.063,16.795-50.228c0-54.02-49.918-97.28-110.933-97.28v-128 h256v25.6c-61.015,0-110.933,43.26-110.933,97.28c0,18.165,5.77,34.81,16.795,50.228c-2.023,19.435-6.845,35.521-14.193,42.623 c-5.783,5.59-1.329,15.345,6.683,14.636c0.722-0.064,1.995-0.197,3.742-0.413c2.868-0.354,6.053-0.816,9.478-1.399 c9.806-1.668,19.623-3.979,28.86-7.058c6.368-2.122,12.239-4.542,17.52-7.296c13.638,5.083,27.399,7.666,42.047,7.666V426.667z M392.914,272.686c-0.337-0.015-0.678-0.014-1.023,0.012c-2.679,0.202-4.661,0.315-6.499,0.353 c-0.464,0.006-0.927,0.016-1.392,0.016c-13.753,0-26.538-2.641-39.446-7.902c-2.454-1-5.234-0.804-7.523,0.533 c-5.08,2.965-11.15,5.594-17.995,7.875c-6.458,2.152-13.321,3.91-20.281,5.305c4.469-10.776,7.109-24.214,8.412-39.205 c0.184-2.116-0.428-4.225-1.716-5.914c-10.164-13.328-15.319-27.288-15.319-42.612c0-44.008,41.777-80.213,93.867-80.213 c0.473,0,0.944,0.009,1.416,0.015c1.847,0.037,3.839,0.145,6.5,0.338c0.341,0.025,0.677,0.025,1.009,0.01 c47.854,3.856,84.941,38.387,84.941,79.85C477.867,232.954,440.445,268.672,392.914,272.686z"></path> </g> </g> </g> </g>
                    </svg>
                    <input type='number' name='mobNo' placeholder='Mobile Number' onChange={handleChange} value={details.mobNo} className={`input-field no-spinner ${errors.mobNo} relative text-white text-xl sm:text-2xl w-full h-auto bg-transparent border-white border-b-2 focus:outline-none`}/>
                  </section>
                </div>
                <button 
                  id='nextButton'
                  className='btn mt-6 p-3 sm:p-4 sm:mb-6 bg-transparent border-2 text-white text-xl sm:text-2xl relative w-32 sm:w-[150px] rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-500' 
                  onClick={handleNext}
                >
                  Let's Gooo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interests Input */}
        {!isTransitioning && step === 2 && (
          <RoleSelection 
            onBack={()=>{handleBack()}} 
            onSubmit={(formData) => {
              setDetails(prev => ({
                ...prev,
                selectedRoles: formData.selectedRoles,
                answers: formData.answers
              }));
            }}
            isSubmitting={isSubmitting} // Pass loading state to disable submit button
          />
        )}

        {/* Success Dialog */}
        {showSuccessDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
              <svg 
                className="w-16 h-16 text-green-500 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Submission Successful!</h2>
              <p className="text-gray-600 mb-6">Your response has been recorded successfully.</p>
              <button
                onClick={handleSuccessDialogClose}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Form;