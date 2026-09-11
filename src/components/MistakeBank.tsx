import React from 'react';
import type { MistakeItem } from '../types';

interface MistakeBankProps {
  mistakes: MistakeItem[];
  onResolve: (id: string) => void;
  onClearAll: () => void;
}

export const MistakeBank: React.FC<MistakeBankProps> = ({ mistakes, onResolve, onClearAll }) => {
  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[11px] font-mono-code text-[#6b675e] uppercase block">
            Buku Catatan Kesalahan Pribadi
          </span>
          <h1 className="text-xl font-bold text-[#21201c]">
            Bank Evaluasi & Evaluasi Ulang
          </h1>
          <p className="text-xs text-[#6b675e]">
            Daftar otomatis materi kuis atau kata yang dinilai sulit/salah untuk diulang kembali.
          </p>
        </div>

        {mistakes.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 border border-[#e8e6e1] rounded text-xs text-[#6b675e] hover:text-[#21201c] hover:bg-[#f4f2ee]"
          >
            Bersihkan Catatan
          </button>
        )}
      </div>

      {/* List Mistakes */}
      {mistakes.length === 0 ? (
        <div className="clean-surface p-8 text-center space-y-2">
          <h3 className="text-sm font-semibold text-[#21201c]">Belum ada catatan kesalahan</h3>
          <p className="text-xs text-[#6b675e]">
            Setiap soal atau kuis vocabulary yang dijawab salah atau dinilai "Again" akan otomatis tercatat di sini untuk latihan terarah.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {mistakes.map((item) => (
            <div
              key={item.id}
              className={`clean-surface p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                item.resolved ? 'opacity-50' : ''
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code uppercase text-[10px] bg-[#f0ede6] px-1.5 py-0.5 rounded text-[#21201c]">
                    {item.type}
                  </span>
                  <span className="font-semibold text-[#21201c]">{item.sourceTitle}</span>
                  <span className="text-[10px] text-[#6b675e]">({item.dateAdded})</span>
                </div>
                <div className="text-[#6b675e]">
                  Jawaban Benar: <strong className="text-[#21201c]">{item.correctAnswer}</strong>
                </div>
                <p className="text-[11px] text-[#6b675e] italic">{item.noteId}</p>
              </div>

              <div className="shrink-0">
                {!item.resolved ? (
                  <button
                    onClick={() => onResolve(item.id)}
                    className="px-3 py-1 bg-[#21201c] text-[#faf9f7] rounded text-xs font-medium"
                  >
                    Tandai Sudah Dikuasai
                  </button>
                ) : (
                  <span className="text-xs font-mono-code text-[#2f7a42]">Terselesaikan</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
