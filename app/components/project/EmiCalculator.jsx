'use client';
import { useState, useEffect } from 'react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000000); // 1 Cr default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenure, setTenure] = useState(20); // 20 years default
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const calculateEmi = () => {
      const p = loanAmount;
      const r = interestRate / 12 / 100;
      const n = tenure * 12;
      if (r === 0) return p / n;
      const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiCalc));
    };
    calculateEmi();
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-luxury-navy border border-luxury-gold/20 p-8 md:p-12 relative overflow-hidden group mb-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="text-center mb-10">
        <div className="text-luxury-label text-luxury-gold mb-2">Financial Planning</div>
        <h3 className="text-display-sm font-display font-light text-white">EMI Calculator</h3>
        <p className="text-luxury-silver text-sm font-light mt-2">Estimate your monthly investment.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm text-luxury-silver font-light uppercase tracking-widest">Loan Amount</label>
              <span className="text-xl text-white font-light">{formatCurrency(loanAmount)}</span>
            </div>
            <input 
              type="range" 
              min="1000000" 
              max="100000000" 
              step="500000" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-luxury-gold h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/30 mt-2 font-light">
              <span>₹10L</span>
              <span>₹10Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm text-luxury-silver font-light uppercase tracking-widest">Interest Rate</label>
              <span className="text-xl text-white font-light">{interestRate}% p.a.</span>
            </div>
            <input 
              type="range" 
              min="6" 
              max="15" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-luxury-gold h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm text-luxury-silver font-light uppercase tracking-widest">Loan Tenure</label>
              <span className="text-xl text-white font-light">{tenure} Years</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="30" 
              step="1" 
              value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-luxury-gold h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-black/40 border border-white/5 p-10 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-luxury-silver font-light uppercase tracking-widest mb-4">Estimated Monthly EMI</div>
          <div className="text-5xl md:text-6xl font-display font-light text-luxury-gold mb-8">
            {formatCurrency(emi)}
          </div>
          <div className="w-full space-y-4 pt-8 border-t border-white/10 text-sm font-light text-luxury-silver">
            <div className="flex justify-between">
              <span>Principal Amount:</span>
              <span className="text-white">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest:</span>
              <span className="text-white">{formatCurrency((emi * tenure * 12) - loanAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
