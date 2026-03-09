import { redirect } from "next/navigation";

// Preserve old /playbook-pro links ~ redirect to the new dynamic route
export default function PlaybookProRedirect() {
  redirect("/playbook/spain-dnv");
}
