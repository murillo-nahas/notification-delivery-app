import NotificationForm from "./components/notification-form";

export default function Home() {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Send notification</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Dispatch a notification to one or more users across any channel.
      </p>
      <div className="mt-8 border border-border rounded-lg p-6 bg-card">
        <NotificationForm />
      </div>
    </div>
  );
}
