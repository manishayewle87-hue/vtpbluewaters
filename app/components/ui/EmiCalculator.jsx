'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function EmiCalculator({ defaultPropertyPrice = 9000000 }) {
  const [propertyPrice, setPropertyPrice] = useState(defaultPropertyPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [genderForStampDuty, setGenderForStampDuty] = useState('male'); // male: 6% + 1% cess, female: 5% + 1% cess
  const [showEnquiry, setShowEnquiry] = useState(false);

  const calculations = useMemo(() => {
    const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
    const loanAmount = propertyPrice - downPaymentAmount;
    
    // Monthly interest rate
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTenureYears * 12;

    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    let emi = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      emi = Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      );
    }

    const totalRepayment = emi * totalMonths;
    const totalInterest = Math.max(0, totalRepayment - loanAmount);

    // Maharashtra Stamp Duty: Male 7% (6% + 1% Metro Cess), Female 6% (5% + 1% Metro Cess)
    const stampDutyRate = genderForStampDuty === 'female' ? 0.06 : 0.07;
    const stampDutyAmount = Math.round(propertyPrice * stampDutyRate);
    const registrationAmount = Math.min(30000, Math.round(propertyPrice * 0.01)); // Capped at ₹30,000 in Maharashtra
    const totalGovernmentCharges = stampDutyAmount + registrationAmount;

    // Approximate expected monthly rental yield in Pune IT Corridors (approx 6.5% gross annually)
    const estimatedMonthlyRent = Math.round((propertyPrice * 0.065) / 12);

    return {
      downPaymentAmount,
      loanAmount,
      emi,
      totalRepayment,
      totalInterest,
      stampDutyAmount,
      registrationAmount,
      totalGovernmentCharges,
      estimatedMonthlyRent,
    };
  }, [propertyPrice, downPaymentPercent, interestRate, loanTenureYears, genderForStampDuty]);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full bg-[#070D1E] border border-luxury-gold/20 rounded-2xl p-6 md:p-10 text-white shadow-2xl backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">Financial Intelligence</span>
        <h2 className="text-3xl md:text-4xl font-heading text-white mt-2">Home Loan EMI & ROI Calculator</h2>
        <p className="text-sm text-luxury-silver/80 mt-2">
          Calculate your monthly EMI, Maharashtra stamp duty & registration charges, and projected rental returns in Pune.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price Slider */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-luxury-silver">Property Value</label>
              <span className="text-lg font-bold text-luxury-gold">{formatINR(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={3500000}
              max={50000000}
              step={100000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer h-2 bg-white/20 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-white/40 mt-1">
              <span>₹35 Lakhs</span>
              <span>₹2 Crores</span>
              <span>₹5 Crores</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-luxury-silver">Down Payment ({downPaymentPercent}%)</label>
              <span className="text-base font-semibold text-white">{formatINR(calculations.downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer h-2 bg-white/20 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-white/40 mt-1">
              <span>10% (Min)</span>
              <span>20% (Recommended)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate & Tenure Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-luxury-silver">Interest Rate</label>
                <span className="text-base font-semibold text-luxury-gold">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min={7.5}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer h-2 bg-white/20 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1">
                <span>7.5%</span>
                <span>8.5% (Current SBI/HDFC)</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-luxury-silver">Loan Tenure</label>
                <span className="text-base font-semibold text-white">{loanTenureYears} Years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={loanTenureYears}
                onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer h-2 bg-white/20 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1">
                <span>5 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Maharashtra Stamp Duty Concession Selector */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-luxury-silver">Registration Concession (Maharashtra):</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGenderForStampDuty('male')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${genderForStampDuty === 'male' ? 'bg-luxury-gold text-luxury-navy font-bold shadow-md' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                Standard (7%)
              </button>
              <button
                type="button"
                onClick={() => setGenderForStampDuty('female')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${genderForStampDuty === 'female' ? 'bg-luxury-gold text-luxury-navy font-bold shadow-md' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                Women Buyer (6% Concession)
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-gradient-to-br from-[#0E172F] to-[#080E1E] border border-luxury-gold/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <span className="text-xs uppercase tracking-widest text-luxury-silver/70">Estimated Monthly Outflow</span>
            <div className="text-4xl md:text-5xl font-heading text-luxury-gold mt-2 font-bold">
              {formatINR(calculations.emi)}
              <span className="text-sm font-normal text-white/50">/month</span>
            </div>

            <div className="border-t border-white/10 mt-6 pt-5 space-y-3.5 text-sm">
              <div className="flex justify-between text-luxury-silver">
                <span>Principal Loan Amount:</span>
                <span className="text-white font-medium">{formatINR(calculations.loanAmount)}</span>
              </div>
              <div className="flex justify-between text-luxury-silver">
                <span>Total Interest Payable:</span>
                <span className="text-white font-medium">{formatINR(calculations.totalInterest)}</span>
              </div>
              <div className="flex justify-between text-luxury-silver">
                <span>Total Amount Over {loanTenureYears} Yrs:</span>
                <span className="text-white font-medium">{formatINR(calculations.totalRepayment)}</span>
              </div>
              <div className="border-t border-white/5 pt-3 flex justify-between text-luxury-silver">
                <span>Maharashtra Stamp Duty ({genderForStampDuty === 'female' ? '6%' : '7%'}):</span>
                <span className="text-luxury-gold font-medium">{formatINR(calculations.stampDutyAmount)}</span>
              </div>
              <div className="flex justify-between text-luxury-silver">
                <span>Registration Fee:</span>
                <span className="text-white font-medium">{formatINR(calculations.registrationAmount)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-green-400 bg-green-500/10 p-2.5 rounded-lg text-xs">
                <span>Estimated Monthly Rental Return:</span>
                <span className="font-bold">{formatINR(calculations.estimatedMonthlyRent)}/mo*</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#enquiry"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full block text-center py-3.5 px-6 bg-gradient-to-r from-luxury-gold to-[#D8B98A] text-[#050914] font-bold uppercase tracking-wider text-xs rounded-xl hover:brightness-110 transition-all shadow-lg hover:shadow-luxury-gold/20"
              >
                Get Pre-Approved Bank Loan & Offers
              </a>
              <p className="text-[10px] text-center text-white/40 mt-2">
                *Tie-ups with SBI, HDFC, ICICI, and Axis Bank with zero processing fee offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
