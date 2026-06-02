"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthSession } from "@/hooks/auth/use-auth";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/devices/new", label: "Novo Device" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuthSession();

  function handleLogout() {
    signOut();
    toast.success("Sessão encerrada");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Industrial IoT Console</p>
            <p className="text-xs text-slate-400">{user?.name} • {user?.email}</p>
          </div>
          <nav className="flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  pathname.startsWith(link.href)
                    ? "bg-accent text-slate-950"
                    : "bg-surface text-slate-300 hover:bg-surface-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="secondary" onClick={handleLogout}>
              Sair
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
