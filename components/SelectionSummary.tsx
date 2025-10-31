import React, { useState, useMemo } from 'react';

interface SelectionSummaryProps {
  selectedVertical: string[];
  selectedWidescreen: string[];
  totalVisuals: number;
}

const SelectionSummary: React.FC<SelectionSummaryProps> = ({ selectedVertical, selectedWidescreen, totalVisuals }) => {
  const [copied, setCopied] = useState(false);
  const totalPacks = selectedVertical.length + selectedWidescreen.length;
  const hasSelection = totalPacks > 0;

  // Memoize the summary text to prevent re-computation on every render
  const summaryText = useMemo(() => {
    let text = '';
    if (selectedVertical.length > 0) {
      text += '--- GÓI DỌC (9:16) ---\n';
      text += [...selectedVertical].sort().join('\n');
    }
    if (selectedWidescreen.length > 0) {
      if (text.length > 0) {
        text += '\n\n'; // Add space between sections
      }
      text += '--- GÓI NGANG (16:9) ---\n';
      text += [...selectedWidescreen].sort().join('\n');
    }
    return text;
  }, [selectedVertical, selectedWidescreen]);

  // Handles copying the text to the user's clipboard
  const handleCopy = () => {
    if (!summaryText) return;
    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset button text after 2 seconds
    });
  };

  // Don't render the component if nothing is selected
  if (!hasSelection) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 p-4 z-50 shadow-2xl shadow-black/50 animate-slide-up">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side: Totals */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Lựa chọn của bạn</h3>
          <p className="text-lime-400 font-mono text-lg">
            {totalVisuals.toLocaleString()} visuals / {totalPacks} gói
          </p>
        </div>
        
        {/* Right side: Actions and Textarea */}
        <div className="flex-grow flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto max-w-2xl">
          <textarea
            readOnly
            value={summaryText}
            className="w-full sm:flex-1 h-20 bg-[#111] border border-gray-700 rounded-md p-2 text-gray-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Các gói bạn chọn sẽ hiện ở đây..."
          />
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto bg-lime-500 text-black font-bold py-3 px-6 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {copied ? 'Đã Sao Chép!' : 'Sao Chép Gửi Zalo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionSummary;