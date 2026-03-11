import { motion } from "framer-motion";

const images = [
  "/assets/project1.jpg",
  "/assets/project2.jpg",
  "/assets/project3.jpg",
];

const Sp = () => {

    
  return (
    <section className="px-[12%] py-12">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Phoenix Digital Agency
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>📅 Jul 26, 2021</span>
          <span>📱 Mobile Application</span>
        </div>
      </motion.div>

      {/* ================= GALLERY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt="Project"
            className="rounded-xl object-cover w-full h-56"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* ---------- LEFT SIDEBAR ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="font-semibold mb-2">About Client</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Name:</strong> Company Ltd <br />
              <strong>Services:</strong> UI Design & Frontend Development <br />
              <strong>Website:</strong> www.company.com <br />
              <strong>Phone:</strong> +91 99988 88888
            </p>
          </div>
        </motion.div>

        {/* ---------- RIGHT CONTENT ---------- */}
        <div className="lg:col-span-2 space-y-10">
          {/* Challenge */}
          <ContentBlock
            title="Challenge"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            accusantium dignissimos eaque, consequuntur nesciunt."
          />

          {/* Objective */}
          <ContentBlock
            title="Objective"
            text="Optio, natus! Quibusdam qui unde esse, mollitia expedita
            molestiae alias cumque."
          />

          {/* Tools */}
          <ContentBlock
            title="Tools & Technologies"
            text="HTML, CSS, JavaScript, React JS, TailwindCSS, Adobe XD"
          />

          {/* Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-3">Share This</h3>
            <div className="flex gap-4">
              {["Facebook", "Twitter", "LinkedIn"].map((item) => (
                <button
                  key={item}
                  className="text-sm border px-4 py-1 rounded-full hover:bg-gray-100 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================= REUSABLE BLOCK ================= */
const ContentBlock = ({ title, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};

export default Sp;