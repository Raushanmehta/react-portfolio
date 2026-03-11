import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "motion/react";


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!senderName) newErrors.senderName = "Name is required.";
    if (!subject) newErrors.subject = "Subject is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email address is invalid.";
    if (!message) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { senderName, subject, email, message },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setSenderName("");
      setSubject("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-full px-[12%] py-10 scroll-mt-20 mt-8 md:mt-16"
    >
      {/* Title */}
      <motion.h2
        variants={item}
        className="text-center font-Ovo text-xl md:text-3xl"
      >
        Contact me
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-14">
        {/* Left Info */}
        <motion.div variants={container} className="rounded-lg p-2 md:p-8">
          <motion.h2
            variants={item}
            className="text-xl sm:text-3xl font-Ovo mb-6"
          >
            Let’s Work Together
          </motion.h2>

          {[ 
            { icon: <MapPin />, title: "Address", value: "Mehndiganj Road, Patna, Bihar 800008" },
            { icon: <Phone />, title: "Phone", value: "+91 9304137746" },
            { icon: <Mail />, title: "Email", value: "raushanmehta2184@gmail.com" },
          ].map((info, i) => (
            <motion.div key={i} variants={item} className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-[#228BE6] to-cyan-300 p-2 rounded-full">
                {info.icon}
              </div>
              <div className="ml-4">
                <h4 className="font-Ove">{info.title}</h4>
                <p className="text-sm md:text-lg">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Form */}
        <motion.div variants={container} className="rounded-lg p-2 md:p-8">
          <motion.form
            variants={container}
            onSubmit={handleMessage}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                label: "Name",
                value: senderName,
                set: setSenderName,
                error: errors.senderName,
                span: 1,
              },
              {
                label: "Subject",
                value: subject,
                set: setSubject,
                error: errors.subject,
                span: 1,
              },
            ].map((field, i) => (
              <motion.div key={i} variants={item}>
                <label className="font-Ove">{field.label}</label>
                <Input
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className="mt-2"
                  placeholder={`Your ${field.label.toLowerCase()}`}
                />
                {field.error && (
                  <p className="text-red-500 text-sm mt-1">{field.error}</p>
                )}
              </motion.div>
            ))}

            <motion.div variants={item} className="col-span-2">
              <label className="font-Ove">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="mt-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={item} className="col-span-2">
              <label className="font-Ove">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                className="w-full border rounded-lg mt-2 p-3 bg-transparent"
                placeholder="Your message"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </motion.div>

            <motion.div variants={item} className="col-span-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                <Button className="w-full bg-gradient-to-r from-[#228BE6] to-cyan-300">
                  {loading ? "Sending..." : "SEND MESSAGE"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;