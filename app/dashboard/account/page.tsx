import type { Metadata } from "next"

import { UserProfile } from "@/components/dashboard/user-profile"

export default function AccountPage() {
  return (
    <div className="w-full overflow-hidden">
      <UserProfile />
    </div>
  )
}
