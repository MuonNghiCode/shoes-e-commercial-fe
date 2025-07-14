// Lucide React Icons - Centralized Management
export {
  // Dashboard & Analytics
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,

  // Users & People
  Users,
  User,
  UserPlus,
  UserMinus,
  UserCheck,

  // Products & Shopping
  Package,
  Package2,
  ShoppingBag,
  ShoppingCart,
  Star,
  Heart,

  // Orders & Commerce
  ClipboardList,
  Receipt,
  CreditCard,
  DollarSign,
  Banknote,

  // Navigation & UI
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Home,

  // Actions
  Plus,
  Minus,
  Edit,
  Edit2,
  Edit3,
  Trash2,
  Search,
  Filter,
  Save,
  Download,
  Upload,
  Copy,
  RefreshCw,

  // Status & Feedback
  Check,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  Eye,
  EyeOff,

  // Settings & System
  Settings,
  Cog,
  Bell,
  Lock,
  Unlock,
  Shield,

  // Business & Store
  Store,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,

  // Time & Calendar
  Calendar,
  Clock,
  Timer,

  // Files & Data
  FileText,
  Folder,
  Database,
  Archive,
} from "lucide-react";

// Custom icon types for TypeScript
export type IconType = React.ComponentType<
  React.SVGProps<SVGSVGElement> & {
    size?: number | string;
    color?: string;
  }
>;

// Icon size presets
export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

// Icon color presets based on sneako theme
export const IconColors = {
  primary: "var(--sneako-dark)",
  secondary: "var(--sneako-gold)",
  accent: "var(--sneako-beige)",
  muted: "#6b7280",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
} as const;
