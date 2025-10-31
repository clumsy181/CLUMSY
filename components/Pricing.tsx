import React from 'react';

// Reusable component for a single pricing card
const PricingCard: React.FC<{ title: string; content: string; price: string }> = ({ title, content, price }) => (
  <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 flex flex-col text-center transition-all duration-300 hover:border-lime-400 hover:shadow-2xl hover:shadow-lime-500/10">
    <h3 className="text-2xl font-bold text-lime-400">{title}</h3>
    <p className="mt-4 text-gray-300">{content}</p>
    <div className="mt-6 text-4xl font-extrabold text-white">{price}</div>
  </div>
);

// Reusable component for an instruction step with a refined layout
const InstructionStep: React.FC<{ step: number; title: string; content: string }> = ({ step, title, content }) => (
    <div className="flex items-start space-x-4 rounded-xl bg-[#1a1a1a] p-6 border border-gray-800 h-full">
        <div className="flex-shrink-0 w-10 h-10 bg-lime-400/10 text-lime-400 rounded-full flex items-center justify-center font-bold text-lg border-2 border-lime-400/50 mt-1">
            {step}
        </div>
        <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
            <p className="text-gray-400 leading-relaxed">{content}</p>
        </div>
    </div>
);


const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="w-full max-w-6xl mx-auto">
      {/* Pricing Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <PricingCard title="GÓI 1000" content="1000 Video Visuals" price="249.000 VNĐ" />
        <PricingCard title="GÓI 2000" content="2000 Video Visuals" price="349.000 VNĐ" />
        <PricingCard title="GÓI 5000" content="5000 Video Visuals" price="499.000 VNĐ" />
      </div>

      {/* How to Buy Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-white">Cách Thức Mua Hàng</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <InstructionStep
            step={1}
            title="Chọn Gói & Lựa Visuals"
            content="Duyệt xem danh sách 2 cột bên dưới. Bạn có thể chọn tự do từ cả cột Dọc (9:16) và Ngang (16:9) để gộp thành Gói 1000, 2000 hoặc 5000 video. (Số ở đầu tên là số lượng video trong chủ đề đó)."
        />
        <InstructionStep
            step={2}
            title="Liên Hệ Zalo"
            content="Sau khi đã xác nhận các gói/cảnh cần mua, hãy liên hệ qua Zalo 0366131201."
        />
        <InstructionStep
            step={3}
            title="Nhận Link Drive"
            content="Tất cả visual sẽ được gửi qua link Google Drive ngay sau khi xác nhận."
        />
      </div>
      
      {/* Custom Order Note */}
      <div className="text-center mt-12">
        <p className="text-gray-400 italic text-lg">
          * Ghi chú: Nếu bạn cần visual theo chủ đề riêng, đừng ngần ngại liên hệ Zalo để đặt hàng theo yêu cầu.
        </p>
      </div>
    </section>
  );
};

export default Pricing;