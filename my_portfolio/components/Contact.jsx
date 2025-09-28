import Image from 'next/image'
import { assets } from '@/assets/assets'
import React, { useState } from 'react'

const Contact = () => {

     const [result, setResult] = useState("")


  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "28b9e09a-c3d3-485d-8608-38082accff37");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-footer-pattern bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none' >
        {/* <h4 className='text-center mb-2 text-lg font-Ovo'>Connect With Me</h4> */}
       <h2 className='text-center text-5xl font-Ovo  '>Get in Touch</h2>
       <p className='text-center max-w-3xl mx-auto mt-5 mb-12 font-Ovo'>
        I would love to hear from you! Whether you have a question, comment, or feedback, just drop me a message using the form below.</p>

        <form onSubmit={onSubmit} className='max-w-2xl mx-auto'>
          <div className='grid grid-cols-2 gap-6 mt-10 mb-8'>
            <input type='text' placeholder='Enter Your Name' required className='flex-1 p-3 outline-none border-[0.5px]
             border-gray-500 rounded-md bg-white dark:bg-violet-950/30 dark:border-white/90' name='name' /> 
            <input type='email' placeholder='Enter Your Email' required className='flex-1 p-3 outline-none border-[0.5px]
             border-gray-500 rounded-md bg-white dark:bg-violet-950/30 dark:border-white/90' name='email'/>

          </div>
          <textarea rows={6} placeholder='Enter Your Message' required className='w-full p-4 outline-none border-[0.5px]
           border-gray-500 rounded-md bg-white mb-6 dark:bg-violet-950/30 dark:border-white/90' name='message'></textarea>
          <button type='submit' className='py-2 px-6 w-max flex items-center justify-between gap-2 bg-black/80 text-white 
          rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-violet-950'>Submit now <Image src={assets.right_arrow_white} alt='rightarrow' className='w-4' /></button>
          
          <p className='mt-4'>{result}</p>
        
        </form>
    </div>
  )
}

export default Contact
