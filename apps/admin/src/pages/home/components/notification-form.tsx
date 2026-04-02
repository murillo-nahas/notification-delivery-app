import { useUsers } from "@/hooks/use-users";

export default function NotificationForm() {
  const { data } = useUsers();

  console.log(data);

  return (
    <div>
      <h1>Notification Form</h1>
    </div>
  );
}