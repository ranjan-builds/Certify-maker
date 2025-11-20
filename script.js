// --- FETCH & INLINE STYLES TO FIX CORS/SECURITY ERRORS ---
const loadStyles = async () => {
  const googleFontsUrl =
    "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Great+Vibes&family=Inter:wght@300;400;600&family=Montserrat:wght@400;700&family=Orbitron:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Pinyon+Script&display=swap";
  const fontAwesomeUrl =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";

  try {
    // Fetch both concurrently
    const [fontsCss, iconsCss] = await Promise.all([
      fetch(googleFontsUrl).then((res) => res.text()),
      fetch(fontAwesomeUrl).then((res) => res.text()),
    ]);

    const styleBlock = document.getElementById("dynamic-styles");
    styleBlock.textContent = fontsCss + "\n" + iconsCss;
    console.log("Styles inlined successfully");
  } catch (e) {
    console.warn(
      "Failed to inline styles, falling back to link tags (export might fail)",
      e
    );
    // Fallback: If fetch fails, inject link tags so UI still looks good
    const head = document.head;
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = googleFontsUrl;
    head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = fontAwesomeUrl;
    head.appendChild(link2);
  }
};

// Load styles immediately
loadStyles();

// --- STATE MANAGEMENT ---
const state = {
  templateId: 1,
  org: "Tech Solutions Inc.",
  title: "Certificate of Appreciation",
  recipient: "Alex Richardson",
  body: "For outstanding performance and dedication demonstrated during the Annual Tech Summit 2025.",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  sign: "Jonathan Doe",
  signTitle: "Director",
};

// --- TEMPLATE RENDERERS ---
const renderTemplate = () => {
  const container = document.getElementById("certificateRender");
  let html = "";

  // Shared Badge SVG
  const badgeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.612-3.129 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.348zm7.92 7.224a5.21 5.21 0 01-1.086.218 5.21 5.21 0 01-1.086-.218 5.25 5.25 0 01-1.612-3.129 5.25 5.25 0 016.139-5.6 45.53 45.53 0 012.006.348 5.267 5.267 0 01-4.36 8.381zm-7.846 3.129a.375.375 0 00-.375.375v2.625h3v-2.625a.375.375 0 00-.375-.375H5.24zm8.115 0a.375.375 0 00-.375.375v2.625h3v-2.625a.375.375 0 00-.375-.375h-2.25z" clip-rule="evenodd" /></svg>`;

  // Trophy SVG
  const trophySVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path fill-rule="evenodd" d="M9.6 1.5a1 1 0 011.9 0l.8 4.2a.98.98 0 00.6.7l4.1.8a1 1 0 01.5 1.8l-3.1 2.8a1 1 0 00-.3 1l.9 4a1 1 0 01-1.5 1.1L12 15.8l-3.5 2.1a1 1 0 01-1.5-1.1l.9-4a1 1 0 00-.3-1l-3.1-2.8a1 1 0 01.5-1.8l4.1-.8a.98.98 0 00.6-.7l.8-4.2z" clip-rule="evenodd"/><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.36-1.366 6.75 6.75 0 00-8.56 0 .75.75 0 00-1.36 1.366 5.25 5.25 0 017.27 0z" /></svg>`; // Simplified trophy/star

  // Crown SVG
  const crownSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>`; // Using Star as crown alt or specific crown path
  const realCrownSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M11.25 4.53l-1.88 3.61-3.92.68 2.78 2.85-.55 3.95 3.57-1.77 3.57 1.77-.55-3.95 2.78-2.85-3.92-.68-1.88-3.61zM5 18v2h14v-2H5z"/></svg>`;

  // Stamp/Seal SVG
  const stampSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>`;

  switch (state.templateId) {
    // 1. CLASSIC
    case 1:
      html = `
                        <div class="w-full h-full p-12 bg-[#fffdf5]">
                            <div class="w-full h-full border-8 border-double border-gold-600 p-2 relative flex flex-col items-center justify-between bg-white">
                                <!-- Corner Decorations -->
                                <div class="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gold-600 m-4"></div>
                                <div class="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-gold-600 m-4"></div>
                                <div class="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-gold-600 m-4"></div>
                                <div class="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-gold-600 m-4"></div>

                                <div class="text-center mt-16 z-10 w-3/4 mx-auto">
                                    <div class="text-gold-600 w-16 h-16 mx-auto mb-4 opacity-80">${badgeSVG}</div>
                                    <h3 class="font-cinzel text-xl tracking-[0.3em] uppercase text-gray-600 mb-2">${state.org}</h3>
                                    <h1 class="font-playfair font-bold text-6xl text-slate-800 mb-8">${state.title}</h1>
                                    <p class="font-playfair italic text-xl text-gray-500 mb-4">This certificate is proudly presented to</p>
                                    <div class="font-great-vibes text-8xl text-gold-600 py-4 border-b border-gray-200 mb-8 min-h-[140px]">${state.recipient}</div>
                                    <p class="font-playfair text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">${state.body}</p>
                                </div>

                                <div class="flex justify-around w-full px-24 mb-20 z-10">
                                    <div class="text-center">
                                        <div class="font-playfair font-bold text-xl text-slate-800 border-b border-slate-400 pb-2 px-8 mb-2 min-w-[200px]">${state.date}</div>
                                        <div class="text-xs uppercase tracking-widest text-gray-500">Date</div>
                                    </div>
                                    <div class="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/30 text-gold-600 p-4">
                                         ${badgeSVG}
                                    </div>
                                    <div class="text-center">
                                        <div class="font-great-vibes text-4xl text-slate-800 border-b border-slate-400 pb-2 px-8 mb-2 min-w-[200px]">${state.sign}</div>
                                        <div class="text-xs uppercase tracking-widest text-gray-500">${state.signTitle}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
      break;

    // 2. MODERN
    case 2:
      html = `
                        <div class="w-full h-full bg-white flex font-montserrat">
                            <!-- Sidebar -->
                            <div class="w-1/3 bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center text-white p-12">
                                <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-grid-pattern"></div>
                                <div class="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mb-8 shadow-lg z-10 p-6 text-white">
                                     ${trophySVG}
                                </div>
                                <h2 class="text-2xl font-bold uppercase tracking-widest text-center z-10">${
                                  state.org
                                }</h2>
                                <div class="mt-auto z-10 opacity-70 text-sm">
                                    ID: CERT-${Math.floor(
                                      Math.random() * 100000
                                    )}
                                </div>
                            </div>
                            
                            <!-- Content -->
                            <div class="w-2/3 p-16 flex flex-col justify-center relative">
                                <div class="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-bl-full"></div>
                                
                                <h3 class="text-blue-600 font-bold uppercase tracking-widest mb-2 text-lg">Official Document</h3>
                                <h1 class="text-6xl font-bold text-slate-900 mb-12 leading-tight uppercase">${
                                  state.title
                                }</h1>
                                
                                <p class="text-gray-500 text-xl mb-2">Awarded to</p>
                                <div class="text-5xl font-bold text-slate-800 mb-8 pb-4 border-b-4 border-blue-500 inline-block mr-auto pr-12">
                                    ${state.recipient}
                                </div>
                                
                                <p class="text-gray-600 text-lg leading-relaxed mb-16 max-w-lg">
                                    ${state.body}
                                </p>
                                
                                <div class="flex justify-between items-end">
                                    <div>
                                        <p class="text-sm text-gray-400 uppercase font-bold mb-2">Date Issued</p>
                                        <p class="text-xl font-semibold text-slate-900">${
                                          state.date
                                        }</p>
                                    </div>
                                    <div class="text-right">
                                         <div class="h-12 mb-2">
                                            <span class="font-pinyon text-4xl text-blue-900">${
                                              state.sign
                                            }</span>
                                         </div>
                                         <div class="h-px w-48 bg-slate-300 mb-2"></div>
                                         <p class="text-sm text-gray-400 uppercase font-bold">${
                                           state.signTitle
                                         }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
      break;

    // 3. TECH / CYBERPUNK
    case 3:
      html = `
                        <div class="w-full h-full bg-[#050505] text-gray-300 font-orbitron relative p-8 flex items-center justify-center">
                            <!-- Borders -->
                            <div class="absolute inset-8 border border-green-500/30 z-0"></div>
                            <div class="absolute top-8 left-8 w-32 h-32 border-t-4 border-l-4 border-green-500"></div>
                            <div class="absolute bottom-8 right-8 w-32 h-32 border-b-4 border-r-4 border-green-500"></div>
                            
                            <div class="w-full z-10 text-center">
                                <div class="text-green-500 text-sm tracking-[1em] uppercase mb-4 animate-pulse">System Verified</div>
                                <h1 class="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2 uppercase filter drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                                    ${state.title}
                                </h1>
                                <h2 class="text-xl text-gray-500 uppercase tracking-widest mb-16">${state.org}</h2>
                                
                                <div class="relative inline-block mb-12">
                                    <div class="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded opacity-20 blur"></div>
                                    <div class="relative bg-black px-12 py-6 border border-gray-800">
                                        <p class="text-sm text-gray-500 mb-2 uppercase">Recipient Interface</p>
                                        <h3 class="text-5xl font-bold text-white tracking-wide">${state.recipient}</h3>
                                    </div>
                                </div>
                                
                                <p class="text-lg text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed font-sans">
                                    <span class="text-green-500 font-mono">&gt;</span> ${state.body}
                                </p>
                                
                                <div class="flex justify-center gap-24 items-center">
                                    <div class="text-left border-l-2 border-green-500 pl-4">
                                        <div class="text-xs text-gray-500 uppercase mb-1">Timestamp</div>
                                        <div class="text-xl font-mono">${state.date}</div>
                                    </div>
                                    
                                    <div class="w-24 h-24 bg-black border border-gray-800 flex items-center justify-center p-4">
                                        <!-- QR Code SVG -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-full h-full text-white"><path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v3h-3v-3zm-3 0h2v3h-2v-3zm-3-3h2v2h-2v-2zm-3 3h2v3h-2v-3z"/></svg>
                                    </div>
                                    
                                    <div class="text-right border-r-2 border-blue-500 pr-4">
                                        <div class="text-xs text-gray-500 uppercase mb-1">Authorized Sig</div>
                                        <div class="text-xl font-pinyon text-white">${state.sign}</div>
                                        <div class="text-xs text-blue-400">${state.signTitle}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
      break;

    // 4. ELEGANT
    case 4:
      html = `
                         <div class="w-full h-full bg-white p-16 flex items-center justify-center">
                            <div class="w-full h-full border border-slate-800 relative p-12 flex flex-col items-center text-center">
                                <!-- Inner line -->
                                <div class="absolute inset-3 border border-slate-300"></div>
                                
                                <div class="mb-12 mt-8">
                                    <h2 class="font-montserrat font-bold tracking-[0.4em] text-sm text-slate-400 uppercase">${state.org} PRESENTS</h2>
                                </div>

                                <h1 class="font-playfair italic text-7xl text-slate-900 mb-6">${state.title}</h1>
                                
                                <div class="w-12 h-px bg-slate-300 mb-8"></div>
                                
                                <p class="font-montserrat text-slate-500 uppercase tracking-widest text-xs mb-6">Awarded To</p>
                                
                                <div class="font-playfair text-6xl text-slate-800 mb-10 relative px-12">
                                    ${state.recipient}
                                </div>
                                
                                <p class="font-inter font-light text-slate-600 max-w-xl text-lg leading-8 mb-20">
                                    ${state.body}
                                </p>
                                
                                <div class="flex w-full justify-between items-end px-12 mt-auto">
                                    <div class="text-left">
                                        <p class="font-montserrat text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Date</p>
                                        <p class="font-playfair text-xl">${state.date}</p>
                                    </div>
                                    
                                    <div class="mb-4 text-slate-200 w-20 h-20">
                                        ${badgeSVG}
                                    </div>

                                    <div class="text-right">
                                        <p class="font-montserrat text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Signature</p>
                                        <div class="font-great-vibes text-3xl mb-1">${state.sign}</div>
                                        <p class="font-montserrat text-[10px] text-slate-400 uppercase">${state.signTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
      break;

    // 5. AWARD
    case 5:
      html = `
                         <div class="w-full h-full bg-white border-[16px] border-red-900 relative font-serif">
                            <!-- Header Strip -->
                            <div class="w-full bg-red-900 h-32 flex items-center justify-center shadow-lg">
                                <h1 class="text-white text-5xl font-playfair font-bold uppercase tracking-wider">${state.title}</h1>
                            </div>
                            
                            <div class="p-16 text-center flex flex-col items-center h-[calc(100%-128px)]">
                                <div class="mt-8 mb-4">
                                    <span class="text-red-800/20 text-9xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-32 h-32">
                                        ${badgeSVG}
                                    </span>
                                </div>
                                
                                <h3 class="text-xl font-bold text-gray-500 uppercase tracking-widest z-10 mt-12">Presented By ${state.org}</h3>
                                <p class="text-lg text-gray-400 italic mt-2 mb-8 z-10">To recognize the exceptional achievements of</p>
                                
                                <div class="text-6xl font-bold text-red-900 border-b-2 border-red-100 pb-8 px-12 mb-8 z-10 font-playfair">
                                    ${state.recipient}
                                </div>
                                
                                <p class="text-xl text-gray-600 max-w-2xl leading-relaxed z-10 font-medium">
                                    ${state.body}
                                </p>
                                
                                <div class="mt-auto w-full flex justify-between items-center px-12 z-10">
                                     <div class="text-center">
                                         <div class="w-40 border-b border-gray-400 mb-2"></div>
                                         <p class="font-bold text-gray-600 text-sm uppercase">${state.date}</p>
                                     </div>
                                     
                                     <div class="w-20 h-20 bg-red-900 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white ring-4 ring-red-900/30 p-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                     </div>
                                     
                                     <div class="text-center">
                                         <div class="w-40 border-b border-gray-400 mb-2 flex items-end justify-center h-8 pb-1">
                                            <span class="font-great-vibes text-2xl text-red-900">${state.sign}</span>
                                         </div>
                                         <p class="font-bold text-gray-600 text-sm uppercase">${state.signTitle}</p>
                                     </div>
                                </div>
                            </div>
                        </div>
                    `;
      break;

    // 6. MINIMALIST
    case 6:
      html = `
                        <div class="w-full h-full bg-white p-24 flex items-center justify-center font-inter">
                            <div class="w-full text-left">
                                <div class="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-12">
                                    ${state.org.charAt(0)}
                                </div>
                                
                                <p class="text-gray-500 uppercase tracking-widest text-sm mb-2">Certificate of Completion</p>
                                <h1 class="text-7xl font-bold text-black mb-12 tracking-tighter -ml-1">${
                                  state.recipient
                                }</h1>
                                
                                <div class="w-full h-px bg-gray-200 mb-8"></div>
                                
                                <div class="flex gap-16">
                                    <div class="w-2/3">
                                        <p class="text-xl text-gray-800 leading-relaxed font-light">
                                            ${state.body}
                                        </p>
                                    </div>
                                    <div class="w-1/3 space-y-8">
                                        <div>
                                            <p class="text-xs font-bold uppercase text-gray-400 mb-1">Issued By</p>
                                            <p class="text-lg font-medium">${
                                              state.org
                                            }</p>
                                        </div>
                                        <div>
                                            <p class="text-xs font-bold uppercase text-gray-400 mb-1">Date</p>
                                            <p class="text-lg font-medium">${
                                              state.date
                                            }</p>
                                        </div>
                                        <div>
                                            <p class="text-xs font-bold uppercase text-gray-400 mb-1">Signed</p>
                                            <div class="h-8 flex items-end">
                                                <span class="font-pinyon text-2xl">${
                                                  state.sign
                                                }</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
      break;

    // 7. VINTAGE (FIXED)
    case 7:
      html = `
                        <div class="w-full h-full bg-[#fdf6e3] p-12 font-cinzel text-[#433422]">
                            <div class="w-full h-full border-4 border-[#433422] p-1 relative flex flex-col items-center justify-center">
                                <div class="w-full h-full border-2 border-[#433422] border-dashed p-12 flex flex-col items-center text-center">
                                    
                                    <!-- Ornamental Top (Replaced with SVG) -->
                                    <div class="w-16 h-16 mb-8 opacity-80">
                                        ${realCrownSVG}
                                    </div>
                                    
                                    <h2 class="text-xl tracking-[0.5em] uppercase border-b border-[#433422] pb-4 mb-8">${state.org}</h2>
                                    
                                    <h1 class="text-6xl font-bold mb-4">Certificate of Merit</h1>
                                    
                                    <p class="italic font-serif text-xl opacity-80 mb-8">Is hereby conferred upon</p>
                                    
                                    <!-- Added font-family inline style to ensure export capture -->
                                    <!-- ADJUSTED: Increased mb-8 to mb-8 for better spacing -->
                                    <div class="font-pinyon text-8xl mb-8 transform -rotate-2" style="font-family: 'Pinyon Script', cursive;">${state.recipient}</div>
                                    
                                    <p class="font-serif text-xl leading-relaxed max-w-2xl  opacity-90">
                                        ${state.body}
                                    </p>
                                    
                                    <!-- ADJUSTED: Added pb-8 to lift from bottom -->
                                    <div class="mt-auto flex justify-between w-full px-12 items-end pb-8">
                                        <div class="text-center">
                                            <div class="border-b border-[#433422] w-48 mb-2"></div>
                                            <div class="text-xs uppercase tracking-widest">Date</div>
                                            <div class="font-serif text-lg">${state.date}</div>
                                        </div>
                                        
                                        <!-- Stamp (Replaced with SVG) -->
                                        <div class="w-24 h-24 border-4 border-[#433422] rounded-full flex items-center justify-center opacity-50 p-4">
                                            ${stampSVG}
                                        </div>
                                        
                                        <div class="text-center">
                                            <div class="font-pinyon text-3xl mb-[-10px]" style="font-family: 'Pinyon Script', cursive;">${state.sign}</div>
                                            <div class="border-b border-[#433422] w-48 mb-2"></div>
                                            <div class="text-xs uppercase tracking-widest">Signature</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
      break;

    // 8. CREATIVE
    case 8:
      html = `
                        <div class="w-full h-full bg-white relative overflow-hidden font-montserrat flex">
    <!-- Background Shapes -->
    <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-purple-600 rounded-full opacity-10 mix-blend-multiply"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] bg-pink-500 rounded-full opacity-10 mix-blend-multiply"></div>
    <div class="absolute top-[20%] right-[10%] w-[30%] h-[50%] bg-yellow-300 rounded-full opacity-10 mix-blend-multiply"></div>

    <!-- Left Color Bar -->
    <div class="w-4 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-yellow-500"></div>
    
    <div class="flex-1 p-16 flex flex-col relative z-10">
        <!-- Header Section -->
        <div class="flex justify-between items-start mb-16">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xl p-4">
                <!-- Palette SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                    <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s6 2.62 8.28 6.38c.13.22.07.52-.15.65l-1.72.99c-.42.24-.84.12-1.13-.2-.57-.63-1.39-1.02-2.28-1.02-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4 .66 0 1.29-.2 1.83-.54.43-.28.99-.18 1.33.23l1.34 1.62c.2.24.21.59.01.84C17.73 20.76 15.05 22 12 22zM5.5 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm2 5.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
            </div>
            <div class="text-right">
                <h2 class="text-3xl font-bold text-slate-800 uppercase tracking-wider">${state.org}</h2>
                <p class="text-slate-500 text-lg mt-2">Creative Excellence Award</p>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="flex-1 flex flex-col justify-center">
            <h1 class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 leading-tight tracking-tight">
                ${state.title}
            </h1>
            
            <p class="text-2xl text-slate-500 font-light mb-8 tracking-wide">Presented to</p>
            
            <div class="text-5xl font-bold text-slate-800 mb-12 border-b-2 border-purple-200 pb-4">
                ${state.recipient}
            </div>
            
            <div class="bg-slate-50 p-10 rounded-2xl border-l-4 border-purple-500 mb-12 shadow-md">
                <p class="text-xl text-slate-600 leading-relaxed text-center italic">
                    ${state.body}
                </p>
            </div>
        </div>
        
        <!-- Footer Section -->
        <div class="flex justify-between items-end mt-auto pt-8">
            <div>
                <p class="text-sm font-bold text-purple-500 uppercase mb-2 tracking-wider">Date</p>
                <p class="font-semibold text-slate-700 text-lg">${state.date}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-purple-500 uppercase mb-2 tracking-wider">Signature</p>
                <p class="font-semibold text-slate-700 font-pinyon text-3xl">${state.sign}</p>
            </div>
        </div>
    </div>
</div>
                    `;
      break;

    // 9. CORPORATE
    case 9:
      html = `
                        <div class="w-full h-full bg-white flex flex-col font-inter">
                            <!-- Header Bar -->
                            <div class="h-24 bg-slate-800 flex items-center px-16 justify-between text-white">
                                <div class="flex items-center gap-4">
                                    <div class="w-8 h-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-full h-full text-blue-400"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                                    </div>
                                    <span class="text-xl font-bold tracking-wide uppercase">${state.org}</span>
                                </div>
                                <div class="text-sm text-slate-400 uppercase tracking-widest">
                                    Official Certification
                                </div>
                            </div>
                            
                            <!-- Content -->
                            <div class="flex-1 p-16 flex flex-col items-center text-center bg-slate-50">
                                <div class="w-full max-w-4xl bg-white shadow-xl p-16 border-t-4 border-blue-600">
                                    <h1 class="text-4xl font-bold text-slate-900 uppercase mb-2">${state.title}</h1>
                                    <div class="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
                                    
                                    <p class="text-slate-500 uppercase tracking-widest text-sm mb-6">This certifies that</p>
                                    
                                    <h2 class="text-5xl font-bold text-slate-800 mb-8 py-4 bg-slate-50 rounded-lg border border-slate-100">
                                        ${state.recipient}
                                    </h2>
                                    
                                    <p class="text-slate-500 uppercase tracking-widest text-sm mb-6">Has successfully completed the requirements for</p>
                                    
                                    <p class="text-xl text-slate-700 leading-relaxed mb-16 font-light">
                                        ${state.body}
                                    </p>
                                    
                                    <div class="grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
                                        <div class="text-left">
                                            <p class="text-xs text-slate-400 uppercase font-bold mb-1">Date Issued</p>
                                            <p class="text-slate-800 font-semibold">${state.date}</p>
                                        </div>
                                        <div class="flex justify-center">
                                            <div class="w-20 h-20 border-2 border-slate-200 rounded-full flex items-center justify-center p-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-full h-full text-blue-600"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-xs text-slate-400 uppercase font-bold mb-1">Authorized Signature</p>
                                            <div class="font-pinyon text-2xl text-slate-800">${state.sign}</div>
                                            <p class="text-xs text-slate-500">${state.signTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
      break;
  }

  container.innerHTML = html;
};

// --- EVENT LISTENERS ---

// Inputs
const inputs = [
  "inputOrg",
  "inputTitle",
  "inputName",
  "inputBody",
  "inputDate",
  "inputSign",
  "inputSignTitle",
];
const keys = ["org", "title", "recipient", "body", "date", "sign", "signTitle"];

inputs.forEach((id, index) => {
  document.getElementById(id).addEventListener("input", (e) => {
    state[keys[index]] = e.target.value;
    renderTemplate();
  });
});

// Set Initial Date input value
document.getElementById("inputDate").value = state.date;

// Templates
window.setTemplate = (id) => {
  state.templateId = id;

  // Update UI active state
  document.querySelectorAll(".template-btn").forEach((btn) => {
    // Reset all buttons
    btn.classList.remove("btn-active");
    btn.classList.add(
      "bg-neutral-900",
      "text-neutral-400",
      "border-neutral-800"
    );

    // Reset icon colors inside buttons
    const icon = btn.querySelector("svg");
    if (icon) icon.classList.remove("text-white");
  });

  // Activate clicked button
  const activeBtn = document.querySelector(`.template-btn[data-id="${id}"]`);
  if (activeBtn) {
    activeBtn.classList.remove(
      "bg-neutral-900",
      "text-neutral-400",
      "border-neutral-800"
    );
    activeBtn.classList.add("btn-active");

    // Make icon white
    const icon = activeBtn.querySelector("svg");
    if (icon) icon.classList.add("text-white");
  }

  renderTemplate();
};

// Scaling Logic for Preview
const handleResize = () => {
  const wrapper = document.getElementById("previewWrapper");
  const container = document.getElementById("scaleContainer");
  // A4 Landscape dimensions in px (at 96 DPI approx)
  const certWidth = 1123;
  const certHeight = 794;

  // Get available width in the right panel, minus padding
  // Reduced padding calculation for mobile
  const padding = window.innerWidth < 768 ? 32 : 64;
  const availableWidth = wrapper.clientWidth - padding;
  const availableHeight = wrapper.clientHeight - padding;

  const scaleX = availableWidth / certWidth;
  const scaleY = availableHeight / certHeight;

  // Scale to fit whichever dimension is tighter
  const scale = Math.min(scaleX, scaleY, 1); // Don't scale up past 100% if screen is huge

  container.style.transform = `scale(${scale})`;

  // IMPORTANT: We do NOT set width/height on the container here.
  // We let the container keep its natural size (which wraps the 1123px child)
  // and rely on flexbox + transform to center it visually.

  // We need to set the transform origin to center to make it look good
  container.style.transformOrigin = "center center";
};

window.addEventListener("resize", handleResize);

// --- DOWNLOAD LOGIC ---
window.triggerDownload = async () => {
  const node = document.getElementById("certificateRender");
  const btn = document.getElementById("downloadBtn");
  const loader = document.getElementById("loader");

  // UI Feedback
  loader.classList.remove("hidden");
  loader.classList.add("flex");

  try {
    // We use html-to-image
    // filter prevents font-awesome double rendering issues sometimes seen
    const dataUrl = await htmlToImage.toPng(node, {
      quality: 1.0,
      pixelRatio: 2, // Higher resolution
      style: {
        transform: "scale(1)", // Ensure no scale affects the output
      },
    });

    const link = document.createElement("a");
    link.download = `${state.recipient.replace(/\s+/g, "_")}_Certificate.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("oops, something went wrong!", error);
    alert("Error generating image. Please try again.");
  } finally {
    loader.classList.add("hidden");
    loader.classList.remove("flex");
  }
};

// --- INITIALIZATION ---
// Initialize Template 1 active state UI
const initBtn = document.querySelector(`.template-btn[data-id="1"]`);
if (initBtn) {
  initBtn.classList.remove(
    "bg-neutral-900",
    "text-neutral-400",
    "border-neutral-800"
  );
  initBtn.classList.add("btn-active");
  const icon = initBtn.querySelector("svg");
  if (icon) icon.classList.add("text-white");
}

// Initial Render
renderTemplate();

// Initial Scale calculation after a brief delay to ensure DOM is painted
setTimeout(handleResize, 100);
