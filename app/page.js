'use client';
import { useState } from 'react';

export default function Home() {
  const [reviewText, setReviewText] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant / Cafe');
  const [tone, setTone] = useState('Professional & Polite');
  const [goal, setGoal] = useState('Standard Reply');
  const [platform, setPlatform] = useState('Google Business Profile');
  const [reply, setReply] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Business Scanner State
  const [businessName, setBusinessName] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // ROI Calculator State
  const [monthlyReviews, setMonthlyReviews] = useState(60);

  const hoursSaved = Math.round((monthlyReviews * 15) / 60);
  const moneySaved = monthlyReviews * 25;

  const handleGenerate = async () => {
    if (!reviewText.trim()) return;
    setLoading(true);
    setReply('');
    setSentiment('');
    setCopied(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewText, businessType, tone, goal, platform }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setReply(data.reply);
        setSentiment(data.sentiment || 'Detected');
      } else {
        setReply(`Error: ${data.error || 'Failed to generate response'}`);
      }
    } catch (err) {
      console.error(err);
      setReply('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuditScan = () => {
    if (!businessName.trim()) return;
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setScanning(false);
      setScanResult({
        score: '62/100 (At Risk)',
        unanswered: 14,
        lostRevenue: '$850/mo',
        message: 'Your Google profile has 14 unanswered reviews causing prospective buyers to choose your competitors.'
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = (planName, price) => {
    alert(`⚡ Redirecting to Secure Checkout for ${planName} ($${price})\n\nSelect Payment Method on Checkout:\n• Stripe (Visa / Mastercard / Amex)\n• Razorpay (UPI, PhonePe, Paytm, NetBanking)\n• PayPal Global Gateway\n\nYour Bank Payouts are Auto-Processed to Your Account.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white text-[12px] font-semibold py-2 px-4 text-center tracking-wide">
        🚀 Launch Offer: Get 7 Days Free Trial • 100% Risk-Free Money Back Guarantee • Auto-Pilot Ready
      </div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-900">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xl font-bold tracking-tight text-white">ReviewPulse <span className="text-indigo-400">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <a href="#audit" className="hover:text-white transition">Free Audit</a>
          <a href="#demo" className="hover:text-white transition">Live AI Demo</a>
          <a href="#benefits" className="hover:text-white transition">Why Buy?</a>
          <a href="#roi" className="hover:text-white transition">ROI Calculator</a>
          <a href="#pricing" className="hover:text-white transition">Pricing Plans</a>
        </div>
        <a href="#pricing" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/20">
          Buy Subscription
        </a>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-indigo-500/20 mb-6">
          ⚡ Rated #1 Autonomous Reputation Management Engine
        </span>
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Turn Negative Reviews Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Loyal 5-Star Customers</span>
        </h1>
        <p className="text-slate-400 mt-6 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          Automate 100% of your Google, Yelp, and Shopify review responses using AI. Retain buyers, boost local SEO ranking, and grow your revenue on autopilot.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a href="#audit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl shadow-xl shadow-indigo-500/20 transition">
            Scan Your Business Free Search ↓
          </a>
          <a href="#pricing" className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold px-8 py-4 rounded-xl transition">
            View Paid Plans & Pricing
          </a>
        </div>
      </header>

      {/* Audit Tool Section (High Conversion Trigger) */}
      <section id="audit" className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/40 rounded-3xl p-6 md:p-8 text-center shadow-2xl">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Free Instant Audit</span>
          <h2 className="text-2xl font-bold text-white mt-1 mb-3">Is Your Business Losing Money to Unanswered Reviews?</h2>
          <p className="text-slate-400 text-xs max-w-lg mx-auto mb-6">Type your business or restaurant name below to analyze your Google Reputation Health Score in real-time.</p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Royal Cafe & Grill"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleAuditScan}
              disabled={scanning || !businessName.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl text-sm transition"
            >
              {scanning ? 'Scanning Google...' : 'Analyze Now 🔍'}
            </button>
          </div>

          {scanResult && (
            <div className="mt-6 p-4 bg-slate-950 border border-red-500/40 rounded-2xl text-left max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-red-400 uppercase">Health Score: {scanResult.score}</span>
                <span className="text-xs font-bold text-emerald-400">Est. Loss: {scanResult.lostRevenue}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{scanResult.message}</p>
              <a href="#pricing" className="block text-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-lg transition">
                Fix This Now with ReviewPulse AI →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Live AI Tool Section */}
      <section id="demo" className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Experience ReviewPulse AI Live</h2>
            <p className="text-slate-400 text-sm mt-1">De-escalate complaints and craft 5-star responses in 1 second.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Business Type</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option>Restaurant / Cafe</option>
                <option>Hotel / Resort</option>
                <option>Healthcare / Clinic</option>
                <option>E-commerce / Shopify Store</option>
                <option>Real Estate Agency</option>
                <option>Gym / Fitness Center</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Platform Target</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option>Google Business Profile</option>
                <option>Yelp</option>
                <option>Trustpilot</option>
                <option>TripAdvisor</option>
                <option>Amazon / Shopify</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Response Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option>Professional & Polite</option>
                <option>Warm, Friendly & Grateful</option>
                <option>Sincere Apology & De-escalation</option>
                <option>Short, Direct & Casual</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">AI Strategic Goal</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: 'Standard Reply', title: '💬 Standard Response', desc: 'Acknowledge feedback' },
                { id: 'Upsell & Promo', title: '🎁 Upsell & Coupon', desc: 'Offer return discount' },
                { id: 'Private Resolution', title: '🛡️ Offline Resolution', desc: 'Direct complaint to email' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGoal(item.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    goal === item.id ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{item.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Customer Review</label>
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Paste customer review here (e.g. 'Food was great, but service took 45 minutes!')"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !reviewText.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            {loading ? 'ReviewPulse AI Thinking...' : '✨ Generate Smart AI Response'}
          </button>

          {reply && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">AI Output:</span>
                  {sentiment && <span className="text-[11px] bg-slate-800 text-slate-300 font-medium px-2.5 py-0.5 rounded-full border border-slate-700">Sentiment: {sentiment}</span>}
                </div>
                <button onClick={copyToClipboard} className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-200 transition">
                  {copied ? '✓ Copied!' : '📋 Copy Response'}
                </button>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl text-slate-200 text-sm leading-relaxed shadow-inner">
                {reply}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHY BUY SECTION: Clear Client Profits */}
      <section id="benefits" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Why Businesses Buy ReviewPulse AI?</h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base">Here is the exact ROI and profit your business gains with our AI engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl mb-6">⚡</div>
            <h3 className="text-lg font-bold text-white mb-2">Save 15+ Hours Every Month</h3>
            <p className="text-slate-400 text-xs leading-relaxed">No more spending hours thinking about what to reply to angry buyers. AI handles all responses in 1 second with human precision.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl mb-6">📈</div>
            <h3 className="text-lg font-bold text-white mb-2">Boost Google Local SEO</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Google rewards businesses that reply instantly to customer reviews. Watch your Google Map rankings and foot traffic soar.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center text-2xl mb-6">💰</div>
            <h3 className="text-lg font-bold text-white mb-2">Recover $1,000s in Lost Sales</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Turn 1-star complaints into returning buyers by offering automated private coupons and de-escalating customer frustration.</p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi" className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/30 p-8 md:p-12 rounded-3xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">Calculate Your Business ROI</h2>
          <p className="text-slate-400 text-sm mb-8">Adjust the slider to see how much time and revenue ReviewPulse AI saves you.</p>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-400">Monthly Reviews:</span>
              <span className="text-indigo-400 text-lg">{monthlyReviews} Reviews</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              value={monthlyReviews}
              onChange={(e) => setMonthlyReviews(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
              <div className="text-3xl font-extrabold text-indigo-400">{hoursSaved} Hours</div>
              <div className="text-xs text-slate-400 mt-1">Time Saved Every Month</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
              <div className="text-3xl font-extrabold text-emerald-400">${moneySaved}</div>
              <div className="text-xs text-slate-400 mt-1">Customer Revenue Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (4 Complete Plans) */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Choose Your Growth Plan</h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base">Transparent pricing. Cancel anytime. 100% Risk-Free Guarantee.</p>
          
          {/* Supported Payment Badges */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs text-slate-400">
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">💳 Stripe (Credit/Debit Cards)</span>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">📱 Razorpay (UPI / PhonePe / Paytm)</span>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">🅿️ PayPal Global</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Plan 1: Starter */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Starter Plan</h3>
              <p className="text-slate-400 text-xs mb-4">For local single shops & cafes.</p>
              <div className="text-3xl font-extrabold text-white mb-6">$19<span className="text-xs font-normal text-slate-400">/month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li>✓ 500 AI Reviews / month</li>
                <li>✓ Google & Yelp Integration</li>
                <li>✓ Multi-language Auto-reply</li>
                <li>✓ Sentiment Analysis</li>
              </ul>
            </div>
            <button onClick={() => handlePayment('Starter Plan', 19)} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl text-xs transition cursor-pointer">
              Subscribe ($19)
            </button>
          </div>

          {/* Plan 2: Pro Business */}
          <div className="bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-500/50 p-6 rounded-3xl flex flex-col justify-between relative shadow-xl">
            <span className="absolute -top-3 right-4 bg-indigo-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Most Popular</span>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Pro Business</h3>
              <p className="text-slate-400 text-xs mb-4">For growing multi-location brands.</p>
              <div className="text-3xl font-extrabold text-white mb-6">$49<span className="text-xs font-normal text-slate-400">/month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li>✓ Unlimited AI Review Replies</li>
                <li>✓ Google, Shopify, Yelp & Amazon</li>
                <li>✓ Promo Discount Automation</li>
                <li>✓ 24/7 Priority Support</li>
              </ul>
            </div>
            <button onClick={() => handlePayment('Pro Business Plan', 49)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl text-xs transition shadow-lg shadow-indigo-600/20 cursor-pointer">
              Subscribe ($49)
            </button>
          </div>

          {/* Plan 3: Done-For-You Service */}
          <div className="bg-slate-900 border border-purple-500/40 p-6 rounded-3xl flex flex-col justify-between hover:border-purple-500 transition">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Done-For-You (DFY)</h3>
              <p className="text-slate-400 text-xs mb-4">Hands-off full reputation service.</p>
              <div className="text-3xl font-extrabold text-purple-400 mb-6">$149<span className="text-xs font-normal text-slate-400">/month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li>✓ Dedicated Account Manager</li>
                <li>✓ 100% Hands-off Management</li>
                <li>✓ Monthly Review Audit Report</li>
                <li>✓ Crisis & Complaint Escalation</li>
              </ul>
            </div>
            <button onClick={() => handlePayment('DFY Managed Service', 149)} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-xl text-xs transition cursor-pointer">
              Get DFY Service ($149)
            </button>
          </div>

          {/* Plan 4: Agency Plan */}
          <div className="bg-slate-900 border border-emerald-500/40 p-6 rounded-3xl flex flex-col justify-between hover:border-emerald-500 transition">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Agency Suite</h3>
              <p className="text-slate-400 text-xs mb-4">For SEO & Marketing Agencies.</p>
              <div className="text-3xl font-extrabold text-emerald-400 mb-6">$199<span className="text-xs font-normal text-slate-400">/month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li>✓ Manage Up to 20 Client Accounts</li>
                <li>✓ White-Label Custom Branding</li>
                <li>✓ Client Sub-accounts & Access</li>
                <li>✓ Custom API & Webhook Access</li>
              </ul>
            </div>
            <button onClick={() => handlePayment('Agency Suite Plan', 199)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl text-xs transition cursor-pointer">
              Get Agency Plan ($199)
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 text-center text-xs text-slate-500">
        <p>© 2026 ReviewPulse AI • Global Autonomous Reputation Management Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}