import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "motion/react";
import { sendMessage } from "@/api/contact.api";
import { Textarea } from "@/components/ui/textarea";


// Animation configs
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
  const [formData, setFormData] = useState({
    senderName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.senderName) newErrors.senderName = "Name is required.";
    if (!formData.subject) newErrors.subject = "Subject is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.message) newErrors.message = "Message is required.";

    return newErrors;
  };

  // Submit
  const handleMessage = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    setLoading(true);

    try {
      const data = await sendMessage(formData);

      toast.success(data.message);

      // Reset form
      setFormData({
        senderName: "",
        subject: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Error sending message"
      );
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
      className="w-full px-[6%] md:px-[12%] py-10 scroll-mt-20 mt-8 md:mt-16"
    >
      {/* Title */}
      <motion.h2
        variants={item}
        className="text-center font-Ove text-xl md:text-3xl"
      >
        Contact me
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-14">

        {/* LEFT SIDE */}
        <motion.div variants={container} className="p-2 md:p-8">
          <motion.h2 variants={item} className="text-xl sm:text-3xl font-Ove mb-6">
            Let’s Work Together
          </motion.h2>

          {[
            { icon: <MapPin />, title: "Address", value: "Ahmdhabad, Patna, Bihar" },
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

        {/* RIGHT FORM */}
        <motion.div variants={container} className="p-2 md:p-8">
          <motion.form
            variants={container}
            onSubmit={handleMessage}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Name */}
            <motion.div variants={item} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Name</label>
              <Input
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                placeholder="Your name"
              />
              {errors.senderName && <p className="text-red-500 text-sm">{errors.senderName}</p>}
            </motion.div>

            {/* Subject */}
            <motion.div variants={item} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Subject</label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </motion.div>

            {/* Email */}
            <motion.div variants={item} className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </motion.div>

            {/* Message */}
            <motion.div variants={item} className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg p-3"
                placeholder="Your message"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </motion.div>

            {/* Button */}
            <motion.div variants={item} className="col-span-1 sm:col-span-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#228BE6] to-cyan-300 py-6 font-semibold"
              >
                {loading ? "Sending..." : "SEND MESSAGE"}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
