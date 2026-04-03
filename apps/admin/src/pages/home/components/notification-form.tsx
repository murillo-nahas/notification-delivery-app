import { useUsers } from "@/hooks/use-users";
import { NotificationChannel } from "@/lib/types/notification-channel.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserSchema } from "@/lib/schemas/user";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateNotification } from "@/hooks/use-create-notification";

const createNotificationSchema = z.object({
  userId: z.string("User ID is required"),
  channel: z.enum(
    [
      NotificationChannel.EMAIL,
      NotificationChannel.SMS,
      NotificationChannel.PUSH,
      NotificationChannel.REALTIME,
    ],
    "Channel is required",
  ),
  message: z.string("Message is required"),
});

type CreateNotificationSchema = z.infer<typeof createNotificationSchema>;

export default function NotificationForm() {
  const { data } = useUsers();
  const channel: NotificationChannel[] = [
    NotificationChannel.EMAIL,
    NotificationChannel.SMS,
    NotificationChannel.PUSH,
    NotificationChannel.REALTIME,
  ];

  const { isPending, mutate } = useCreateNotification();

  const form = useForm<CreateNotificationSchema>({
    resolver: zodResolver(createNotificationSchema),
    mode: "onBlur",
    defaultValues: {
      userId: "",
      channel: NotificationChannel.EMAIL,
      message: "",
    },
  });

  const onSubmit = (data: CreateNotificationSchema) => {
    console.log(data);

    mutate(data, {
      onSuccess: () => console.log(data),
      onError: (error) => console.log(error),
    });
  };

  return (
    <div>
      <h1>Notification Form</h1>

      <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data?.map((user: UserSchema) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="channel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Channel</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {channel?.map((channel) => (
                          <SelectItem key={channel} value={channel}>
                            {channel}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Channel</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field}></Textarea>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-4">
            <Button disabled={isPending} variant="default" type="submit" className="mt-4 w-full">
              {isPending ? "Sending notification..." : "Send"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
