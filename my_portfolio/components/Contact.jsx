import { useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Contact = () => {
  const formRef = useRef(null); // ref for the form
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formElement = formRef.current;
    const data = new FormData(formElement);
    data.append("access_key", "28b9e09a-c3d3-485d-8608-38082accff37");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const resultData = await response.json();

      if (resultData.success) {
        alert("Form Submitted Successfully.");
        setResult("");
        formElement.reset(); // use the ref here safely
        setFormData({ name: "", email: "", message: "" }); // reset state too
      } else {
        console.log("Error", resultData);
        alert(`Error: ${resultData.message}`);
        setResult("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
      setResult("");
    }
  };


  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 1}}
    id='contact' className='w-full px-[12%] py-8 scroll-mt-20 bg-footer-pattern bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none' >
        {/* <h4 className='text-center mb-2 text-lg font-Ovo'>Connect With Me</h4> */}
       <motion.h2
       initial={{y: -20, opacity: 0}}
       whileInView={{y: 0, opacity: 1}}
       transition={{duration: 0.5, delay: 0.3}}
       className='text-center text-5xl font-Ovo  '>Get in Touch</motion.h2>
       <motion.p
       initial={{opacity: 0}}
       whileInView={{opacity: 1}}
       transition={{duration: 0.5, delay: 0.5}}
       className='text-center max-w-3xl mx-auto mt-5 mb-12 font-Ovo'>
        I would love to hear from you! Whether you have a question, comment, or feedback, just drop me a message using the form below.</motion.p>

       <motion.form
        ref={formRef} // <-- attach ref here
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8">
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            type="text"
            placeholder="Enter Your Name"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`flex-1 p-3 outline-none border-[0.5px] rounded-md 
                        bg-white dark:bg-violet-950/30 dark:border-white/90
                        focus:border-blue-400 dark:focus:border-blue-400
                        transition-colors duration-300
                        ${formData.name ? "border-blue-400 dark:border-blue-400" : "border-gray-500"}`}
          />

          <motion.input
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            type="email"
            placeholder="Enter Your Email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`flex-1 p-3 outline-none border-[0.5px] rounded-md 
                        bg-white dark:bg-violet-950/30 dark:border-white/90
                        focus:border-blue-400 dark:focus:border-blue-400
                        transition-colors duration-300
                        ${formData.email ? "border-blue-400 dark:border-blue-400" : "border-gray-500"}`}
          />
        </div>

        <motion.textarea
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          rows={6}
          placeholder="Enter Your Message"
          required
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full p-4 outline-none border-[0.5px] rounded-md mb-6 
                      bg-white dark:bg-violet-950/30 dark:border-white/90
                      focus:border-blue-400 dark:focus:border-blue-400
                      transition-colors duration-300
                      ${formData.message ? "border-blue-400 dark:border-blue-400" : "border-gray-500"}`}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          type="submit"
          className="py-2 px-6 w-max flex items-center justify-between gap-2 bg-black/80 text-white 
                     rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-violet-950"
        >
          Submit now{" "}
          <Image src={assets.right_arrow_white} alt="rightarrow" className="w-4" />
        </motion.button>
      {/* <p className="mt-4">{result}</p> */}
    </motion.form>
    </motion.div>
  )
}

export default Contact
