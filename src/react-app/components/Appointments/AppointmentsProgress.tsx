import React from 'react';
type Props = { step: number };
const AppointmentsProgress: React.FC<Props> = ({ step }) => (
  <div className="flex items-center gap-4 mb-8">
    {[0,1,2].map((s) => (
      <React.Fragment key={s}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step>=s?"bg-brand-primary text-white":"bg-white/5 text-white/40"}`}>{s+1}</div>
        {s<2 && <div className={`h-px flex-1 transition-all ${step>=s+1?"bg-brand-primary":"bg-white/10"}`} />}
      </React.Fragment>
    ))}
  </div>
);
export default AppointmentsProgress;
