import { Shrink } from "lucide-react";
import GlobalNav from "../components/GlobalNav.jsx";
import Button from "../components/Button.jsx";
import IconButton from "../components/IconButton.jsx";
import Tabs from "../components/Tabs.jsx";
import Card from "../components/Card.jsx";
import "./HubPage.css";

/**
 * Desktop wrapper (beta) — page shell.
 * Recreated from Figma node 316:127191. Content is placeholder, per the
 * reference: this frame defines the overall page layout/wrapper structure.
 */
export default function HubPage() {
  const tabs = [
    {
      id: "tab-1",
      label: "Tab item",
      content: <Card title="Content area" description="Short card description" />,
    },
    {
      id: "tab-2",
      label: "Tab item",
      content: <Card title="Content area" description="Short card description" />,
    },
  ];

  return (
    <div className="wrapper">
      <GlobalNav />

      <main className="wrapper__container">
        <div className="wrapper__content">
          <div className="page-header">
            <div className="page-header__row">
              <div className="page-header__info">
                <h1 className="page-header__title">Page title</h1>
                <p className="page-header__description">
                  This is a page description. If your page requires describing
                  in 1-2 rows, then use this. Try to keep it as short as
                  possible.
                </p>
              </div>
              <IconButton
                icon={Shrink}
                variant="secondary"
                screenReaderLabel="Collapse view"
              />
            </div>

            <div className="page-header__actions">
              <Button variant="primary">Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
            </div>

            <Tabs tabs={tabs} />
          </div>
        </div>
      </main>
    </div>
  );
}
