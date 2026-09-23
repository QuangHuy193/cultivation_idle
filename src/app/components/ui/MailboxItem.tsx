import { Mailbox } from "@/lib/types/mailboxTypes";
import { useMailboxStore } from "@/lib/useStore/useMailBox";
import { Mail as Mail_lucide } from "lucide-react";

interface MailboxItemProps {
  mail: Mailbox;
}

const MailboxItem = ({ mail }: MailboxItemProps) => {
  const { setSelectedMail } = useMailboxStore();

  const handleSelectedMail = async () => {
    setSelectedMail(mail);
  };
  return (
    <div
      className={`mb-2 h-16 rounded-lg flex p-2 transition-all active:scale-95
        ${
          mail.status === 0
            ? "bg-linear-to-r from-amber-100 to-yellow-50 border-l-4 border-yellow-500 shadow-md"
            : "bg-amber-50 opacity-80"
        }`}
      onClick={handleSelectedMail}
    >
      <div className="flex gap-3 flex-10/12 min-w-0">
        <div className="flex items-center shrink-0">
          <Mail_lucide className="h-8 w-8 text-amber-700" />
        </div>

        <div className="flex flex-col justify-center min-w-0">
          {/* title */}
          <div className="text-sm font-bold text-amber-900 truncate">
            {mail.title}
          </div>

          {/* content */}
          <div className="text-xs text-amber-700/80 truncate">
            {mail.content || "Nhấn để xem chi tiết"}
          </div>
        </div>
      </div>

      <div className="flex flex-2/12 justify-end items-center pr-2">
        {mail.status === 0 && (
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        )}
      </div>
    </div>
  );
};
export default MailboxItem;
