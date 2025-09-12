import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Home() {
  <div>
    <Button asChild className="w-full" size="lg">
      <a href="/auth/logout">
        <LogOut className="mr-2 h-5 w-5" />
        Log out
      </a>
    </Button>
  </div>;
}
