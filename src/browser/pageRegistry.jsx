import AdminHub from "../screens/AdminHub.jsx";
import LearnerHub from "../screens/LearnerHub.jsx";
import ServiceDashboard from "../screens/ServiceDashboard.jsx";
import LearnerDashboard from "../screens/LearnerDashboard.jsx";
import PlatformSettings from "../screens/PlatformSettings.jsx";
import ParchmentCredentials from "../screens/ParchmentCredentials.jsx";

/**
 * Maps a tab `kind` to the page component that renders inside the tab.
 */
export function renderPage(tab) {
  switch (tab.kind) {
    case "adminHub":
      return <AdminHub />;
    case "learnerHub":
      return <LearnerHub />;
    case "service":
      return <ServiceDashboard serviceId={tab.params?.serviceId} />;
    case "learnerDashboard":
      return <LearnerDashboard params={tab.params} />;
    case "platformSettings":
      return <PlatformSettings />;
    case "parchmentCredentials":
      return <ParchmentCredentials />;
    default:
      return null;
  }
}
