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
  const [apiKeyMode, setApiKeyMode] = useState('canvas'); // 'canvas' or 'manual'
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', onConfirm: null });
  const [pasteHint, setPasteHint] = useState(false);

  const [promptHistory, setPromptHistory] = useState([]);
  const [copiedHistoryIndex, setCopiedHistoryIndex] = useState(null);

  const [mediaType, setMediaType] = useState('image'); // image, video, metadata
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const getInitialTabState = () => ({
    videoMode: 'standard',
    imageType: 'jpg', 
    inputMode: 'keyword', 
    keyword: '',
    category: 'none',
    designStyle: 'none', 
    faceOption: 'with-face', 
    complexity: 'medium',
    negativeWords: '',
    numPrompts: 1, 
    aspectRatio: 'none',
    customAR: '',
    prefix: 'none',
    customPrefix: '',
    parameter: '',
    isolatedBg: 'none',
    customIsolatedBg: '',
    mediaFiles: [],
    results: [],
    progress: 0,
    progressStatus: '',
    batchInfo: { current: 0, total: 0 },
    resumeIndex: 0,
    referenceText: ''
  });

  const [tabState, setTabState] = useState({
    image: getInitialTabState(),
    video: getInitialTabState(),
    metadata: getInitialTabState()
  });

  const updateData = (field, valueOrUpdater, targetTab = mediaType) => {
    setTabState(prev => {
      const currentTabState = prev[targetTab];
      const newValue = typeof valueOrUpdater === 'function' ? valueOrUpdater(currentTabState[field]) : valueOrUpdater;
      return { ...prev, [targetTab]: { ...currentTabState, [field]: newValue } };
    });
  };

  const { videoMode, imageType, inputMode, keyword, category, designStyle, faceOption, complexity, negativeWords, numPrompts, aspectRatio, customAR, prefix, customPrefix, parameter, isolatedBg, customIsolatedBg, mediaFiles, results, progress, progressStatus, batchInfo, resumeIndex, referenceText } = tabState[mediaType];
  
  const fileInputRef = useRef(null);
  const txtInputRef = useRef(null);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('progen_theme');
      if (savedTheme && THEMES[savedTheme]) setCurrentTheme(savedTheme);

      const savedMediaType = localStorage.getItem('progen_media_type');
      if (savedMediaType) setMediaType(savedMediaType);

      const savedTabState = localStorage.getItem('progen_tab_state');
      if (savedTabState) {
         const parsedState = JSON.parse(savedTabState);
         setTabState(prev => ({
            image: { ...prev.image, ...parsedState.image },
            video: { ...prev.video, ...parsedState.video },
            metadata: { ...prev.metadata, ...parsedState.metadata }
         }));
      }

      const savedMode = localStorage.getItem('progen_api_mode');
      if (savedMode) setApiKeyMode(savedMode);

      const savedKeysText = localStorage.getItem('progen_api_keys_text');
      if (savedKeysText) {
        setApiKeysText(savedKeysText);
      } else {
        const oldKeys = localStorage.getItem('progen_api_keys');
        if (oldKeys) {
           const parsed = JSON.parse(oldKeys);
           if(Array.isArray(parsed)) {
              setApiKeysText(parsed.map(k => k.value).filter(Boolean).join('\n'));
           }
        } else {
           setApiKeysText('AQ.Ab8RN6Kcw-WNfnFII38yBPNHsfidY2cIK05X-gp5Io-WJ0xpog');
        }
      }
      
      const savedModel = localStorage.getItem('progen_model');
      if (savedModel && GEMINI_MODELS.find(m => m.id === savedModel)) {
        setActiveModel(savedModel);
      } else {
        setActiveModel(GEMINI_MODELS[0].id);
      }

      const savedHistory = localStorage.getItem('progen_history');
      if (savedHistory) setPromptHistory(JSON.parse(savedHistory));
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('progen_api_keys_text', apiKeysText);
    localStorage.setItem('progen_model', activeModel);
    localStorage.setItem('progen_api_mode', apiKeyMode);
    localStorage.setItem('progen_history', JSON.stringify(promptHistory));
    localStorage.setItem('progen_theme', currentTheme);
  }, [apiKeysText, activeModel, apiKeyMode, promptHistory, currentTheme]);

  useEffect(() => {
    localStorage.setItem('progen_media_type', mediaType);
    try {
       localStorage.setItem('progen_tab_state', JSON.stringify(tabState));
    } catch (e) {
       const safeState = {
          image: { ...tabState.image, mediaFiles: [] },
          video: { ...tabState.video, mediaFiles: [] },
          metadata: { ...tabState.metadata, mediaFiles: [] }
       };
       localStorage.setItem('progen_tab_state', JSON.stringify(safeState));
    }
  }, [tabState, mediaType]);

  const showConfirm = (message, onConfirmCallback) => {
    setConfirmDialog({ isOpen: true, message, onConfirm: onConfirmCallback });
  };

  const handleReset = () => {
    showConfirm('Yakin ingin mereset semua pengaturan di tab ini?', () => {
      setTabState(prev => ({
        ...prev,
        [mediaType]: getInitialTabState() 
      }));
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (txtInputRef.current) txtInputRef.current.value = '';
    });
  };

  const handleTxtUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      updateData('referenceText', text, 'metadata');
      if (txtInputRef.current) txtInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFiles = await Promise.all(files.map(file => {
        return new Promise((resolve) => {
          const type = file.type.startsWith('video') ? 'video' : 'image';
          
          if (type === 'video') {
            const video = document.createElement('video');
            const fileUrl = URL.createObjectURL(file);
            video.src = fileUrl;
            video.muted = true;
            video.playsInline = true;

            video.addEventListener('loadeddata', () => {
              video.currentTime = 0.1;
            });

            video.addEventListener('seeked', () => {
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnailData = canvas.toDataURL('image/jpeg', 0.8);
              URL.revokeObjectURL(fileUrl);
              
              resolve({ 
                data: thumbnailData, 
                type: 'video', 
                mimeType: 'image/jpeg',
                id: Date.now() + Math.random(),
                filename: file.name
              });
            });

            video.addEventListener('error', () => {
              URL.revokeObjectURL(fileUrl);
              resolve(null);
            });
          } else {
            const reader = new FileReader();
            reader.onload = (event) => {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX_DIM = 1024; // Kompresi ukuran max 1024px

                if (width > height && width > MAX_DIM) {
                  height = Math.round((height * MAX_DIM) / width);
                  width = MAX_DIM;
                } else if (height > MAX_DIM) {
                  width = Math.round((width * MAX_DIM) / height);
                  height = MAX_DIM;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Konversi ke JPEG terkompresi (80% quality) untuk mencegah payload terlalu besar (hang/error)
                const compressedData = canvas.toDataURL('image/jpeg', 0.8);
                resolve({ 
                  data: compressedData, 
                  type: 'image', 
                  mimeType: 'image/jpeg',
                  id: Date.now() + Math.random(),
                  filename: file.name
                });
              };
              img.src = event.target.result;
            };
            reader.readAsDataURL(file);
          }
        });
      }));
      updateData('mediaFiles', prev => [...prev, ...newFiles.filter(Boolean)]);
      updateData('resumeIndex', 0);
    }
  };

  const handlePaste = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (inputMode === 'category' && mediaType !== 'metadata') return;

    const items = e.clipboardData?.items;
    if (!items) return;

    const files = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1 || items[i].type.indexOf('video') !== -1) {
        files.push(items[i].getAsFile());
      }
    }

    if (files.length > 0) {
      e.preventDefault();
      handleFileUpload({ target: { files } });
    }
  };

  const handleManualPaste = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const clipboardItems = await navigator.clipboard.read();
        const files = [];
        for (const item of clipboardItems) {
          const validTypes = item.types.filter(type => type.startsWith('image/') || type.startsWith('video/'));
          for (const type of validTypes) {
            const blob = await item.getType(type);
            const file = new File([blob], `pasted-media-${Date.now()}.${type.split('/')[1]}`, { type });
            files.push(file);
          }
        }
        
        if (files.length > 0) {
          handleFileUpload({ target: { files } });
          return;
        }
      }
      throw new Error("Clipboard kosong atau format tidak didukung.");
      
    } catch (err) {
      console.warn("Clipboard API diblokir oleh keamanan browser. Beralih ke mode manual (Ctrl+V).");
      setPasteHint(true);
      setTimeout(() => setPasteHint(false), 3000);
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const checkKeys = async () => {
    setKeyCheckInProgress(true);
    const keys = apiKeysText.split('\n').map(k => k.trim()).filter(k => k !== '');
    
    if (keys.length === 0) {
      setKeyStatuses([{ key: "API Bawaan Sistem (Default)", status: 'active' }]);
      setKeyCheckInProgress(false);
      return;
    }

    const newStatuses = [];
    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];
      newStatuses.push({ key: currentKey, status: 'checking' });
      setKeyStatuses([...newStatuses]); 

      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${currentKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "hi" }] }] })
        });
        
        if (res.ok) {
          newStatuses[i].status = 'active';
        } else if (res.status === 429) {
          newStatuses[i].status = 'limit';
        } else {
          newStatuses[i].status = 'error';
        }
      } catch (e) {
        newStatuses[i].status = 'error';
      }
      setKeyStatuses([...newStatuses]); 
    }
    setKeyCheckInProgress(false);
  };

  const handleGenerate = async () => {
    if ((mediaType !== 'metadata' && ((inputMode === 'keyword' && !keyword.trim() && mediaFiles.length === 0) || (inputMode === 'category' && category === 'none'))) || 
        (mediaType === 'metadata' && mediaFiles.length === 0)) return;
    
    let validKeys = [];
    if (apiKeyMode === 'canvas') {
        validKeys = ["AQ.Ab8RN6Kcw-WNfnFII38yBPNHsfidY2cIK05X-gp5Io-WJ0xpog"];
    } else {
        validKeys = apiKeysText.split('\n').map(k => k.trim()).filter(k => k !== '');
        if (validKeys.length === 0) {
            validKeys = ["AQ.Ab8RN6Kcw-WNfnFII38yBPNHsfidY2cIK05X-gp5Io-WJ0xpog"];
        }
    }

    const activeTab = mediaType;
    setIsLoading(true);
    
    const startIndex = tabState[activeTab].resumeIndex || 0;
    if (startIndex === 0) {
        updateData('results', [], activeTab);
        updateData('progress', 0, activeTab);
    }
    updateData('progressStatus', 'starting', activeTab);

    let finalPrefix = "";
    if (activeTab === 'image') {
       if (prefix === '/imagine') finalPrefix = "/imagine prompt: ";
       else if (prefix === 'custom') finalPrefix = customPrefix + " ";
    }
    const fParameter = activeTab === 'image' && parameter.trim() ? " " + parameter.trim() : "";
    const fNegative = activeTab === 'image' && negativeWords.trim() ? " --no " + negativeWords.trim() : "";
    const fAR = aspectRatio === 'none' ? '' : `--ar ${aspectRatio === 'custom' ? customAR : aspectRatio}`;
    let fIsolated = "";
    if (activeTab === 'image' && isolatedBg !== 'none') {
        if (isolatedBg === 'white') fIsolated = "isolated on white background";
        else if (isolatedBg === 'black') fIsolated = "isolated on black background";
        else if (isolatedBg === 'green') fIsolated = "neon green screen";
        else if (isolatedBg === 'custom') fIsolated = customIsolatedBg;
    }
    
    let complexityInstruction = "";
    if (activeTab === 'video') {
       complexityInstruction = "Generate VERY DETAILED, ANALYTICAL, and CINEMATIC video prompts. Focus on camera movement, lens choice, lighting, and movement dynamics.";
    } else if (activeTab === 'image') {
        if (complexity === 'lite') complexityInstruction = "Create SHORT and concise prompts (under 15 words).";
        else if (complexity === 'medium') complexityInstruction = "Create DESCRIPTIVE prompts (30-50 words).";
        else complexityInstruction = "Create VERY DETAILED and COMPREHENSIVE prompts (80+ words).";
    }

    let typeInstruction = "";
    if (activeTab === 'image') {
        if (imageType === 'png') {
            typeInstruction = "IMAGE TYPE CRITERIA: Generate prompts for STANDALONE objects/subjects suitable for cutouts. You MUST naturally weave in keywords like 'isolated on solid white background', 'clean edges', 'die-cut', 'stock cutout', or 'transparent background style'. Avoid complex environments. ABSOLUTELY NO SHADOWS, drop shadows, cast shadows, or reflections allowed.";
        } else if (imageType === 'vector') {
            typeInstruction = "IMAGE TYPE CRITERIA: Generate prompts STRICTLY for 2D vector illustrations. You MUST naturally weave in keywords like 'flat vector design', '2D illustration', 'SVG style', 'minimalist graphic', 'solid colors', 'clipart'. PROHIBIT any photorealistic, 3D, or photographic terms.";
        } else {
            typeInstruction = "IMAGE TYPE CRITERIA: Generate prompts for high-quality stock photography, 3D renders, or detailed digital art. Focus on dynamic lighting, realistic textures, camera angles, and rich composition.";
        }
    }

    let baseStyleInstruction = "";
    if (designStyle !== 'none' && activeTab !== 'metadata') {
        baseStyleInstruction = `\nCRUCIAL STYLE REQUIREMENT: The output MUST heavily emphasize the '${designStyle}' visual style, incorporating relevant aesthetic keywords natively into the prompt.`;
    }

    let baseFaceInstruction = "";
    if (activeTab !== 'metadata') {
        if (faceOption === 'with-face') {
            baseFaceInstruction = "SUBJECT CRITERIA: If people/characters are in the prompt, they MUST have clear, visible, and expressive faces. Emphasize facial features.";
        } else if (faceOption === 'no-face') {
            baseFaceInstruction = "SUBJECT CRITERIA: If people/characters are in the prompt, they MUST be completely FACELESS. Use terms like 'back view', 'turned away', 'unrecognizable', 'face hidden', 'silhouette', or 'cropped above shoulders'. STRICTLY prohibit visible faces or eye contact.";
        }
    }

    const targetFiles = mediaFiles.length > 0 ? mediaFiles : [null];
    const batchesPerFile = activeTab === 'metadata' ? 1 : Math.ceil(numPrompts / BATCH_SIZE);
    const totalOverallBatches = targetFiles.length * batchesPerFile; 
    let currentTotalBatch = startIndex * batchesPerFile;
    let isSystemFailed = false;
    let activeKeyIndex = currentKeyIndex >= validKeys.length ? 0 : currentKeyIndex;

    for (let fIndex = startIndex; fIndex < targetFiles.length; fIndex++) {
        if (isSystemFailed) break;
        const currentFile = targetFiles[fIndex];

        for (let bIndex = 0; bIndex < batchesPerFile; bIndex++) {
            if (isSystemFailed) break;

            currentTotalBatch++;
            updateData('batchInfo', { current: currentTotalBatch, total: totalOverallBatches }, activeTab);
            updateData('progressStatus', 'generating', activeTab);
            
            const promptsRemaining = numPrompts - (bIndex * BATCH_SIZE);
            const currentBatchSize = Math.min(promptsRemaining, BATCH_SIZE);

            let finalInputWord = inputMode === 'category' ? category : keyword;
            if (inputMode === 'category' && category === 'Random' && activeTab !== 'metadata') {
                const list = (activeTab === 'video' ? VIDEO_CATEGORIES : IMAGE_CATEGORIES).filter(c => c !== 'Random');
                finalInputWord = list[Math.floor(Math.random() * list.length)];
            }

            let currentTypeInstruction = typeInstruction;
            let currentFaceInstruction = baseFaceInstruction;
            let currentStyleInstruction = baseStyleInstruction;
            let currentInputText = `Input: ${finalInputWord}.`;

            let referenceContext = "";
            if (activeTab === 'metadata' && tabState.metadata.referenceText?.trim()) {
                referenceContext = `\n\nADDITIONAL CONTEXT / REFERENCE PROMPTS:\n${tabState.metadata.referenceText.trim()}\n\nPlease align the generated metadata with the concepts, style, and keywords found in the reference text above, while ensuring it accurately describes the uploaded image.`;
            }

            if (activeTab === 'metadata') {
                currentTypeInstruction = "";
                currentFaceInstruction = "";
                currentStyleInstruction = "";
                currentInputText = `Act as an Adobe Stock SEO expert. Generate metadata for this image in English.
Format exactly as follows:
Title: [1 short descriptive sentence, max 200 chars]
Keywords: [Exactly 49 comma-separated keywords, ordered by relevance]
Category: [Choose one number from 1 to 21 based on the subject]${referenceContext}`;
            } else if (currentFile) {
                currentTypeInstruction = "VISION MODE INSTRUCTION: Meticulously analyze the attached media file. Generate a highly descriptive prompt that captures the exact subjects, colors, lighting, actions, and overall composition visible in the media. Do NOT invent elements that are not present.";
                currentFaceInstruction = ""; 
                currentStyleInstruction = ""; 
                currentInputText = "Analyze this attached media carefully and generate a highly accurate descriptive prompt based strictly on its contents.";
            }

            let systemPrompt = "";
            if (activeTab === 'metadata') {
                systemPrompt = `You are a professional Adobe Stock SEO and Metadata expert. Always follow the requested format strictly in English.`;
            } else if (activeTab === 'video' && videoMode === 'json') {
                systemPrompt = `You are a Smart AI Video Prompt Architect. 
                Generate EXACTLY ${currentBatchSize} prompts in JSON format.
                ALL OUTPUT MUST BE IN ENGLISH.
                Each result MUST be a valid JSON object string.
                Format: {"scene": "...", "camera": "...", "lighting": "...", "technical": "...", "full_prompt": "PROMPT_CONTENT ${fAR}"}
                Separate objects with "|||". Return raw text only.
                ${complexityInstruction}
                ${currentFaceInstruction}
                ${currentTypeInstruction}`;
            } else {
                systemPrompt = `You are a top-tier Microstock AI Prompt Architect for ${activeTab.toUpperCase()}.
                Generate EXACTLY ${currentBatchSize} unique prompts.
                ALL OUTPUT MUST BE IN ENGLISH.
                Format: "${finalPrefix}PROMPT_CONTENT${fIsolated ? ', ' + fIsolated : ''}${fParameter}${fNegative}${fAR ? ' ' + fAR : ''}"
                Separate prompts with "|||".
                ${complexityInstruction}
                ${currentTypeInstruction}
                ${currentFaceInstruction}
                ${currentStyleInstruction}`;
            }

            const userParts = [{ text: currentInputText }];
            if (currentFile) {
                userParts.push({ inlineData: { mimeType: currentFile.mimeType || (currentFile.type === 'video' ? "video/mp4" : "image/jpeg"), data: currentFile.data.split(',')[1] } });
            }

            let currentBatchSuccess = false;
            let attempts = 0;
            const maxRetries = 5;

            while (!currentBatchSuccess && attempts < validKeys.length) {
                const currentApiKey = validKeys[activeKeyIndex];
                const requestModel = (currentApiKey === "" || currentApiKey === "AQ.Ab8RN6Kcw-WNfnFII38yBPNHsfidY2cIK05X-gp5Io-WJ0xpog") ? "gemini-3-flash-preview" : activeModel;
                
                let retryCount = 0;
                let successOnThisKey = false;
                let lastApiError = null;

                while (!successOnThisKey && retryCount <= maxRetries) {
                    try {
                        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${requestModel}:generateContent?key=${currentApiKey}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                contents: [{ role: "user", parts: userParts }],
                                systemInstruction: { parts: [{ text: systemPrompt }] }
                            })
                        });
                        
                        if (!response.ok) {
                            if (response.status === 429) {
                                throw new Error("RATE_LIMIT_OR_SERVER_ERROR");
                            }
                            
                            let errorMessage = response.statusText;
                            try {
                                const errData = await response.json();
                                errorMessage = errData?.error?.message || response.statusText;
                            } catch (parseErr) {}
                            
                            if (response.status >= 500) {
                                if (errorMessage.toLowerCase().includes("something went wrong") && currentFile?.type === 'video') {
                                    throw new Error(`API_ERROR: Gagal memproses video. Resolusi terlalu besar.`);
                                }
                                throw new Error("RATE_LIMIT_OR_SERVER_ERROR");
                            }
                            throw new Error(`API_ERROR: HTTP ${response.status} - ${errorMessage}`);
                        }
                        
                        const data = await response.json();
                        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                        
                        let finalPrompts = [];
                        if (activeTab === 'metadata') {
                            const titleMatch = rawText.match(/Title:\s*(.*)/i);
                            const keywordsMatch = rawText.match(/Keywords:\s*(.*)/i) || rawText.match(/Kata Kunci:\s*(.*)/i);
                            const categoryMatch = rawText.match(/Category:\s*(\d+)/i) || rawText.match(/Kategori:\s*(\d+)/i);
                            
                            const cleanText = (str) => str ? str.replace(/```text|```/g, '').trim() : '';
                            
                            finalPrompts = [{
                                filename: currentFile ? currentFile.filename : 'unknown.jpg',
                                title: titleMatch ? cleanText(titleMatch[1]).substring(0, 200) : 'Title not found',
                                keywords: keywordsMatch ? cleanText(keywordsMatch[1]) : cleanText(rawText),
                                category: categoryMatch ? parseInt(categoryMatch[1]) : 1,
                                releases: '',
                                imageData: currentFile ? currentFile.data : null
                            }];
                        } else {
                            const splitPrompts = rawText.split('|||').map(p => p.trim()).filter(p => p.length > 5);
                            finalPrompts = splitPrompts.length > 0 ? splitPrompts : [rawText];
                        }
                        
                        updateData('results', prev => [...prev, ...finalPrompts], activeTab);
                        
                        const timestamp = new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' });
                        setPromptHistory(prev => {
                            const newHistoryItems = finalPrompts.map(p => ({ 
                                text: typeof p === 'string' ? p : `Filename: ${p.filename}\nTitle: ${p.title}\nKeywords: ${p.keywords}\nCategory: ${p.category}`, 
                                timestamp, 
                                type: activeTab, 
                                id: Date.now() + Math.random() 
                            }));
                            return [...newHistoryItems, ...prev].slice(0, 200); 
                        });
                        
                        successOnThisKey = true;
                        currentBatchSuccess = true;
                        setCurrentKeyIndex(activeKeyIndex); 

                    } catch (err) {
                        if (err.message === "RATE_LIMIT_OR_SERVER_ERROR") {
                            if (retryCount < maxRetries) {
                                const backoffDelay = Math.pow(2, retryCount) * 1000;
                                await delay(backoffDelay);
                                retryCount++;
                            } else {
                                break; 
                            }
                        } else {
                            lastApiError = err.message; 
                            break; 
                        }
                    }
                }

                if (!currentBatchSuccess) {
                    attempts++;
                    activeKeyIndex = (activeKeyIndex + 1) % validKeys.length;
                    
                    if (lastApiError && lastApiError.startsWith("API_ERROR:")) {
                        updateData('results', prev => [...prev, `Gagal: ${lastApiError.replace('API_ERROR: ', '')}`], activeTab);
                        isSystemFailed = true;
                        break;
                    }
                }
            }

            if (!currentBatchSuccess && !isSystemFailed) {
                updateData('results', prev => [...prev, `[SISTEM JEDA] Error pada file ke-${fIndex + 1}: Rate Limit / Gagal memproses. Silakan ganti API Key atau tunggu beberapa saat, lalu klik RESUME untuk melanjutkan dari file ini.`], activeTab);
                updateData('resumeIndex', fIndex, activeTab);
                isSystemFailed = true;
                break;
            }

            const progressPercent = (currentTotalBatch / totalOverallBatches) * 100;
            updateData('progress', progressPercent, activeTab);

            if (currentTotalBatch < totalOverallBatches) {
                updateData('progressStatus', 'cooldown', activeTab);
                const cooldownTime = 2000 + Math.random() * 2000; 
                await delay(cooldownTime);
            }
        }
    }

    if (!isSystemFailed) {
        updateData('resumeIndex', 0, activeTab);
        updateData('progressStatus', 'complete', activeTab);
    }
    setIsLoading(false);
  };

  const copyPrompt = (text, index) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    document.body.removeChild(textArea);
  };

  const copyHistoryItem = (text, index) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    setCopiedHistoryIndex(index);
    setTimeout(() => setCopiedHistoryIndex(null), 2000);
    document.body.removeChild(textArea);
  };

  const updateResult = (index, field, value) => {
    setTabState(prev => {
        const currentTabState = prev[mediaType];
        const newResults = [...currentTabState.results];
        if (typeof newResults[index] === 'object') {
            newResults[index] = { ...newResults[index], [field]: value };
        }
        return { ...prev, [mediaType]: { ...currentTabState, results: newResults } };
    });
  };

  const exportCSV = () => {
    let csvContent = "Filename,Title,Keywords,Category,Releases\n";
    tabState.metadata.results.forEach(r => {
        const escapeCSV = (str) => {
            if (str === null || str === undefined) return '""';
            return `"${String(str).replace(/"/g, '""')}"`;
        };
        csvContent += `${escapeCSV(r.filename)},${escapeCSV(r.title)},${escapeCSV(r.keywords)},${r.category},${escapeCSV(r.releases)}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `AdobeStock_Metadata_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectClass = `w-full border rounded-lg p-2.5 text-xs font-bold outline-none appearance-none cursor-pointer text-current bg-transparent focus:ring-1 focus:ring-current/50 ${t.border}`;
  const inputClass = `w-full border rounded-lg p-3 text-sm outline-none transition-colors bg-transparent ${t.border} focus:border-current placeholder:opacity-30`;

  return (
    <div onPaste={handlePaste} className={`min-h-screen transition-colors duration-500 ${t.bg} ${t.text} p-4 sm:p-6 font-sans selection:bg-amber-500/30`}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        
        {/* HEADER */}
        <div className="lg:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-2 tracking-tighter">
              <Aperture className={currentTheme === 'light' ? 'text-blue-600' : 'text-amber-500'} size={32} /> 
              umedia
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className={`flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-lg ${t.border} ${t.panel} ${t.text}`}
              title={currentTheme === 'light' ? "Beralih ke Dark Mode" : "Beralih ke Light Mode"}
            >
              {currentTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={`flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-lg ${t.border} ${t.panel} ${t.text}`}
              title="API Settings"
            >
              <KeyRound size={16} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className={`border rounded-2xl p-6 space-y-6 shadow-xl shadow-black/10 transition-all duration-300 ${t.panel} ${t.border}`}>
            
            {/* Mode Toggle */}
            <div className={`flex p-1.5 rounded-xl border ${t.border} ${t.highlight}`}>
              <button onClick={() => setMediaType('image')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black tracking-widest transition-all ${mediaType === 'image' ? `${t.accent} text-white shadow-lg shadow-black/20` : t.textSec}`}>
                <ImageIcon size={14} /> IMAGE
              </button>
              <button onClick={() => setMediaType('video')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black tracking-widest transition-all ${mediaType === 'video' ? `${t.accent} text-white shadow-lg shadow-black/20` : t.textSec}`}>
                <VideoIcon size={14} /> VIDEO
              </button>
              <button onClick={() => setMediaType('metadata')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black tracking-widest transition-all ${mediaType === 'metadata' ? `${t.accent} text-white shadow-lg shadow-black/20` : t.textSec}`}>
                <Tags size={14} /> METADATA
              </button>
            </div>

            {/* Media Upload */}
            <div 
              className={`relative border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center transition-all group overflow-hidden ${t.border} ${(inputMode === 'category' && mediaType !== 'metadata') ? 'opacity-30 grayscale cursor-not-allowed' : 'cursor-pointer hover:border-current bg-black/5'}`}
              onClick={() => ((inputMode !== 'category' || mediaType === 'metadata') && mediaFiles.length === 0) ? fileInputRef.current.click() : null}
            >
              {mediaFiles.length > 0 ? (
                <div className="relative w-full h-full p-3 flex gap-3 overflow-x-auto custom-scrollbar items-center bg-black/5 backdrop-blur-md">
                  {mediaFiles.map((mf, idx) => (
                    <div key={mf.id} className="relative h-full aspect-square shrink-0 rounded-lg overflow-hidden border-2 border-current/20 shadow-md group/item">
                      <img src={mf.data} alt={`Ref ${idx}`} className="w-full h-full object-cover opacity-90" />
                      {mf.type === 'video' && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><VideoIcon size={20} className="text-white drop-shadow-md" /></div>}
                      <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors"></div>
                      <button onClick={(e) => { e.stopPropagation(); updateData('mediaFiles', prev => prev.filter(f => f.id !== mf.id)); updateData('resumeIndex', 0); }} className="absolute top-1.5 right-1.5 bg-red-500/90 p-1.5 rounded-full text-white shadow-lg z-10 hover:scale-110 hover:bg-red-500 transition-all"><X size={12} /></button>
                    </div>
                  ))}
                  <button onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }} className="h-full aspect-square shrink-0 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-current/30 hover:border-current/80 hover:bg-black/5 transition-all">
                    <Plus size={24} className="opacity-50"/>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-50 mt-2">Add</span>
                  </button>
                  <button onClick={handleManualPaste} className="h-full aspect-square shrink-0 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-current/30 hover:border-current/80 hover:bg-black/5 transition-all" title="Tekan Ctrl+V di keyboard">
                    <ClipboardPaste size={24} className={pasteHint ? "text-blue-500 animate-bounce" : "opacity-50"}/>
                    <span className={`text-[9px] font-black uppercase tracking-widest mt-2 ${pasteHint ? "text-blue-500" : "opacity-50"}`}>
                      {pasteHint ? "Ctrl+V" : "Paste"}
                    </span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); updateData('mediaFiles', []); updateData('resumeIndex', 0); }} 
                    className="absolute bottom-2 right-2 bg-red-500/90 backdrop-blur hover:bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg shadow-lg transition-all flex items-center gap-1.5 z-20 active:scale-95 border border-red-400"
                  >
                    <Trash2 size={12}/> Clear All
                  </button>
                </div>
              ) : (
                <div className="text-center p-4 w-full flex flex-col items-center justify-center">
                  <div className="flex items-center gap-4">
                    <button onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }} className={`flex flex-col items-center justify-center gap-2 w-24 h-20 rounded-xl border-2 border-transparent hover:border-current/20 hover:bg-black/5 transition-all ${t.textSec}`}>
                      <Upload size={28} className="opacity-60"/>
                      <span className="text-[9px] font-black uppercase tracking-widest">Browse</span>
                    </button>
                    <div className="w-px h-12 bg-current opacity-10"></div>
                    <button onClick={handleManualPaste} className={`flex flex-col items-center justify-center gap-2 w-24 h-20 rounded-xl border-2 border-transparent hover:border-current/20 hover:bg-black/5 transition-all ${t.textSec}`}>
                      <ClipboardPaste size={28} className={pasteHint ? "text-blue-500 animate-bounce" : "opacity-60"}/>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${pasteHint ? "text-blue-500" : ""}`}>
                        {pasteHint ? "Tekan Ctrl+V" : "Paste"}
                      </span>
                    </button>
                  </div>
                  <span className={`text-[8px] uppercase font-bold tracking-wider opacity-50 block mt-2`}>Image & Video Supported (Or Ctrl+V anywhere)</span>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept={mediaType === 'image' || mediaType === 'metadata' ? "image/*" : "video/*"} multiple onChange={handleFileUpload} disabled={inputMode === 'category' && mediaType !== 'metadata'} />
            </div>

            {/* Logical Conditional Inputs */}
            {mediaFiles.length === 0 ? (
              mediaType === 'metadata' ? (
                <div className={`p-5 rounded-2xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-2 animate-in zoom-in duration-300 ${t.highlight} ${t.border}`}>
                <FileText className={t.accent} size={28} />
                <span className={`text-xs font-black uppercase tracking-widest ${t.textSec}`}>CSV Metadata Generator</span>
                <span className={`text-[10px] font-medium opacity-70 ${t.textSec}`}>Unggah gambar Anda di atas. Sistem akan menganalisis tiap gambar dan membuatkan file CSV yang siap diupload ke Adobe Stock.</span>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {/* IMAGE TYPE TOGGLE */}
                  {mediaType === 'image' && (
                    <div className={`flex gap-1 p-1 rounded-lg border border-dashed border-opacity-30 border-current ${t.highlight}`}>
                       <button onClick={() => updateData('imageType', 'jpg')} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${imageType === 'jpg' ? `${t.accent} text-white shadow-md` : t.textSec} hover:bg-black/5`}><ImageIcon size={14}/> JPG (Photo)</button>
                       <button onClick={() => updateData('imageType', 'png')} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${imageType === 'png' ? `${t.accent} text-white shadow-md` : t.textSec} hover:bg-black/5`}><BoxSelect size={14}/> PNG (Cutout)</button>
                       <button onClick={() => updateData('imageType', 'vector')} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${imageType === 'vector' ? `${t.accent} text-white shadow-md` : t.textSec} hover:bg-black/5`}><Palette size={14}/> Vector (Art)</button>
                    </div>
                  )}

                  {/* INPUT MODE TOGGLE */}
                  <div className={`flex gap-1 p-1 rounded-lg border border-dashed border-opacity-30 border-current ${t.highlight}`}>
                     <button onClick={() => updateData('inputMode', 'keyword')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all ${inputMode === 'keyword' ? `${t.accent} text-white shadow-sm` : t.textSec}`}>By Keywords</button>
                     <button onClick={() => updateData('inputMode', 'category')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all ${inputMode === 'category' ? `${t.accent} text-white shadow-sm` : t.textSec}`}>By Category</button>
                  </div>

                  {inputMode === 'keyword' ? (
                    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                      <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest`}>Keywords</label>
                      <textarea 
                        value={keyword}
                        onChange={(e) => updateData('keyword', e.target.value)}
                        placeholder="Describe your idea manually..."
                        className={`${inputClass} h-20`}
                      />
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                      <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest flex items-center justify-between`}>
                        <span className="flex items-center gap-1"><CalendarDays size={12}/> Microstock Category</span>
                      </label>
                      <div className="relative">
                        <select value={category} onChange={(e) => updateData('category', e.target.value)} className={selectClass}>
                          <option value="none">-- Select Category --</option>
                          {(mediaType === 'image' ? IMAGE_CATEGORIES : VIDEO_CATEGORIES).map((cat, idx) => (
                            <option key={idx} value={cat} className="bg-neutral-800 text-white">{cat}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-3 pointer-events-none opacity-50">▼</div>
                      </div>
                    </div>
                  )}

                  {/* DYNAMIC STYLE & FACE OPTION */}
                  <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div>
                          <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest flex items-center gap-1`}>
                            <Palette size={12}/> Design Style
                          </label>
                          <div className="relative">
                            <select value={designStyle} onChange={(e) => updateData('designStyle', e.target.value)} className={selectClass}>
                              <option value="none">-- Default --</option>
                              {mediaType === 'image' 
                                ? DESIGN_STYLES.image[imageType].map((style, idx) => (
                                    <option key={`img-${idx}`} value={style} className="bg-neutral-800 text-white">{style}</option>
                                  ))
                                : DESIGN_STYLES.video.map((style, idx) => (
                                    <option key={`vid-${idx}`} value={style} className="bg-neutral-800 text-white">{style}</option>
                                  ))
                              }
                            </select>
                            <div className="absolute right-3 top-3 pointer-events-none opacity-50">▼</div>
                          </div>
                      </div>
                      <div>
                          <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest flex items-center gap-1`}>
                            {faceOption === 'no-face' ? <EyeOff size={12}/> : <Eye size={12}/>} Face Option
                          </label>
                          <div className={`flex gap-1 p-1 rounded-lg border border-dashed border-opacity-30 border-current ${t.highlight} h-[42px]`}>
                             <button onClick={() => updateData('faceOption', 'with-face')} className={`flex-1 text-[10px] font-bold uppercase rounded-md transition-all ${faceOption !== 'no-face' ? `${t.accent} text-white shadow-sm` : t.textSec}`}>ON</button>
                             <button onClick={() => updateData('faceOption', 'no-face')} className={`flex-1 text-[10px] font-bold uppercase rounded-md transition-all ${faceOption === 'no-face' ? `${t.accent} text-white shadow-sm` : t.textSec}`}>OFF</button>
                          </div>
                      </div>
                  </div>
                </div>
              )
            ) : (
              <div className={`p-5 rounded-2xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-2 animate-in zoom-in duration-300 ${t.highlight} ${t.border}`}>
                <Eye className={t.accent} size={28} />
                <span className={`text-xs font-black uppercase tracking-widest ${t.textSec}`}>AI Vision Mode Active</span>
                <span className={`text-[10px] font-medium opacity-70 ${t.textSec}`}>Sistem akan otomatis menganalisa objek langsung dari file visual yang Anda unggah.</span>
              </div>
            )}

            {/* NEW TXT IMPORT FOR METADATA */}
            {mediaType === 'metadata' && (
              <div className="space-y-2 pt-4 border-t border-dashed border-opacity-20 border-current animate-in fade-in slide-in-from-bottom-2">
                  <label className={`text-[10px] font-black ${t.textSec} uppercase block tracking-widest flex items-center justify-between`}>
                      <span className="flex items-center gap-1"><FileText size={12}/> Reference Prompts Context</span>
                      <button onClick={() => txtInputRef.current?.click()} className={`text-[9px] px-2 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 border ${t.border} transition-colors flex items-center gap-1 active:scale-95`}>
                          <Upload size={10} /> Import .txt
                      </button>
                  </label>
                  <textarea 
                      value={referenceText || ''}
                      onChange={(e) => updateData('referenceText', e.target.value)}
                      placeholder="Paste referensi prompt di sini atau import file .txt agar metadata yang dihasilkan lebih akurat dan relevan dengan ide Anda..."
                      className={`${inputClass} h-24 resize-y text-xs`}
                  />
                  <input type="file" accept=".txt" ref={txtInputRef} className="hidden" onChange={handleTxtUpload} />
              </div>
            )}

            {/* Detail & Isolated (Image only) */}
            {mediaType === 'image' && (
              <div className="space-y-4 pt-4 border-t border-dashed border-opacity-20 border-current">
                 <div className="grid grid-cols-1 gap-4">
                   <div>
                      <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest`}><Layers size={12} className="inline mr-1"/> Complexity</label>
                      <div className="grid grid-cols-3 gap-1">
                        {['lite', 'medium', 'details'].map((lvl) => (
                          <button key={lvl} onClick={() => updateData('complexity', lvl)} className={`py-2 rounded-lg text-[9px] font-bold uppercase transition-all border ${complexity === lvl ? `${t.accent} text-white border-transparent shadow-md` : `${t.border} ${t.textSec} hover:border-current`}`}>
                            {lvl}
                          </button>
                        ))}
                      </div>
                   </div>
                   <div>
                      <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest`}><XCircle size={12} className="inline mr-1"/> Negative Words</label>
                      <input 
                        type="text"
                        placeholder="e.g. ugly, blur, watermark..."
                        value={negativeWords}
                        onChange={(e) => updateData('negativeWords', e.target.value)}
                        className={inputClass}
                      />
                   </div>
                   <div>
                      <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest`}><BoxSelect size={12} className="inline mr-1"/> Isolated</label>
                      <div className="relative">
                        <select value={isolatedBg} onChange={(e) => updateData('isolatedBg', e.target.value)} className={selectClass}>
                          <option value="none" className="bg-neutral-800 text-white">Off</option>
                          <option value="white" className="bg-neutral-800 text-white">White</option>
                          <option value="black" className="bg-neutral-800 text-white">Black</option>
                          <option value="green" className="bg-neutral-800 text-white">Green</option>
                          <option value="custom" className="bg-neutral-800 text-white">Custom...</option>
                        </select>
                        <div className="absolute right-3 top-3 pointer-events-none opacity-50">▼</div>
                      </div>
                   </div>
                 </div>
                 {isolatedBg === 'custom' && (
                    <div className="animate-in fade-in slide-in-from-top-1">
                      <input 
                        placeholder="e.g. isolated on cybernetic background" 
                        value={customIsolatedBg} 
                        onChange={(e) => updateData('customIsolatedBg', e.target.value)} 
                        className={inputClass}
                      />
                    </div>
                 )}
              </div>
            )}

            {/* Configs (AR & Qty) */}
            {mediaType !== 'metadata' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className={`text-[9px] font-bold ${t.textSec} uppercase mb-1 block`}>Aspect Ratio</label>
                  <div className="relative">
                      <select value={aspectRatio} onChange={(e) => updateData('aspectRatio', e.target.value)} className={selectClass}>
                        <option value="none" className="bg-neutral-800 text-white">None</option>
                        <option value="1:1" className="bg-neutral-800 text-white">1:1</option><option value="16:9" className="bg-neutral-800 text-white">16:9</option><option value="9:16" className="bg-neutral-800 text-white">9:16</option><option value="custom" className="bg-neutral-800 text-white">Custom</option>
                      </select>
                      <div className="absolute right-3 top-3 pointer-events-none opacity-50">▼</div>
                  </div>
                  {aspectRatio === 'custom' && <input placeholder="e.g. 21:9" value={customAR} onChange={(e) => updateData('customAR', e.target.value)} className={`w-full mt-2 border rounded-lg p-2 text-xs bg-transparent ${t.border}`}/>}
                </div>
                <div>
                  <label className={`text-[9px] font-bold ${t.textSec} uppercase mb-1 block`}>Quantity</label>
                  <input type="number" min="1" max="10" value={numPrompts} onChange={(e) => updateData('numPrompts', parseInt(e.target.value)||1)} className={`w-full border rounded-lg p-2.5 text-xs font-bold bg-transparent text-current outline-none ${t.border}`}/>
                </div>
              </div>
            )}

            {mediaType === 'video' && (
              <div className={`flex gap-1 p-1 rounded-lg border border-dashed border-opacity-30 border-current ${t.highlight}`}>
                 <button onClick={() => updateData('videoMode', 'standard')} className={`flex-1 py-1.5 text-[9px] font-bold uppercase rounded ${videoMode === 'standard' ? `${t.accent} text-white` : t.textSec}`}>Standard Mode</button>
                 <button onClick={() => updateData('videoMode', 'json')} className={`flex-1 py-1.5 text-[9px] font-bold uppercase rounded ${videoMode === 'json' ? `${t.accent} text-white` : t.textSec}`}>Smart JSON</button>
              </div>
            )}

            {/* Prefix & Parameter */}
            {mediaType === 'image' && (
              <div className="space-y-4 pt-4 border-t border-dashed border-opacity-20 border-current animate-in fade-in slide-in-from-bottom-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest flex items-center gap-1`}><ChevronRight size={10}/> Prefix</label>
                    <div className="relative">
                      <select value={prefix} onChange={(e) => updateData('prefix', e.target.value)} className={selectClass}>
                        <option value="none" className="bg-neutral-800 text-white">None</option>
                        <option value="/imagine" className="bg-neutral-800 text-white">/imagine</option>
                        <option value="custom" className="bg-neutral-800 text-white">Custom</option>
                      </select>
                      <div className="absolute right-3 top-3 pointer-events-none opacity-50">▼</div>
                    </div>
                  </div>
                  <div>
                    <label className={`text-[10px] font-black ${t.textSec} uppercase mb-2 block tracking-widest flex items-center gap-1`}><Settings2 size={10}/> Parameter</label>
                    <input 
                      type="text"
                      placeholder="e.g. --v 6"
                      value={parameter}
                      onChange={(e) => updateData('parameter', e.target.value)}
                      className={`w-full border rounded-lg p-2.5 text-xs bg-transparent text-current outline-none placeholder:opacity-30 ${t.border}`}
                    />
                  </div>
                </div>
                {prefix === 'custom' && (
                   <input 
                     placeholder="Enter custom prefix text..." 
                     value={customPrefix} 
                     onChange={(e) => updateData('customPrefix', e.target.value)} 
                     className={`w-full border rounded-lg p-2.5 text-xs bg-transparent ${t.border}`}
                   />
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button 
                onClick={handleGenerate}
                disabled={isLoading || (mediaType !== 'metadata' && ((inputMode === 'keyword' && !keyword.trim() && mediaFiles.length === 0) || (inputMode === 'category' && category === 'none'))) || (mediaType === 'metadata' && mediaFiles.length === 0)}
                className={`flex-[2] ${t.accent} ${t.accentHover} disabled:opacity-50 text-white font-black tracking-wide py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 border-b-4 border-black/20`}
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} fill="currentColor" />}
                {(mediaFiles.length > 1 && resumeIndex > 0) ? `RESUME (${resumeIndex + 1}/${mediaFiles.length})` : 'GENERATE'}
              </button>
              <button onClick={handleReset} className={`flex-1 border font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${t.border} hover:bg-black/5`}><RotateCcw size={20} /></button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-4 max-h-[85vh]">
          
          {/* SMART PROGRESS BAR (REALTIME ANIMATED) */}
          {(isLoading || results.length > 0) && (
            <div className={`relative w-full h-10 rounded-xl overflow-hidden border ${t.border} bg-black/10 backdrop-blur-sm flex items-center shadow-inner`}>
                <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${t.progress}`} 
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
                <div className="relative z-10 flex items-center justify-between w-full px-4 text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                        {progressStatus === 'generating' && <><Activity size={12} className="animate-spin" /> PRODUCING BATCH {batchInfo.current}/{batchInfo.total}</>}
                        {progressStatus === 'cooldown' && <><Hourglass size={12} className="animate-bounce" /> SAFE COOLDOWN MODE...</>}
                        {progressStatus === 'complete' && <><Check size={12} /> COMPLETE</>}
                    </span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
          )}

          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2"><Type size={18}/> Result Canvas</h2>
            {results.length > 0 && (
              mediaType === 'metadata' ? (
                <button onClick={exportCSV} className={`text-xs font-bold bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg active:scale-95 transition-colors`}>
                  <Download size={14} /> Download CSV
                </button>
              ) : (
                <button onClick={() => {
                  const allText = results.map(r => r).join('\n\n---\n\n');
                  const element = document.createElement("a");
                  const file = new Blob([allText], {type: 'text/plain'});
                  element.href = URL.createObjectURL(file);
                  element.download = `PROMPTGEN_v1.3.00_${Date.now()}.txt`;
                  element.click();
                }} className={`text-xs font-bold ${t.accent} text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg active:scale-95`}>
                  <Download size={14} /> Export .txt
                </button>
              )
            )}
          </div>
          
          <div className={`flex-grow border rounded-2xl flex flex-col overflow-hidden shadow-xl shadow-black/10 transition-all duration-300 ${t.panel} ${t.border}`}>
            <div className="flex-grow overflow-y-auto p-6 custom-scrollbar space-y-4">
              {results.length > 0 ? (
                results.map((prompt, idx) => (
                  typeof prompt === 'object' ? (
                     <div key={idx} className={`relative flex flex-col sm:flex-row gap-5 p-5 rounded-xl border transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 ${t.border} bg-gradient-to-br from-transparent to-black/5 shadow-sm`}>
                        <div className="w-full sm:w-1/3 md:w-1/4 flex flex-col gap-3">
                           {prompt.imageData && (
                               <img src={prompt.imageData} alt={prompt.filename} className={`w-full aspect-square object-cover rounded-lg border ${t.border} shadow-sm bg-black/10`} />
                           )}
                           <div>
                               <label className={`text-[9px] font-black uppercase tracking-widest mb-1 block ${t.textSec}`}>Filename</label>
                               <input value={prompt.filename} onChange={(e) => updateResult(idx, 'filename', e.target.value)} className={`${inputClass} !p-2 !text-xs bg-black/5`} />
                           </div>
                        </div>
                        <div className="w-full sm:w-2/3 md:w-3/4 space-y-3">
                            <div>
                                <label className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-between mb-1 ${t.textSec}`}>
                                    Title (Max 200 chars)
                                    <span className={`text-[9px] ${prompt.title.length > 200 ? 'text-red-500' : 'opacity-50'}`}>{prompt.title.length}/200</span>
                                </label>
                                <input value={prompt.title} onChange={(e) => updateResult(idx, 'title', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-between mb-1 ${t.textSec}`}>
                                    Keywords (49 SEO Optimized)
                                    <span className={`text-[9px] opacity-50`}>{prompt.keywords.split(',').length} KWs</span>
                                </label>
                                <textarea value={prompt.keywords} onChange={(e) => updateResult(idx, 'keywords', e.target.value)} rows={4} className={`${inputClass} resize-none`} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${t.textSec}`}>Category (1-21)</label>
                                    <input type="number" min="1" max="21" value={prompt.category} onChange={(e) => updateResult(idx, 'category', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${t.textSec}`}>Releases</label>
                                    <input disabled value={prompt.releases} placeholder="No Releases" className={`${inputClass} opacity-40 bg-black/5 cursor-not-allowed`} />
                                </div>
                            </div>
                        </div>
                     </div>
                  ) : (
                    <div key={idx} className={`relative group p-6 rounded-xl border transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 ${t.border} hover:border-current bg-gradient-to-br from-transparent to-black/5 shadow-sm`}>
                      <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words opacity-90 pr-8">
                        {prompt}
                      </pre>
                      <div className="absolute top-3 right-3 flex gap-2">
                         <span className={`text-[10px] font-bold opacity-30 select-none mt-1`}>#{idx+1}</span>
                         <button onClick={() => copyPrompt(prompt, idx)} className={`p-1.5 rounded-md transition-all ${copiedIndex === idx ? 'bg-green-500 text-white' : `${t.bg} hover:scale-110 shadow-sm opacity-0 group-hover:opacity-100`}`}>
                           {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                         </button>
                      </div>
                    </div>
                  )
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center select-none py-20">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin" size={48}/>
                        <p className="max-w-xs text-xs font-black uppercase tracking-[0.2em] animate-pulse">Initializing Core...</p>
                    </div>
                  ) : (
                    <>
                        <Grid size={64} className="mb-4" />
                        <p className="max-w-xs text-xs font-black uppercase tracking-[0.2em]">Ready Signal • Awaiting Input</p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className={`p-4 border-t flex gap-4 bg-black/5 backdrop-blur-sm ${t.border}`}>
              <button 
                onClick={() => {
                  if (mediaType === 'metadata') {
                     exportCSV();
                  } else {
                     const allText = results.map(r => r).join('\n\n---\n\n');
                     copyPrompt(allText, 'all');
                  }
                }}
                disabled={results.length === 0}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all active:scale-[0.98] ${mediaType === 'metadata' ? 'bg-[#25D366] text-white hover:bg-[#128C7E] border-transparent' : 'bg-white border border-slate-300 text-slate-900 hover:bg-slate-50'} disabled:opacity-50 shadow-sm`}
              >
                {mediaType === 'metadata' ? (
                   <><Download size={16} /> Download Adobe Stock CSV</>
                ) : (
                   <>{copiedIndex === 'all' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />} Salin Semua ke Clipboard</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* HISTORY PANEL */}
        <div className="lg:col-span-12 mt-6 mb-10 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-1">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2"><History size={18}/> Prompt History</h2>
              {promptHistory.length > 0 && (
                 <div className="flex flex-wrap items-center gap-2">
                   <button onClick={() => copyHistoryItem(promptHistory.map(h => h.text).join('\n\n'), 'all')} className={`text-xs font-bold bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm active:scale-95 transition-colors`}>
                      {copiedHistoryIndex === 'all' ? <Check size={14}/> : <Copy size={14} />} Copy All
                   </button>
                   <button onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob([promptHistory.map(h => h.text).join('\n\n')], {type: 'text/plain'});
                      element.href = URL.createObjectURL(file);
                      element.download = `HISTORY_PROMPTGEN_${Date.now()}.txt`;
                      element.click();
                   }} className={`text-xs font-bold ${t.accent} text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm active:scale-95`}>
                      <Download size={14} /> Export
                   </button>
                   <button onClick={() => showConfirm('Yakin ingin menghapus seluruh riwayat prompt?', () => setPromptHistory([]))} className={`text-xs font-bold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm active:scale-95 transition-all`}>
                      <Trash2 size={14} /> Clear
                   </button>
                 </div>
              )}
            </div>
            
            <div className={`border rounded-2xl flex flex-col overflow-hidden shadow-xl shadow-black/10 transition-all duration-300 ${t.panel} ${t.border}`}>
               {promptHistory.length > 0 ? (
                  <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                     {promptHistory.map((item, idx) => (
                        <div key={item.id || idx} className={`relative group p-5 rounded-xl border transition-all ${t.border} hover:border-current bg-gradient-to-br from-transparent to-black/5 shadow-sm`}>
                           <div className="flex items-center gap-2 mb-3">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.type === 'image' ? 'bg-blue-500/10 text-blue-500' : item.type === 'video' ? 'bg-purple-500/10 text-purple-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                {item.type}
                              </span>
                              <span className={`text-[10px] font-bold flex items-center gap-1 ${t.textSec}`}><Clock size={10}/> {item.timestamp}</span>
                           </div>
                           <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words opacity-90 pr-12">
                             {item.text}
                           </pre>
                           <div className="absolute top-4 right-4">
                             <button onClick={() => copyHistoryItem(item.text, idx)} className={`p-2 rounded-lg transition-all ${copiedHistoryIndex === idx ? 'bg-green-500 text-white' : `${t.bg} border ${t.border} hover:scale-110 shadow-md opacity-0 group-hover:opacity-100`}`}>
                               {copiedHistoryIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                             </button>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center py-20 opacity-30 select-none">
                     <History size={64} className="mb-4" />
                     <p className="text-xs font-black uppercase tracking-[0.2em]">Belum Ada Riwayat</p>
                  </div>
               )}
            </div>
        </div>
      </div>

      {/* SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl border flex flex-col overflow-hidden ${t.panel} ${t.border}`}>
            {/* Modal Header */}
            <div className={`p-6 border-b flex justify-between items-center ${t.border}`}>
              <h3 className={`text-xl font-black flex items-center gap-2 tracking-tight ${t.text}`}>
                <Settings2 className={t.textSec} size={24} /> API Settings
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className={`p-2 rounded-full hover:bg-black/10 transition-colors ${t.textSec}`}>
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar space-y-6">
              
              {/* Model Selection */}
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${t.textSec}`}>
                  <Server size={14} /> AI Model Selection
                </label>
                <div className="relative">
                  <select 
                    value={activeModel}
                    onChange={(e) => setActiveModel(e.target.value)}
                    className={selectClass}
                  >
                    {GEMINI_MODELS.map(model => (
                      <option key={model.id} value={model.id} className="bg-neutral-800 text-white">
                        {model.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none opacity-50">▼</div>
                </div>
              </div>

              {/* API Mode Selection */}
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${t.textSec}`}>
                  <ShieldCheck size={14} /> Sumber API
                </label>
                <div className={`flex gap-2 p-1.5 rounded-xl border ${t.border} ${t.highlight}`}>
                  <button 
                    onClick={() => setApiKeyMode('canvas')} 
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${apiKeyMode === 'canvas' ? `${t.accent} text-white shadow-md` : t.textSec}`}
                  >
                    API Bawaan Canvas (Default)
                  </button>
                  <button 
                    onClick={() => setApiKeyMode('manual')} 
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${apiKeyMode === 'manual' ? `${t.accent} text-white shadow-md` : t.textSec}`}
                  >
                    API Key Manual
                  </button>
                </div>
              </div>

              {/* API Keys Config */}
              <div className={`space-y-3 transition-opacity duration-300 ${apiKeyMode === 'canvas' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
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

      {/* CONFIRMATION MODAL */}
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
