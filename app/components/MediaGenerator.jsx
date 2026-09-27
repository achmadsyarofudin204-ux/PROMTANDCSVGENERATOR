'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Copy, 
  Upload, 
  Aperture,
  X, 
  Loader2, 
  Check,
  Zap,
  Download,
  RotateCcw,
  Palette,
  Image as ImageIcon,
  Video as VideoIcon,
  Type,
  Layers,
  Grid,
  BoxSelect,
  CalendarDays,
  ChevronRight,
  Settings2,
  Hourglass,
  ShieldCheck,
  Activity,
  KeyRound,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Server,
  History,
  Clock,
  MessageCircle,
  Sun,
  Moon,
  ClipboardPaste,
  Tags,
  FileText
} from 'lucide-react';

const BATCH_SIZE = 2;

const GEMINI_MODELS = [
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview (Sistem/Default)" },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (Paling Pintar)" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash (Cepat)" }
];

const SPECIAL_MOMENTS = [
  "Lunar New Year", "Valentine's Day", "Ramadan & Eid", "Easter Celebration", "Earth Day", "Mother's Day", "Father's Day",
  "Pride Month", "Juneteenth", "Independence Day (USA)", "Back to School", "Oktoberfest", "Halloween", "Diwali Festival",
  "Black Friday & Cyber Monday", "Thanksgiving", "Christmas Season", "New Year's Eve", "International Women's Day", "World Health Day"
];

const IMAGE_CATEGORIES = [
  "Random", ...SPECIAL_MOMENTS,
  "Abstract Backgrounds", "Aerial Photography", "Agriculture & Farming", "AI Technology", "Ancient Civilizations", "Animals & Wildlife", "Architecture & Buildings", "Art Supplies & Tools", "Arts & Entertainment", "Augmented Reality", "Automotive & Transport", "Autumn Season", "Baby & Toddler", "Banking & Investment", "Beach & Seaside", "Beauty & Fashion", "Beverages & Cocktails", "Blockchain & Cryptocurrency", "Business & Finance", "Camping & Outdoor Life", "Celebrations & Holidays", "Children & Education", "City Life", "Cloud Computing", "Coffee Culture", "Concept Art", "Construction Equipment", "Corporate Office", "Creative Workspace", "Cybersecurity", "Data Analytics", "Digital Marketing", "DIY & Crafts", "E-commerce Logistics", "Education & Learning", "Electric Vehicles", "Energy & Utilities", "Environmental Conservation", "Family & Lifestyle", "Farm to Table", "Festivals & Events", "Financial Technology (FinTech)", "Fitness Training", "Food & Drink", "Food Preparation", "Futuristic Cityscapes", "Gaming & Esports", "Gardening & Plants", "Global Communication", "Green Energy", "Grocery & Supermarket", "Healthcare & Medical", "Healthy Lifestyle", "Hiking & Adventure", "Historical Landmarks", "Home Appliances", "Home Decor", "Hospitality & Hotels", "Human Resources", "Illustration Assets", "Industrial & Construction", "Innovation & Startups", "Insurance & Risk Management", "Interior Design", "Internet of Things (IoT)", "Investment & Trading", "Kids Activities", "Kitchen & Cooking", "Landscape & Nature", "Legal & Law", "Luxury & Wealth", "Machine Learning", "Manufacturing Industry", "Marine Life", "Marketing & Advertising", "Meditation & Mindfulness", "Mental Health", "Metaverse", "Minimalist Patterns", "Mobile Apps", "Modern Lifestyle", "Mountain & Adventure", "Music & Concerts", "Nature Conservation", "Networking & Connectivity", "Nutrition & Diet", "Office Work", "Online Education", "Organic Food", "Outdoor Sports", "Packaging Design", "Parenting & Family", "Pet Care", "Pharmaceuticals", "Photography Equipment", "Plant-Based Lifestyle", "Podcast & Streaming", "Portrait Photography", "Product Showcase", "Productivity & Time Management", "Real Estate", "Remote Work", "Renewable Resources", "Restaurant & Dining", "Robotics & Automation", "Rural Life", "Safety & Security", "Science & Research", "Seasonal Backgrounds", "Self Care", "Shopping & E-commerce", "Skin Care & Spa", "Smart City", "Smart Home", "Social Media", "Software Development", "Solar Energy", "Space & Galaxy", "Spirituality & Religion", "Sports & Fitness", "Spring Season", "Startup Culture", "Street Photography", "Sustainability", "Swimming & Water Sports", "Teamwork & Collaboration", "Technology & Devices", "Textures & Surfaces", "Tourism Destinations", "Traditional Culture", "Transportation Systems", "Travel & Tourism", "UI/UX Design", "Underwater World", "Urban Lifestyle", "User Experience", "Virtual Reality", "Visual Effects", "Volunteering & Charity", "Waste Management", "Water Conservation", "Wedding & Romance", "Wellness & Yoga", "Wildlife Conservation", "Winter Season", "Work from Home", "Workplace Culture", "Yoga Retreat", "Zero Waste"
];

const VIDEO_CATEGORIES = [
  "Random", ...SPECIAL_MOMENTS,
  "Aerial Footage", "Background Loops", "Business Meeting", "City Time-lapse", "Cloud Time-lapse", "Corporate Presentation", 
  "Drone Cinematography", "Education & Classroom", "Family Moments", "Fitness & Gym", "Food Preparation", "Green Screen Assets", 
  "Handshake Close-up", "Healthcare Professional", "Industrial Machinery", "Lifestyle Slow Motion", "Nature Landscapes", 
  "Ocean Waves", "Office Environment", "People Walking", "Product Reveal", "Road Traffic", "Science Lab", "Shopping Mall", 
  "Smartphone Usage", "Sports Action", "Stock Market Data", "Sunrise & Sunset", "Technology Interface (HUD)", "Travel Montage", 
  "Typing on Keyboard", "Underwater Footage", "Virtual Reality User", "Wedding Ceremony", "Wellness & Yoga Flow", 
  "Work from Home Setup"
];

const DESIGN_STYLES = {
  image: {
    jpg: [
      "Cinematic Photography", "Analog Film (35mm)", "Macro Photography", "Studio Lighting", "Street Photography", 
      "Cyberpunk Neon", "Golden Hour", "Black and White", "HDR Photography", "Bokeh Effect", 
      "Product Photography", "Tilt-Shift", "Astrophotography", "Vintage Polaroid", "3D Render (Unreal/Octane)", 
      "Claymation Render", "Hyperrealistic Digital Art", "Double Exposure"
    ],
    png: [
      "Set of 4 Items (Grid)", "Set of 6 Items (Grid)", "Set of 9 Items (Grid)", "Sticker Sheet Collection", 
      "3D Icon/Asset", "Die-Cut Sticker", "T-Shirt Vector Print", "Watercolor Clipart", "Kawaii Character", 
      "Vintage Badge/Logo", "Isometric 3D Element", "Pixel Art", "Mascot Character", "Pop Art Halftone",
      "Paper Cutout Style", "Graffiti Art"
    ],
    vector: [
      "Set of 4 Items (Grid)", "Set of 6 Items (Grid)", "Set of 9 Items (Grid)", "Icon Pack / Collection", "Seamless Pattern",
      "3D Isometric Illustration", "Abstract Geometric", "Abstract Wave Vector", "Bold Outline Cartoon", "Brutalist Graphic Style", "Cartoon Mascot Style", "Chibi Character Style", "Claymorphism Vector", "Comic Book Style", "Corporate Memphis", "Cyberpunk Neon Vector", "Digital Cutout Style", "Doodle/Sketch", "Duotone Vector", "Filled Icon Style", "Flat Character Design", "Flat UI Illustration", "Flat Vector Illustration", "Fluid Gradient Shapes", "Futuristic Tech Vector", "Geometric Bauhaus", "Glassmorphism Vector", "Gradient Mesh Vector", "Grid-Based Illustration", "Halftone Vector", "Hand-Drawn Vector", "High Contrast Vector", "Iconographic Minimalism", "Infographic Element", "Isometric Vector", "Kawaii Illustration", "Layered Paper Art", "Line Gradient Style", "Low Poly Vector", "Manga/Anime Style", "Memphis Pattern", "Mid-Century Modern", "Minimal Geometric Shapes", "Minimalist Line Art", "Modular Illustration System", "Monoline Vector", "Neumorphism Vector", "No Border Line Flat Vector", "Organic Shapes Illustration", "Outline + Fill Hybrid", "Outline Icon Style", "Paper Cut Style", "Pastel Color Vector", "Pop Art Vector", "Polygonal Art", "Psychedelic Vector", "Retro Synthwave", "Sticker Style Vector", "Swiss Design Style", "Thick Stroke Vector", "Thin Line Minimal", "Ukiyo-e (Japanese Woodblock)", "Vector Collage Style", "Vintage Poster Style", "Vintage Stamp/Woodcut", "Western Cartoon"
    ]
  },
  video: [
    "Cinematic Movie Trailer", "Vlog Style", "Drone Aerial", "Time-Lapse", "Slow Motion", 
    "Stop Motion Animation", "VHS/Retro Camcorder", "Documentary Style", "Music Video Style", "Glitch/Cyberpunk", 
    "First Person View (FPV)", "Motion Graphics", "3D Animation"
  ]
};

const THEMES = {
  light: { name: 'Light (Default)', bg: 'bg-slate-50', panel: 'bg-white', border: 'border-slate-200', text: 'text-slate-900', accent: 'bg-blue-600', accentHover: 'hover:bg-blue-700', textSec: 'text-slate-500', highlight: 'bg-slate-100', progress: 'bg-gradient-to-r from-blue-500 to-cyan-400' },
  dark: { name: 'Dark (Modern)', bg: 'bg-slate-950', panel: 'bg-slate-900', border: 'border-slate-800', text: 'text-slate-200', accent: 'bg-indigo-600', accentHover: 'hover:bg-indigo-500', textSec: 'text-slate-400', highlight: 'bg-slate-800', progress: 'bg-gradient-to-r from-indigo-600 to-purple-500' }
};

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('dark'); 
  const t = THEMES[currentTheme];

  // API Key & Model State
  const [apiKeysText, setApiKeysText] = useState('');
  const [keyStatuses, setKeyStatuses] = useState([]);
  const [activeModel, setActiveModel] = useState(GEMINI_MODELS[0].id);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [keyCheckInProgress, setKeyCheckInProgress] = useState(false);
  const [apiKeyMode, setApiKeyMode] = useState('canvas');

  // Media Type & Settings
  const [mediaType, setMediaType] = useState('image');
  const [selectedCategory, setSelectedCategory] = useState('Random');
  const [customPrompt, setCustomPrompt] = useState('');
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);

  // Image Specific
  const [imageFormat, setImageFormat] = useState('jpg');
  const [imageStyle, setImageStyle] = useState(DESIGN_STYLES.image.jpg[0]);
  const [selectedPrompts, setSelectedPrompts] = useState([]);

  // Dialogs
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', onConfirm: null });
  const [isLoading, setIsLoading] = useState(false);

  const showConfirm = (message, onConfirm) => {
    setConfirmDialog({ isOpen: true, message, onConfirm });
  };

  const handleGenerateImage = async () => {
    if (!apiKeysText.trim()) {
      alert('Harap masukkan API Key terlebih dahulu di Settings');
      return;
    }

    setIsLoading(true);
    try {
      const prompt = useCustomPrompt ? customPrompt : `${selectedCategory} - Style: ${imageStyle}`;
      
      // Call the API endpoint
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          apiKey: apiKeysText.split('\n')[0].trim(),
          model: activeModel,
          mediaType: 'image',
          format: imageFormat,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Gagal menghasilkan gambar');
      }

      // Handle success
      alert('Gambar berhasil dihasilkan!');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkKeys = async () => {
    if (!apiKeysText.trim()) {
      alert('Masukkan minimal satu API Key');
      return;
    }

    setKeyCheckInProgress(true);
    const keys = apiKeysText.split('\n').filter(k => k.trim());
    const statuses = keys.map(k => ({ key: k.trim(), status: 'checking' }));
    setKeyStatuses(statuses);

    try {
      const results = await Promise.all(
        keys.map(async (key, idx) => {
          try {
            const response = await fetch('/api/check-key', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ apiKey: key.trim() }),
            });
            
            const data = await response.json();
            return {
              key: key.trim(),
              status: response.ok ? 'active' : data.error?.includes('quota') ? 'limit' : 'error'
            };
          } catch {
            return { key: key.trim(), status: 'error' };
          }
        })
      );

      setKeyStatuses(results);
    } finally {
      setKeyCheckInProgress(false);
    }
  };

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} transition-colors`}>
      {/* Header */}
      <div className={`border-b ${t.border} sticky top-0 z-40 backdrop-blur-sm bg-black/30`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.accent}`}>
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-black text-lg">Gemini Media Generator</h1>
              <p className={`text-xs ${t.textSec}`}>Powered by Google Gemini API</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg border transition-all ${t.border} hover:bg-black/10 active:scale-95`}
            >
              {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${t.border} hover:bg-black/10 active:scale-95 transition-all text-sm font-bold`}
            >
              <Settings2 size={16} /> Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1 rounded-2xl border ${t.border} ${t.panel} p-6 h-fit sticky top-24`}>
            <h2 className="font-black text-lg mb-6 flex items-center gap-2">
              <Settings2 size={18} /> Settings
            </h2>

            {/* Media Type Selection */}
            <div className="space-y-4 mb-6">
              <label className={`text-xs font-black uppercase tracking-widest ${t.textSec}`}>
                Media Type
              </label>
              <div className="flex gap-2">
                {['image', 'video'].map(type => (
                  <button
                    key={type}
                    onClick={() => setMediaType(type)}
                    className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition-all border ${
                      mediaType === type
                        ? `${t.accent} text-white`
                        : `${t.border} ${t.text} hover:bg-black/10`
                    }`}
                  >
                    {type === 'image' ? <ImageIcon size={16} className="mx-auto" /> : <VideoIcon size={16} className="mx-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selection */}
            <div className="space-y-3 mb-6">
              <label className={`text-xs font-black uppercase tracking-widest ${t.textSec}`}>
                Model Gemini
              </label>
              <select
                value={activeModel}
                onChange={(e) => setActiveModel(e.target.value)}
                className={`w-full p-2 rounded-lg border text-sm outline-none transition-colors bg-transparent ${t.border} focus:border-current`}
              >
                {GEMINI_MODELS.map(model => (
                  <option key={model.id} value={model.id} className="bg-slate-900">
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <label className={`text-xs font-black uppercase tracking-widest ${t.textSec}`}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full p-2 rounded-lg border text-sm outline-none transition-colors bg-transparent ${t.border} focus:border-current`}
              >
                {(mediaType === 'image' ? IMAGE_CATEGORIES : VIDEO_CATEGORIES).map(cat => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Prompt Toggle */}
            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCustomPrompt}
                  onChange={(e) => setUseCustomPrompt(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-bold">Use Custom Prompt</span>
              </label>

              {useCustomPrompt && (
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe what you want to generate..."
                  className={`w-full p-3 rounded-lg border text-sm outline-none transition-colors bg-transparent ${t.border} focus:border-current min-h-24`}
                />
              )}
            </div>
          </div>

          {/* Main Panel */}
          <div className={`lg:col-span-2 rounded-2xl border ${t.border} ${t.panel} p-6 lg:p-8`}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-black text-2xl flex items-center gap-2">
                {mediaType === 'image' ? <ImageIcon size={24} /> : <VideoIcon size={24} />}
                Generate {mediaType === 'image' ? 'Image' : 'Video'}
              </h2>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${t.border} ${t.textSec}`}>
                {selectedCategory}
              </span>
            </div>

            {mediaType === 'image' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className={`text-xs font-black uppercase tracking-widest ${t.textSec} mb-2 block`}>
                    Format
                  </label>
                  <select
                    value={imageFormat}
                    onChange={(e) => {
                      setImageFormat(e.target.value);
                      setImageStyle(DESIGN_STYLES.image[e.target.value][0]);
                    }}
                    className={`w-full p-2 rounded-lg border text-sm outline-none transition-colors bg-transparent ${t.border} focus:border-current`}
                  >
                    <option value="jpg">JPG - Photography</option>
                    <option value="png">PNG - Graphics</option>
                    <option value="vector">Vector - Illustrations</option>
                  </select>
                </div>

                <div>
                  <label className={`text-xs font-black uppercase tracking-widest ${t.textSec} mb-2 block`}>
                    Style
                  </label>
                  <select
                    value={imageStyle}
                    onChange={(e) => setImageStyle(e.target.value)}
                    className={`w-full p-2 rounded-lg border text-sm outline-none transition-colors bg-transparent ${t.border} focus:border-current`}
                  >
                    {DESIGN_STYLES.image[imageFormat].map(style => (
                      <option key={style} value={style} className="bg-slate-900">
                        {style}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerateImage}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 text-white ${t.accent} ${isLoading ? 'opacity-70 cursor-not-allowed' : t.accentHover}`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Generate {mediaType === 'image' ? 'Image' : 'Video'}
                </>
              )}
            </button>

            {/* Info Box */}
            <div className={`mt-8 p-4 rounded-xl border ${t.border} ${t.highlight}`}>
              <p className={`text-xs ${t.textSec}`}>
                💡 Pastikan API Key Gemini sudah diatur di Settings. Sistem akan otomatis menggunakan API Key berikutnya jika terjadi limit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl border flex flex-col overflow-hidden max-h-[90vh] ${t.panel} ${t.border}`}>
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between ${t.border}`}>
              <h3 className="text-xl font-black flex items-center gap-2">
                <KeyRound size={20} /> API Keys
              </h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className={`p-2 rounded-lg hover:bg-black/10 transition-all`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${t.textSec}`}>
                    <KeyRound size={14} /> API Keys (1 Key per Baris)
                  </label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        showConfirm('Yakin ingin menghapus semua daftar API Key?', () => {
                          setApiKeysText('');
                          setKeyStatuses([]);
                        });
                      }}
                      className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all border-red-500/50 text-red-500 hover:bg-red-500/10 active:scale-95`}
                    >
                      <Trash2 size={12}/>
                      Clear
                    </button>
                    <button 
                      onClick={checkKeys}
                      disabled={keyCheckInProgress}
                      className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all ${t.border} ${t.text} hover:bg-black/5 active:scale-95`}
                    >
                      {keyCheckInProgress ? <Loader2 size={12} className="animate-spin"/> : <Activity size={12}/>}
                      Check API Status
                    </button>
                  </div>
                </div>
                
                <textarea 
                  value={apiKeysText}
                  onChange={(e) => {
                    setApiKeysText(e.target.value);
                    setKeyStatuses([]); 
                  }}
                  placeholder="AIzaSy...\nAIzaSy...\nAIzaSy..."
                  className={`w-full border rounded-xl p-4 text-sm font-mono outline-none transition-colors bg-transparent ${t.border} focus:border-current placeholder:opacity-30 min-h-[120px] custom-scrollbar`}
                />

                {keyStatuses.length > 0 && (
                   <div className={`p-3 rounded-xl border ${t.border} bg-black/5 space-y-2 max-h-40 overflow-y-auto custom-scrollbar`}>
                     {keyStatuses.map((ks, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                           <span className={`font-mono opacity-70 truncate w-2/3 ${t.text}`}>
                              {ks.key.substring(0, 20)}...
                           </span>
                           <div className="w-1/3 flex justify-end">
                              {ks.status === 'checking' && <span className="flex items-center gap-1 text-blue-500 font-bold"><Loader2 size={12} className="animate-spin"/> Checking</span>}
                              {ks.status === 'active' && <span className="flex items-center gap-1 text-green-500 font-bold"><CheckCircle2 size={12}/> Active</span>}
                              {ks.status === 'limit' && <span className="flex items-center gap-1 text-orange-500 font-bold"><AlertCircle size={12}/> Limit</span>}
                              {ks.status === 'error' && <span className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={12}/> Error</span>}
                           </div>
                        </div>
                     ))}
                   </div>
                )}
                
                <p className={`text-[10px] text-center opacity-50 mt-2 ${t.textSec}`}>
                  Pisahkan setiap API Key dengan <strong>Enter</strong> (baris baru). Jika key pertama limit/error, sistem akan otomatis menggunakan key berikutnya di daftar ini.
                </p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className={`p-4 border-t flex justify-end gap-3 bg-black/10 ${t.border}`}>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 ${t.accent} text-white`}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-sm rounded-2xl shadow-2xl border flex flex-col overflow-hidden ${t.panel} ${t.border} p-6`}>
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                   <AlertCircle size={24} />
                </div>
                <h3 className={`text-lg font-black tracking-tight ${t.text}`}>Konfirmasi</h3>
                <p className={`text-sm ${t.textSec}`}>{confirmDialog.message}</p>
             </div>
             <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setConfirmDialog({ isOpen: false, message: '', onConfirm: null })}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all border ${t.border} ${t.text} hover:bg-black/5 active:scale-95`}
                >
                  Batal
                </button>
                <button 
                  onClick={() => {
                    if (confirmDialog.onConfirm) confirmDialog.onConfirm();
                    setConfirmDialog({ isOpen: false, message: '', onConfirm: null });
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 bg-red-500 text-white hover:bg-red-600`}
                >
                  Yakin
                </button>
             </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: currentColor; border-radius: 10px; opacity: 0.1; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { opacity: 0.3; }
      `}} />
    </div>
  );
}
