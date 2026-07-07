import {
  FileText,
  Award,
  Users,
  CloudDownload,
  LayoutDashboard,
  FileStack,
  User,
  Settings,
} from "lucide-react";

/** Maps service/nav icon keys to Lucide components. */
export const ICONS = {
  "file-text": FileText,
  award: Award,
  users: Users,
  "cloud-download": CloudDownload,
  "layout-dashboard": LayoutDashboard,
  "file-stack": FileStack,
  user: User,
  settings: Settings,
};

export function iconFor(key) {
  return ICONS[key] ?? FileText;
}
