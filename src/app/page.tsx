"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#95D5B2] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-muted-foreground text-sm">
          Redirecting to Admin Dashboard...
        </p>
      </div>
    </div>
  );
}
