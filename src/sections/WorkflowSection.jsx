import {
  Cloud,
  ShieldCheck,
  ScanSearch,
  FileText,
} from "lucide-react";

const cards = [
  {
    title: "Connect\ncloud system",
    icon: <Cloud size={22} />,
  },
  {
    title: "Activate compliance\nprograms",
    icon: <ScanSearch size={22} />,
  },
  {
    title: "Automate evidence\ncollection",
    icon: <ShieldCheck size={22} />,
  },
  {
    title: "Create an audit\ndashboard",
    icon: <FileText size={22} />,
  },
];

export default function WorkflowSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#61003e] via-[#76054d] to-[#61003e] p-12">

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

          <div className="relative flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-8">

              <div className="text-center">
                <img
                  src="https://i.pravatar.cc/120?img=12"
                  className="w-20 h-20 rounded-full border-4 border-white"
                />

                <div className="mt-3 bg-sky-300 rounded-full px-5 py-2 text-sm font-semibold">
                  You
                </div>
              </div>

              <div className="relative">

                <div className="absolute inset-0 rounded-full border border-pink-400 animate-ping opacity-20"></div>

                <div className="w-40 h-40 rounded-full bg-[#7b0b53] border border-pink-400 flex items-center justify-center">

                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center">

                    <span className="text-5xl font-black text-[#7b0b53]">
                      S
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* CENTER */}
            <div className="space-y-8">

              {cards.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-full bg-[#f8e7df] w-[300px] h-16 shadow-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-[#ea8c57] text-white flex items-center justify-center">
                    {item.icon}
                  </div>

                  <p className="ml-5 whitespace-pre-line text-lg font-medium text-gray-800">
                    {item.title}
                  </p>
                </div>
              ))}

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-8">

              <div className="text-center">

                <img
                  src="https://i.pravatar.cc/120?img=15"
                  className="w-20 h-20 rounded-full border-4 border-white"
                />

                <div className="mt-3 bg-yellow-200 rounded-full px-5 py-2 font-semibold">
                  Your Auditor
                </div>

              </div>

              <div className="text-center">

                <div className="relative w-40 h-40 rounded-full border-[12px] border-green-500 flex items-center justify-center">

                  <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center">
                    <ShieldCheck
                      className="text-[#7b0b53]"
                      size={42}
                    />
                  </div>

                </div>

                <h2 className="mt-5 text-white text-4xl font-bold leading-tight">
                  Audit
                  <br />
                  Success
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}